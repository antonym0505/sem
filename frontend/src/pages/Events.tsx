import { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'
import { api, type EventRead } from '../lib/api'

type Status = 'loading' | 'success' | 'error'

export default function Events() {
  const [events, setEvents] = useState<EventRead[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<Status>('loading')
  const [error, setError] = useState<string | null>(null)

  const PAGE_SIZE = 20

  useEffect(() => {
    setStatus('loading')
    api.events
      .list({ sort_by: 'date', order: 'asc', page, page_size: PAGE_SIZE })
      .then((data) => {
        setEvents(data.results)
        setTotal(data.total)
        setStatus('success')
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load events.')
        setStatus('error')
      })
  }, [page])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="min-h-screen bg-[#fef9f3] text-[#1e293b]">
      {/* Nav */}
      <header className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <a href="/" className="text-xl font-bold tracking-tight">
          Smile<span className="text-[#f97316]">EveryMile</span>
        </a>
        <nav className="hidden sm:flex gap-8 text-sm font-medium text-[#64748b]">
          <a href="/events" className="text-[#f97316] font-semibold">Events</a>
          <a href="/#mission" className="hover:text-[#f97316] transition-colors">Mission</a>
          <a href="/#get-involved" className="hover:text-[#f97316] transition-colors">Get Involved</a>
        </nav>
        <a
          href="/#donate"
          className="text-sm font-semibold bg-[#f97316] text-white px-5 py-2.5 rounded-full hover:bg-[#ea6c0a] transition-colors"
        >
          Donate
        </a>
      </header>

      <main className="max-w-3xl mx-auto px-8 py-14">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold tracking-widest uppercase text-[#f97316] mb-3">
              Upcoming
            </p>
            <h1 className="text-4xl font-extrabold">Events</h1>
          </div>
          <a
            href="/events/new"
            className="text-sm font-semibold bg-[#f97316] text-white px-5 py-2.5 rounded-full hover:bg-[#ea6c0a] transition-colors"
          >
            + Add event
          </a>
        </div>

        {status === 'loading' && (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-[#e2e8f0] animate-pulse" />
            ))}
          </div>
        )}

        {status === 'error' && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        {status === 'success' && events.length === 0 && (
          <p className="text-[#64748b]">No events yet — check back soon.</p>
        )}

        {status === 'success' && events.length > 0 && (
          <>
            <div className="flex flex-col gap-4">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 1}
                  className="text-sm font-semibold px-5 py-2.5 rounded-full border border-[#e2e8f0] hover:border-[#f97316] hover:text-[#f97316] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>
                <span className="text-sm text-[#64748b]">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page === totalPages}
                  className="text-sm font-semibold px-5 py-2.5 rounded-full border border-[#e2e8f0] hover:border-[#f97316] hover:text-[#f97316] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
