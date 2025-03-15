import * as z from 'zod'
import { communitySchema } from '@pec/shared'

export const createCommunitySchema = z.object({
  name: communitySchema.shape.name,
  description: communitySchema.shape.description,
})

export const updateCommunitySchema = z.object({
  name: communitySchema.shape.name.optional(),
  description: communitySchema.shape.description.optional(),
})

export type CreateCommunityInput = z.infer<typeof createCommunitySchema>
export type UpdateCommunityInput = z.infer<typeof updateCommunitySchema>
