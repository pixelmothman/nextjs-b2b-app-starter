import { Inter } from 'next/font/google'
import './globals.css'
import {AuthProvider, RedirectToSignupOptions} from "@propelauth/nextjs/client";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NextJs Starter',
  description: 'Start fast.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased w-screen h-screen bg-neutral-100`}>
        <AuthProvider authUrl={process.env.NEXT_PUBLIC_AUTH_URL}>
        {children}
        </AuthProvider>
      </body>
    </html>
  )
}