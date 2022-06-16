import { useState } from 'react'
import { Button, Center, Container, Group, Modal, Text, Title } from '@mantine/core'

import { Auth } from 'components/specificPage/Auth'

const Header = () => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Modal
        size='md'
        opened={opened}
        onClose={() => setOpened(false)}
        title='Login to your account'
      >
        <Auth />
      </Modal>
      <Group className='relative ml-4 h-[34px] md:ml-0 md:flex md:justify-center'>
        <Title order={1} className='text-xl md:text-2xl'>
          Realtime Subscription
        </Title>
        <Button
          className='absolute top-0 right-2 md:right-8'
          variant='outline'
          onClick={() => setOpened(true)}
        >
          New Post
        </Button>
      </Group>
    </>
  )
}

export default Header
