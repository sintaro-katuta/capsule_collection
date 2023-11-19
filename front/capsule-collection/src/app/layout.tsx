import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'カプコレ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#f2f7f5" />
      </head>
      <body>
        <>
          {children}
        </>
      </body>
    </html>
  )
}
