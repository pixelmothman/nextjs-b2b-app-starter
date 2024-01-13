import { Inter } from 'next/font/google'
import './globals.css'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import {AuthProvider, RedirectToSignupOptions} from "@propelauth/nextjs/client";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NextJs Starter',
  description: 'Start fast.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider authUrl={process.env.NEXT_PUBLIC_AUTH_URL}>
        <body>
          <Theme className={`${inter.className} antialiased w-screen h-screen bg-neutral-100`}>
            {children}
          </Theme>
        </body>
      </AuthProvider>
    </html>
  )
}