import Image from 'next/image'
import loginImage from '@/public/login_illustration.jpeg'
import SignupAndLoginButtons from './ui/login/logInBtns'

export default async function Home() {
    
  return (
    <div className="w-full h-full flex flex-row">
      <div className="hidden lg:flex w-1/2 h-full">
        <Image priority src={loginImage} alt="login illustration" width={500} height={500} className='w-full h-full' />
      </div>
      <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-4 bg-neutral-100 shadow-2xl shadow-black">
        <div className='w-[440px] h-64 p-4 flex flex-col justify-between gap-4 border border-neutral-800 rounded-md'>
          <div className='w-full h-fit flex flex-col gap-4'>
            <h1 className="w-fit font-black text-4xl text-neutral-900">
              NextJS App Starter
            </h1>
            <p className="font-bold text-base text-neutral-900">
              Created by <span href="https://twitter.com/pixelmothman" className='text-neutral-900 underline underline-offset-4 cursor-pointer'> @pixelmothman</span>
            </p>
          </div>
          <SignupAndLoginButtons />
        </div>
      </div>
    </div>
    )
};