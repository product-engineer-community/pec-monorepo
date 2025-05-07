import { eventSchema } from '@packages/ui'
import * as z from 'zod'

export const createEventSchema = z.object({
  title: eventSchema.shape.title,
  description: eventSchema.shape.description,
  startDate: eventSchema.shape.start_date,
  endDate: eventSchema.shape.end_date,
}).refine((data) => {
  const start = new Date(data.startDate)
  const end = new Date(data.endDate)
  return start < end
}, {
  message: '종료 날짜는 시작 날짜보다 이후여야 합니다.',
  path: ['endDate'],
})

export const updateEventSchema = z.object({
  title: eventSchema.shape.title.optional(),
  description: eventSchema.shape.description.optional(),
  startDate: eventSchema.shape.start_date.optional(),
  endDate: eventSchema.shape.end_date.optional(),
}).refine((data) => {
  if (data.startDate && data.endDate) {
    const start = new Date(data.startDate)
    const end = new Date(data.endDate)
    return start < end
  }
  return true
}, {
  message: '종료 날짜는 시작 날짜보다 이후여야 합니다.',
  path: ['endDate'],
})

export type CreateEventInput = z.infer<typeof createEventSchema>
export type UpdateEventInput = z.infer<typeof updateEventSchema>
