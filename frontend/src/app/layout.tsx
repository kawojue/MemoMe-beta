import './globals.css'

export const metadata = {
  title: 'MemoMe',
  description: 'Send and Share Messages to your Friends Anonymously.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}