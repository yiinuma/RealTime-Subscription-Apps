import { useState } from 'react'
import { Button, Modal } from '@mantine/core'

import { Auth } from 'components/specificPage/Auth'

const Header = () => {
  const [opened, setOpened] = useState(false)

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
      <div className='container mx-auto flex items-center justify-between py-1 px-3'>
        <h1 className='text-xl md:text-2xl'>Realtime Subscription</h1>
        <Button className='' variant='outline' onClick={() => setOpened(true)}>
          New Post
        </Button>
      </div>
    </header>
  )
}

export default Header
