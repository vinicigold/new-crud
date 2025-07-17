'use client';
import Image from 'next/image'
import { useRouter } from 'next/navigation'
// import Button from './components/button'

export default function Home() {
  const router = useRouter()
  const handleStart = () => {
        router.push('/welcome/signin')
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/firstpage.jpg')` }}>
      <div className='mb-4'>
        <div className='absolute left-10 top-1/3 text-white space-y-6 max-w-3xl'>
          <h1 className='text-2xl font-bold typewriter'>Empowering Communities. Transforming Lives.</h1 >
          <p className='text-md font-medium'>“Your Partner in Poverty Eradication.”</p>
          <p className='text-md font-medium'>“Join Us in Making a Difference.”</p>
        </div>
        {/* <Button button='START' variants="secondary" onClick={handleStart}></Button>
        <Button button='click here' variants="danger" onClick={handleStart}>
        </Button>
        <Button button='watdahil' variants="primary" onClick={handleStart}>
        </Button> */}
        <button onClick={handleStart}>
          <div  className="absolute right-41 top-1/2 transform -translate-y-1/2">
            <Image src="/card.png" alt="Start Button" width={440} height={55} className=' hover:scale-110 transition-transform duration-300 ease-in-out'  />
          </div>
        </button>
      </div>
      <div className='mb-4'>
      </div>
      <div className='flex flex-col gap-4 justify-center items-center'>
      </div>
    </div>
  )
}