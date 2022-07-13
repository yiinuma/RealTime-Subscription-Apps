import Image from 'next/image'
import { FC, memo } from 'react'
import { Loader } from '@mantine/core'

import { Post } from 'types'
import { useDownloadUrl } from 'hooks/useDownloadUrl'
import Link from 'next/link'

const PostItemMemo: FC<Omit<Post, 'created_at'>> = ({ id, title, post_url, description }) => {
  const { fullUrl: postUrl, isLoading: isLoadingPost } = useDownloadUrl(post_url, 'posts')
  return (
    <li className='list-none duration-200 ease-in-out hover:scale-[102%] '>
      <Link href={`/detail-post/${id}`}>
        <a className='cursor-pointer overflow-hidden text-gray-600 no-underline '>
          <div className='rounded-lg bg-white md:min-h-[500px]'>
            <div className='w-100'>
              {postUrl && (
                <Image
                  className='rounded-t-lg'
                  // src='https://picsum.photos/168/1000'
                  src={postUrl}
                  width={768}
                  height={768}
                  objectFit='cover'
                />
              )}
            </div>
            <div className='my-3 flex justify-center'>
              {isLoadingPost && <Loader variant='bars' />}
            </div>

            <div className='px-3 pb-2'>
              <h2 className='text-lg'>{title}</h2>
              <p className='line-clamp-3'>
                {description}
                {/* With Fjord Tours you can explore more of the magical fjord landscapes with tours and
              activities on and around the fjords of Norway */}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </li>
  )
}

export const PostItem = memo(PostItemMemo)
