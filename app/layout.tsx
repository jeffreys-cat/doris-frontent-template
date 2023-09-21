'use client';

import '@/styles/globals.css';
import { Metadata } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { ConfigProvider } from 'antd';

import { siteConfig } from '@/config/site';
import { checkLogin } from '@/lib/auth';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/site-header';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';

const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <>
            <html lang="en" suppressHydrationWarning>
                <head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <meta charSet="utf-8" />
                    <title>Doris QRCode Tools</title>
                    <link
                        rel="shortcut icon"
                        href="./favicon.ico"
                        // type="image/png"
                    />
                </head>
                <body
                    className={cn(
                        'min-h-screen bg-background font-sans antialiased',
                        fontSans.variable
                    )}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <ConfigProvider>
                            <div className="relative flex min-h-screen flex-col">
                                {pathname === '/login' ? <></> : <SiteHeader />}
                                <div className="flex-1 px-12 py-8">
                                    {children}
                                </div>
                            </div>
                            <TailwindIndicator />
                        </ConfigProvider>
                    </ThemeProvider>
                </body>
            </html>
        </>
    );
}
