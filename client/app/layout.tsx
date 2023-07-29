import './styles/globals.css'
import type { Metadata } from 'next'
import Query from '@/hooks/useQuery'
import { inter } from '@/public/fonts/f'

export const metadata: Metadata = {
  title: 'MemoMe',
  description: 'Send and Recieve Anonymous Messages with your Friends Online.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Query>
          {children}
        </Query>
      </body>
    </html>
  )
}
