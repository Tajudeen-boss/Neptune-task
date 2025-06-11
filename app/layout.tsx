import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/components/providers/query-provider'
import { Toaster } from '@/components/ui/toaster'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Neptune Search - AI-Powered Service Provider Search',
  description: 'Find local service providers with AI-powered search. Get comprehensive results with Neptune Score ratings and instant booking.',
  keywords: 'service providers, local services, AI search, Neptune Score, dishwasher repair, appliance repair',
  openGraph: {
    title: 'Neptune Search - AI-Powered Service Provider Search',
    description: 'Find local service providers with AI-powered search. Get comprehensive results with Neptune Score ratings and instant booking.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <TooltipProvider>
            <Toaster />
            {children}
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  )
}