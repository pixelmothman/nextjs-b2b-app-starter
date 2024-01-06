import Image from 'next/image'
import loginImage from '@/public/login_illustration.jpeg'
import SignupAndLoginButtons from './ui/logInBtns'

export default async function Home() {
    
  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-1/2 h-full">
        <Image priority src={loginImage} alt="login illustration" width={500} height={500} className='w-full h-full' />
      </div>
      <div className="w-1/2 h-full flex flex-col items-center justify-center p-4 bg-neutral-800">
        <div className='w-1/2 flex flex-col gap-4'>
          <h1 className="text-2xl font-semibold text-zinc-200">Start now</h1>
          <SignupAndLoginButtons />
        </div>
      </div>
    </div>
    )
};