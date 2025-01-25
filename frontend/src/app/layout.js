import './globals.css'

export const metadata = {
  title: 'HireFlow AI - Intelligent Recruiting Software',
  description: 'Transform your hiring process with AI-powered phone screens and candidate assessment',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
