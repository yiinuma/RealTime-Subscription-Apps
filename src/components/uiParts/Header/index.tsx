import Link from 'next/link'
import { ActionIcon, Avatar, Button, Modal } from '@mantine/core'

import { FC } from 'react'

import { Auth } from 'components/specificPage/Auth'
import useStore from 'store'
import { supabase } from 'utils/supabase'
import { useDownloadUrl } from 'hooks/useDownloadUrl'
import { useQueryAvatar } from 'hooks/useQueryAvatar'

type Props = {
  userId: string | undefined
}
export const Header: FC = () => {
  const user = supabase.auth.user()
  const resetPost = useStore((state) => state.resetEditedPost)
  const session = useStore((state) => state.session)
  const authOpened = useStore((state) => state.authOpened)
  const setAuthOpened = useStore((state) => state.setAuthOpened)
  const profileOpened = useStore((state) => state.profileOpened)
  const setProfileOpened = useStore((state) => state.setProfileOpened)
  const { data } = useQueryAvatar(user?.id)
  const { fullUrl: avatarUrl, isLoading } = useDownloadUrl(data?.avatar_url, 'avatars')

  return (
    <header className='sticky top-0 z-50 bg-white'>
      <Modal
        size='md'
        opened={authOpened}
        onClose={() => setAuthOpened(false)}
        title='Login to your account'
      >
        <Auth />
      </Modal>
      <Modal
        size='md'
        opened={profileOpened}
        onClose={() => setProfileOpened(false)}
        title='Your profile'
      ></Modal>

      <div className='container mx-auto flex h-14 items-center justify-between py-1 px-3 md:h-16'>
        <Link href='/'>
          <a className='flex cursor-pointer text-black no-underline'>
            <h1 className='text-xl md:text-2xl'>Realtime Subscription</h1>
          </a>
        </Link>
        {!session ? (
          <Button style={{ outlineWidth: 0 }} variant='light' onClick={() => setAuthOpened(true)}>
            New Post
          </Button>
        ) : (
          <div className='row flex items-center'>
            <ActionIcon onClick={() => setProfileOpened(true)}>
              {avatarUrl ? (
                <Avatar src={avatarUrl} alt='Avatar' radius='xl' />
              ) : (
                <Avatar src='' radius='xl' />
              )}
            </ActionIcon>
            <Button
              className='ml-4'
              style={{ outlineWidth: 0 }}
              variant='light'
              color='red'
              onClick={() => {
                supabase.auth.signOut()
                resetPost()
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
