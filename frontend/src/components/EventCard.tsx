import type { EventRead } from '../lib/api'

interface Props {
  event: EventRead
}

export default function EventCard({ event }: Props) {
  const dateStr = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-5 bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden hover:border-[#f97316] hover:shadow-md transition-all"
    >
      <div className="w-36 h-32 shrink-0 bg-[#f97316]/10 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col justify-center gap-1.5 py-5 pr-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-[#f97316]">{dateStr}</p>
        <h3 className="text-base font-bold text-[#1e293b] leading-snug group-hover:text-[#f97316] transition-colors">
          {event.name}
        </h3>
        <p className="text-sm text-[#64748b] line-clamp-2">{event.description}</p>
      </div>
    </a>
  )
}
