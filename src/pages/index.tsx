import type { NextPage } from 'next'
import Header from 'components/uiParts/Header'
import Footer from 'components/uiParts/Footer'
import CardItem from 'components/specificPage/CardItem'

const Home: NextPage = () => {
  return (
    <div className='flex min-h-screen flex-col bg-slate-50 font-sans'>
      <Header />
      <main className='flex  flex-col px-4 md:h-[calc(100vh-122px)] md:px-0'>
        <div className='container mx-auto py-4  md:px-24'>
          <ul className='grid gap-4 md:grid-cols-3 xl:grid-cols-4'>
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home
