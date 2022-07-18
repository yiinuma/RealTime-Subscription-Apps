import { FC } from 'react'
import Link from 'next/link'
import { ActionIcon, Avatar, Button, Modal } from '@mantine/core'
import { useQueryClient } from 'react-query'

import useStore from 'store'
import { supabase } from 'utils/supabase'
import { Auth } from 'components/specificPage/Auth'
import { Profile } from 'components/specificPage/Profile'
import { UserAvatar } from 'components/uiParts/UserAvatar'

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
      >
        {sessionUser && <Profile />}
      </Modal>

      <div className='container mx-auto flex h-14 items-center justify-between py-1 px-3 md:h-16'>
        <Link href='/'>
          <a className='flex cursor-pointer text-black no-underline'>
            <h1 className='text-xl md:text-2xl'>Realtime Subscription</h1>
          </a>
        </Link>
        {!session ? (
          <Button style={{ outlineWidth: 0 }} variant='light' onClick={() => setAuthOpened(true)}>
            Login
          </Button>
        ) : (
          <div className='row flex items-center'>
            <ActionIcon onClick={() => setProfileOpened(true)}>
              {sessionUser && <UserAvatar id={sessionUser} />}
            </ActionIcon>
            <Button
              className='ml-4'
              style={{ outlineWidth: 0 }}
              variant='light'
              color='red'
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
          </div>
        )}
      </div>
    </header>
  )
}
