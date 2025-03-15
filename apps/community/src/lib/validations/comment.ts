import * as z from 'zod'
import { commentSchema } from '@pec/shared'

export const createCommentSchema = z.object({
  content: commentSchema.shape.content,
  postId: z.string().uuid({
    message: '유효하지 않은 게시글입니다.',
  }),
  parentId: z.string().uuid({
    message: '유효하지 않은 상위 댓글입니다.',
  }).optional(),
})

export const updateCommentSchema = z.object({
  content: commentSchema.shape.content,
})

export type CreateCommentInput = z.infer<typeof createCommentSchema>
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>
