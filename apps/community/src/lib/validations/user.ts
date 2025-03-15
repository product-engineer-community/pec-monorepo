import * as z from 'zod'

export const updateProfileSchema = z.object({
  username: z.string().min(2, {
    message: '사용자 이름은 최소 2자 이상이어야 합니다.',
  }).max(50, {
    message: '사용자 이름은 최대 50자까지 가능합니다.',
  }).optional(),
  avatarUrl: z.string().url({
    message: '유효한 URL을 입력해주세요.',
  }).nullish(),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
