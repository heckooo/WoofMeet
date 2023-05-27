import Footer from '@/components/Footer/Footer';
import './globals.css'
import { Quicksand } from 'next/font/google';

const quick = Quicksand({ subsets: ['latin'] });

export default function RootLayout({ children, title = "Woof Meets" }: { children: React.ReactNode, title: string }) {
  return (
      <html lang="en">
        <head>
          <title>{title}</title>
        </head>
        <body className={quick.className}>
          {children}
          <Footer />
        </body>
      </html>
  )
}
