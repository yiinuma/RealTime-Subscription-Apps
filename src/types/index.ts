export type Form = {
  email: string
  password: string
  age: number
}
export type Post = {
  id: string
  created_at: string
  user_id: string | undefined
  title: string
  post_url: string
}

export type EditedPost = {
  id: string
  title: string
  post_url: string
}
