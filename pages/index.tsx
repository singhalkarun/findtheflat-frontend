import Navbar from '@common/components/Navbar'
import type { NextPage } from 'next'
import { Toaster } from 'react-hot-toast'

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Toaster />
    </>
  )
}

export default Home
