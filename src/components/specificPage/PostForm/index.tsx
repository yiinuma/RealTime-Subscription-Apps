import React, { FormEvent, FC, memo } from 'react'
import Image from 'next/image'
import { Input } from '@mantine/core'
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
      setFullUrl('')
    } else {
      await updatePostMutation.mutateAsync({
        id: editedPost.id,
        title: editedPost.title,
        post_url: editedPost.post_url,
        description: editedPost.description,
      })
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
      <Input
        className='mt-2'
        placeholder='description?'
        value={editedPost.description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          update({ ...editedPost, description: e.target.value })
        }
      />

      <div className='flex justify-center'>
        {postUrl && (
          <Image
            src={postUrl}
            alt='Image'
            className='rounded'
            width={150}
            height={150}
            objectFit='contain'
          />
        )}
      </div>

      <div className='my-3 flex justify-center'>
        <button
          data-testid='btn-post'
          type='submit'
          className={`rounded ${
            useMutateUploadPostImg.isLoading || !editedPost.title ? 'bg-gray-300' : 'bg-indigo-600'
          }  px-3 py-2 text-sm text-white`}
          disabled={useMutateUploadPostImg.isLoading || !editedPost.title}
        >
          {editedPost.id ? 'Update' : 'Create'}
        </button>
      </div>
      <div className='flex justify-center'>{useMutateUploadPostImg.isLoading && <Spinner />}</div>
      <div className='flex justify-center'>
        <label htmlFor='post'>
          <AiFillCamera className='mt-2 h-7 w-7 cursor-pointer text-gray-500' />
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
    </form>
  )
}
export const PostForm = memo(PostFormMemo)
