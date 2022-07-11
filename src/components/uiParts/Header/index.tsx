import { useQueryClient } from 'react-query'
import Link from 'next/link'
import { Button, Modal } from '@mantine/core'

import { Auth } from 'components/specificPage/Auth'
import useStore from 'store'
import { supabase } from 'utils/supabase'

const Header = () => {
  const resetPost = useStore((state) => state.resetEditedPost)
  const session = useStore((state) => state.session)
  const opened = useStore((state) => state.opened)
  const setOpened = useStore((state) => state.setOpened)

  return (
    <header className='sticky top-0 z-50 bg-white'>
      <Modal
        size='md'
        opened={opened}
        onClose={() => setOpened(false)}
        title='Login to your account'
      >
        <Auth />
      </Modal>
      <div className='container mx-auto flex h-14 items-center justify-between py-1 px-3 md:h-16'>
        <Link href='/'>
          <a className='flex cursor-pointer text-black no-underline'>
            <h1 className='text-xl md:text-2xl'>Realtime Subscription</h1>
          </a>
        </Link>
        {!session ? (
          <Button style={{ outlineWidth: 0 }} variant='light' onClick={() => setOpened(true)}>
            New Post
          </Button>
        ) : (
          <Button
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
        )}
      </div>
    </header>
  )
}

export default Header
