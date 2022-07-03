import { Text, Badge, Group, useMantineTheme } from '@mantine/core'
import Image from 'next/image'

const CardItem = () => {
  const theme = useMantineTheme()

  const secondaryColor = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]

  return (
    <a
      className='cursor-pointer overflow-hidden text-gray-600 no-underline duration-200 ease-in-out hover:scale-[102%] '
      href='https://www.yahoo.co.jp/'
    >
      <div className='rounded-lg bg-white p-[4%] md:min-h-[400px]'>
        <div className='mx-[-4%] mt-[-4%]'>
          <Image
            className='rounded-t-lg'
            src='https://picsum.photos/768/768'
            width={768}
            height={768}
            objectFit='contain'
          />
        </div>

        <h2 className='text-lg'>Norway Fjord Adventures</h2>

        <p className='line-clamp-3'>
          With Fjord Tours you can explore more of the magical fjord landscapes with tours and
          activities on and around the fjords of Norway
        </p>
      </div>
    </a>
  )
}

export default CardItem
