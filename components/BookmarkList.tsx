'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState, useMemo } from 'react'
import DeleteBookmarkButton from './DeleteBookmarkButton'

interface Bookmark {
  id: string
  title: string
  url: string
  created_at: string
}

interface BookmarkListProps {
  userId: string
}

export default function BookmarkList({ userId }: BookmarkListProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    let mounted = true

    const fetchBookmarks = async () => {
      try {
        const { data, error } = await supabase
          .from('bookmarks')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })

        if (error) throw error
        if (mounted) {
          setBookmarks(data || [])
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching bookmarks:', error)
        if (mounted) setLoading(false)
      }
    }

    // Initial fetch
    fetchBookmarks()

    // Set up real-time subscription
    const channel = supabase
      .channel(`bookmarks-changes-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          if (!mounted) return
          
          // Handle INSERT - add new bookmark to the list
          if (payload.eventType === 'INSERT') {
            setBookmarks((prev) => [payload.new as Bookmark, ...prev])
          }
          // Handle DELETE - remove bookmark from the list
          else if (payload.eventType === 'DELETE') {
            setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id))
          }
          // Handle UPDATE or fallback - refetch all
          else {
            fetchBookmarks()
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Real-time subscription active')
        } else if (status === 'CHANNEL_ERROR') {
          console.error('Real-time subscription error')
          // Fallback: refetch on error
          if (mounted) fetchBookmarks()
        }
      })

    return () => {
      mounted = false
      supabase.removeChannel(channel)
    }
  }, [userId, supabase])


  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-xl p-6">
        <div className="flex items-center justify-center py-8">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="ml-3 text-gray-600">Loading bookmarks...</span>
        </div>
      </div>
    )
  }

  if (bookmarks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-xl p-6">
        <p className="text-gray-600 text-center py-8">
          No bookmarks yet. Add your first bookmark above!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Bookmarks</h2>
      <div className="space-y-3">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex-1 min-w-0">
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline block truncate"
              >
                {bookmark.title}
              </a>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-700 block truncate mt-1"
              >
                {bookmark.url}
              </a>
              <p className="text-xs text-gray-400 mt-1">
                Added {new Date(bookmark.created_at).toLocaleDateString()}
              </p>
            </div>
            <DeleteBookmarkButton bookmarkId={bookmark.id} />
          </div>
        ))}
      </div>
    </div>
  )
}
