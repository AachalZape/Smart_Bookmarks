'use client'

import { useState, useCallback } from 'react'
import AddBookmarkForm from './AddBookmarkForm'
import BookmarkList from './BookmarkList'

interface DashboardContentProps {
  userId: string
}

export default function DashboardContent({ userId }: DashboardContentProps) {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleBookmarkAdded = useCallback(() => {
    // Trigger a refresh by updating the key
    setRefreshKey((prev) => prev + 1)
  }, [])

  return (
    <>
      <AddBookmarkForm onBookmarkAdded={handleBookmarkAdded} />
      <div className="mt-6 -mx-6 -mb-6">
        <BookmarkList key={refreshKey} userId={userId} />
      </div>
    </>
  )
}
