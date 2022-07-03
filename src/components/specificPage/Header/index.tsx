import { useState } from 'react'
import { Button, Center, Container, Group, Modal, Text, Title } from '@mantine/core'

import { Auth } from 'components/specificPage/Auth'

const Header = () => {
  const [opened, setOpened] = useState(false)

  return (
    <header className='bg-white'>
      <Modal
        size='md'
        opened={opened}
        onClose={() => setOpened(false)}
        title='Login to your account'
      >
        <Auth />
      </Modal>
      <Container className='sticky top-0 flex items-center justify-between py-3'>
        <Title order={1} className='text-xl md:text-2xl'>
          Realtime Subscription
        </Title>
        <Button className='' variant='outline' onClick={() => setOpened(true)}>
          New Post
        </Button>
      </Container>
    </header>
  )
}

export default Header
