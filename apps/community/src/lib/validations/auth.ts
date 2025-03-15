import * as z from 'zod'

export const signInSchema = z.object({
  email: z.string().nonempty({ message: '이메일을 입력해주세요.' }).email({
    message: '유효한 이메일 주소를 입력해주세요.',
  }),
  password: z.string().nonempty({ message: '비밀번호를 입력해주세요.' }).min(6, {
    message: '비밀번호는 최소 6자 이상이어야 합니다.',
  }),
})

export const signUpSchema = z
  .object({
    email: z.string().nonempty({ message: '이메일을 입력해주세요.' }).email({
      message: '유효한 이메일 주소를 입력해주세요.',
    }),
    username: z.string().nonempty({ message: '사용자 이름을 입력해주세요.' }).min(3, {
      message: '사용자 이름은 최소 3자 이상이어야 합니다.',
    }).max(50, {
      message: '사용자 이름은 최대 50자까지 가능합니다.',
    }),
    password: z.string().nonempty({ message: '비밀번호를 입력해주세요.' }).min(6, {
      message: '비밀번호는 최소 6자 이상이어야 합니다.',
    }),
    confirmPassword: z.string().nonempty({ message: '비밀번호 확인을 입력해주세요.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
