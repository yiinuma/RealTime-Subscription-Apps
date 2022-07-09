import Header from 'components/uiParts/Header'
import Image from 'next/image'

const detailPost: React.FC = ({}) => {
  return (
    <div className='flex min-h-screen flex-col bg-slate-50 font-sans'>
      <Header />
      <main>
        <div className='flex flex-col px-4 md:h-[calc(100vh-64px)] md:flex-row md:px-0'>
          <div className='flex items-center justify-center p-[2.5%] md:h-full md:w-2/3 '>
            <div className='nextImageContainer'>
              <Image
                className='nextImage  '
                src='https://picsum.photos/1920/1280'
                layout='fill'
                objectFit='contain'
              />
            </div>
          </div>
          <div className='min-h-full border border-solid border-slate-200 bg-white px-4 py-3 md:w-1/3 '>
            <h2 className='text-lg'>Norway Fjord Adventures</h2>
            <p>
              With Fjord Tours you can explore more of the magical fjord landscapes with tours and
              activities on and around the fjords of Norway
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default detailPost
