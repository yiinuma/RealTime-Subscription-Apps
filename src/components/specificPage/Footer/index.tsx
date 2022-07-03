import React from 'react'
import { Container, Group, ActionIcon, Text, Image } from '@mantine/core'
import { AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {
  return (
    <footer className='sticky bottom-0 z-50 bg-white'>
      <Container className='flex items-center justify-between py-3'>
        <Group>
          <div className='w-8'>
            <Image radius='xl' src='logo.jpg' />
          </div>
          <Text>Subscription Test Page</Text>
        </Group>
        <ActionIcon<'a'>
          component='a'
          target='_blank'
          href='https://twitter.com/Heroheroyoshi'
          size='lg'
          color='blue'
        >
          <AiOutlineTwitter className='h-6 w-6' />
        </ActionIcon>
      </Container>
    </footer>
  )
}

export default Footer
