import { useMutation, useQueryClient } from 'react-query'

import useStore from 'store'
import { supabase } from 'utils/supabase'
import { Post, EditedPost } from 'types'

export const useMutatePost = () => {
  const queryClient = useQueryClient()
  const reset = useStore((state) => state.resetEditedPost)
  const createPostMutation = useMutation(
    async (post: Omit<Post, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('posts').insert(post)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: (res) => {
        const previousPost = queryClient.getQueryData<Post[]>(['posts'])
        if (previousPost) {
          queryClient.setQueryData(['posts'], [...previousPost, res[0]])
        }
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    },
  )
  const updatePostMutation = useMutation(
    async (post: EditedPost) => {
      const { data, error } = await supabase
        .from('posts')
        .update({ title: post.title, post_url: post.post_url, description: post.description })
        .eq('id', post.id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: () => {
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    },
  )
  const deletePostMutation = useMutation(
    async (id: string) => {
      const { data, error } = await supabase.from('posts').delete().eq('id', id)
      if (error) throw new Error(error.message)
      return data
    },
    {
      onSuccess: () => {
        reset()
      },
      onError: (err: any) => {
        alert(err.message)
        reset()
      },
    },
  )
  return { deletePostMutation, createPostMutation, updatePostMutation }
}
