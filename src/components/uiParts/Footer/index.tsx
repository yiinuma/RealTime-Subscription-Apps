import React, { FC } from 'react'
import { Group, ActionIcon, Text, Image } from '@mantine/core'
import { AiOutlineTwitter } from 'react-icons/ai'

export const Footer: FC = () => {
  return (
    <footer className='sticky bottom-0 z-50 h-14 bg-white'>
      <div className='container mx-auto flex items-center justify-between py-3 px-2'>
        <Group>
          <div className='w-8'>
            <Image radius='xl' src='/logo.jpg' />
          </div>
          <Text>ImagePosting Test Page</Text>
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
      </div>
    </footer>
  )
}
