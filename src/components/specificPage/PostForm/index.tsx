import React, { FormEvent, FC, memo } from 'react'
import Image from 'next/image'
import { Button, Input, Textarea } from '@mantine/core'
import { AiFillCamera } from 'react-icons/ai'

import useStore from 'store'
import { useMutatePost } from 'hooks/useMutatePost'
import { useDownloadUrl } from 'hooks/useDownloadUrl'
import { useUploadPostImg } from 'hooks/useUploadPostImg'
import { Spinner } from 'components/uiParts/Spinner'

export const PostFormMemo: FC = () => {
  const session = useStore((state) => state.session)
  const editedPost = useStore((state) => state.editedPost)
  const update = useStore((state) => state.updateEditedPost)
  const setPostFormOpened = useStore((state) => state.setPostFormOpened)
  const { createPostMutation, updatePostMutation } = useMutatePost()
  const { useMutateUploadPostImg } = useUploadPostImg()
  const { fullUrl: postUrl, setFullUrl } = useDownloadUrl(editedPost.post_url, 'posts')
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedPost.id === '') {
      await createPostMutation.mutateAsync({
        user_id: session?.user?.id,
        title: editedPost.title,
        post_url: editedPost.post_url,
        description: editedPost.description,
      })
      setPostFormOpened(false)
      setFullUrl('')
    } else {
      await updatePostMutation.mutateAsync({
        id: editedPost.id,
        title: editedPost.title,
        post_url: editedPost.post_url,
        description: editedPost.description,
      })
      setPostFormOpened(false)
      setFullUrl('')
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <Input
        placeholder='New post title?'
        value={editedPost.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          update({ ...editedPost, title: e.target.value })
        }
      />
      <Textarea
        className='mt-2'
        placeholder='description?'
        autosize
        minRows={6}
        value={editedPost.description}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          update({ ...editedPost, description: e.target.value })
        }
      />
      <div className='my-4 flex items-center justify-center'>
        <div className='flex justify-center'>
          <label htmlFor='post'>
            <div className='flex cursor-pointer items-center justify-center'>
              {postUrl ? (
                <Image
                  src={postUrl}
                  alt='Image'
                  className='rounded'
                  width={320}
                  height={280}
                  objectFit='contain'
                />
              ) : (
                <>
                  <AiFillCamera className='h-10 w-10 text-blue-500' />
                  <p className='ml-4'>select image</p>
                </>
              )}
            </div>
          </label>

          <input
            className='hidden'
            type='file'
            id='post'
            accept='image/*'
            onChange={async (e) => {
              await useMutateUploadPostImg.mutateAsync(e)
              e.target.value = ''
            }}
          />
        </div>
      </div>

      <div className='my-4 flex justify-center'>
        <Button type='submit' disabled={useMutateUploadPostImg.isLoading || !editedPost.title}>
          {editedPost.id ? 'Update' : 'Create'}
        </Button>
      </div>
      <div className='flex justify-center'>{useMutateUploadPostImg.isLoading && <Spinner />}</div>
    </form>
  )
}
export const PostForm = memo(PostFormMemo)
