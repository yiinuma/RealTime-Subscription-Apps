import { FC } from 'react'
import Link from 'next/link'
import { ActionIcon, Avatar, Button, Modal } from '@mantine/core'
import { useQueryClient } from 'react-query'

import useStore from 'store'
import { supabase } from 'utils/supabase'
import { Auth } from 'components/specificPage/Auth'
import { Profile } from 'components/specificPage/Profile'
import { UserAvatar } from 'components/uiParts/UserAvatar'
import { PostForm } from 'components/specificPage/PostForm'

export const Header: FC = () => {
  const queryClient = useQueryClient()
  const resetPost = useStore((state) => state.resetEditedPost)
  const resetProfile = useStore((state) => state.resetEditedProfile)
  const session = useStore((state) => state.session)
  const sessionUser = useStore((state) => state.sessionUser)
  const authOpened = useStore((state) => state.authOpened)
  const setAuthOpened = useStore((state) => state.setAuthOpened)
  const profileOpened = useStore((state) => state.profileOpened)
  const setProfileOpened = useStore((state) => state.setProfileOpened)
  const postFormOpened = useStore((state) => state.postFormOpened)
  const setPostFormOpened = useStore((state) => state.setPostFormOpened)

  return (
    <header className='sticky top-0 z-50 bg-white'>
      <Modal
        size='lg'
        opened={postFormOpened}
        onClose={() => setPostFormOpened(false)}
        title='New Post'
        overlayOpacity={0.6}
        overlayBlur={1.25}
      >
        {session && <PostForm />}
      </Modal>
      <Modal
        size='md'
        opened={authOpened}
        onClose={() => setAuthOpened(false)}
        title='Login to your account'
        overlayOpacity={0.6}
        overlayBlur={1.25}
      >
        <Auth />
      </Modal>
      <Modal
        size='md'
        opened={profileOpened}
        onClose={() => setProfileOpened(false)}
        title='Your profile'
        overlayOpacity={0.6}
        overlayBlur={1.25}
      >
        {sessionUser && <Profile />}
      </Modal>

      <div className='container mx-auto flex h-[72px] flex-col items-center justify-between py-2 px-3 md:h-16 md:flex-row'>
        <Link href='/'>
          <a className='flex cursor-pointer text-black no-underline'>
            <h1 className='my-0 text-xl md:text-2xl'>Image Posting Apps</h1>
          </a>
        </Link>

        <div className='row flex w-full items-center justify-between md:w-fit'>
          {session && (
            <Button
              style={{ outlineWidth: 0 }}
              variant='light'
              size='xs'
              onClick={() => setPostFormOpened(true)}
            >
              NewPost
            </Button>
          )}
          <div className='flex items-center'>
            {session && sessionUser && (
              <ActionIcon className='ml-10' onClick={() => setProfileOpened(true)}>
                <UserAvatar id={sessionUser} />
              </ActionIcon>
            )}
            {!session ? (
              <Button
                style={{ outlineWidth: 0 }}
                variant='light'
                size='xs'
                onClick={() => setAuthOpened(true)}
              >
                Login
              </Button>
            ) : (
              <Button
                className='ml-4'
                style={{ outlineWidth: 0 }}
                variant='light'
                color='red'
                size='xs'
                onClick={() => {
                  resetPost()
                  resetProfile()
                  supabase.auth.signOut()
                  queryClient.removeQueries(['posts'])
                  queryClient.removeQueries(['profile'])
                  queryClient.removeQueries(['avatar-url'])
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
