import { postSchema } from '@pec/shared'
import * as z from 'zod'

export const createPostSchema = z.object({
  title: postSchema.shape.title,
  content: postSchema.shape.content,
})

export const updatePostSchema = z.object({
  title: postSchema.shape.title.optional(),
  content: postSchema.shape.content.optional(),
})

export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>
