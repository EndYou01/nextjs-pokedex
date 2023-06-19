import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import { Container } from '@/components/bootstrap'
import { Anton } from 'next/font/google'

const anton = Anton({ subsets: ['latin'], weight: ['400'] })

export const metadata = {
  title: 'NextJS PokeDex',
  description: 'NextJS PokeDex app by Coding Code',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={anton.className}>
        <Container className='py-4'>
          {children}
        </Container>
      </body>
    </html>
  )
}
