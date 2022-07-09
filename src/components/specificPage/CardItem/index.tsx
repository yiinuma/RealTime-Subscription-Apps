import { Text, Badge, Group, useMantineTheme } from '@mantine/core'
import Image from 'next/image'

const CardItem = () => {
  return (
    <a
      className='cursor-pointer overflow-hidden text-gray-600 no-underline duration-200 ease-in-out hover:scale-[102%] '
      href='https://www.yahoo.co.jp/'
    >
      <div className='rounded-lg bg-white md:min-h-[400px]'>
        <div className='w-100'>
          <Image
            className='rounded-t-lg'
            src='https://picsum.photos/768/768'
            width={768}
            height={768}
            objectFit='cover'
          />
        </div>

        <div className='px-3 pb-2'>
          <h2 className='text-lg'>Norway Fjord Adventures</h2>
          <p className='line-clamp-3'>
            With Fjord Tours you can explore more of the magical fjord landscapes with tours and
            activities on and around the fjords of Norway
          </p>
        </div>
      </div>
    </a>
  )
}

export default CardItem
