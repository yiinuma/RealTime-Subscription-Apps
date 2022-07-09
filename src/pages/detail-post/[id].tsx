import Footer from 'components/uiParts/Footer'
import Header from 'components/uiParts/Header'
import Link from 'next/link'

const detailPost: React.FC = ({}) => {
  return (
    <div className='flex min-h-screen flex-col bg-slate-50 font-sans'>
      <Header />
      <main className='flex-cols flex flex-1 px-4 md:px-0'>
        <div className=''></div>
      </main>
      <Link href='/'>
        <a className='mt-12 flex cursor-pointer' data-testid='back-blog'>
          👈 Back to blog-page
        </a>
      </Link>
      <Footer />
    </div>
  )
}

export default detailPost
