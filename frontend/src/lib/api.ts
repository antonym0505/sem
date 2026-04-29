const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.json() as Promise<T>
}

export interface EventCreate {
  name: string
  date: string
  url: string
  image: string
  description: string
}

export interface EventRead extends EventCreate {
  id: number
}

export interface PaginatedEvents {
  total: number
  page: number
  page_size: number
  results: EventRead[]
}

export interface EventListParams {
  search?: string
  sort_by?: 'date' | 'name'
  order?: 'asc' | 'desc'
  page?: number
  page_size?: number
}

export const api = {
  events: {
    create: (body: EventCreate) =>
      request<EventRead>('/events', { method: 'POST', body: JSON.stringify(body) }),

    list: (params: EventListParams = {}) => {
      const qs = new URLSearchParams()
      if (params.search) qs.set('search', params.search)
      if (params.sort_by) qs.set('sort_by', params.sort_by)
      if (params.order) qs.set('order', params.order)
      if (params.page) qs.set('page', String(params.page))
      if (params.page_size) qs.set('page_size', String(params.page_size))
      return request<PaginatedEvents>(`/events?${qs}`)
    },
  },
}
