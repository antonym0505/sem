import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { api, type EventCreate } from '../lib/api'

const fields: { name: keyof EventCreate; label: string; type?: string; multiline?: boolean }[] = [
  { name: 'name', label: 'Event name' },
  { name: 'date', label: 'Date & time', type: 'datetime-local' },
  { name: 'url', label: 'Event URL', type: 'url' },
  { name: 'image', label: 'Image URL', type: 'url' },
  { name: 'description', label: 'Description', multiline: true },
]

export default function CreateEvent() {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventCreate>()

  const onSubmit = async (data: EventCreate) => {
    setServerError(null)
    try {
      await api.events.create(data)
      navigate('/')
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  return (
    <div className="min-h-screen bg-[#fef9f3] text-[#1e293b]">
      {/* Nav */}
      <header className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <a href="/" className="text-xl font-bold tracking-tight">
          Smile<span className="text-[#f97316]">EveryMile</span>
        </a>
      </header>

      <main className="max-w-xl mx-auto px-8 py-16">
        <p className="text-sm font-semibold tracking-widest uppercase text-[#f97316] mb-3">
          Admin
        </p>
        <h1 className="text-4xl font-extrabold mb-10">Create an event</h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
          {fields.map(({ name, label, type = 'text', multiline }) => (
            <div key={name} className="flex flex-col gap-1.5">
              <label htmlFor={name} className="text-sm font-semibold text-[#1e293b]">
                {label}
              </label>
              {multiline ? (
                <textarea
                  id={name}
                  rows={4}
                  {...register(name, { required: `${label} is required` })}
                  className="rounded-xl border border-[#e2e8f0] px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent"
                />
              ) : (
                <input
                  id={name}
                  type={type}
                  {...register(name, { required: `${label} is required` })}
                  className="rounded-xl border border-[#e2e8f0] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:border-transparent"
                />
              )}
              {errors[name] && (
                <p className="text-xs text-red-500">{errors[name]?.message}</p>
              )}
            </div>
          ))}

          {serverError && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 bg-[#f97316] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#ea6c0a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating…' : 'Create event'}
          </button>
        </form>
      </main>
    </div>
  )
}
