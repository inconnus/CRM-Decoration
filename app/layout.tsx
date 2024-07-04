import type { Metadata, Viewport } from "next";
import "@/styles/globals.sass";
import ThemeProvider from "@/providers/theme";
import DataslotProvider from "@/providers/dataslot";
import { SWRConfig } from "swr";
import { fetcher } from "@/lib";
import SWRProvider from "@/providers/swr";
import Loading from "./[mid]/[[...page]]/loading";

export const metadata: Metadata = {
    title: 'Dataslot CRM',
    description: 'Member'
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="th">
            <head>
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <link rel="stylesheet" href="https://kit.fontawesome.com/190a9bf6af.css" crossOrigin="anonymous"></link>
            </head>
            <body >
                <SWRProvider>
                    <DataslotProvider>
                        <ThemeProvider>
                            {children}
                        </ThemeProvider>
                    </DataslotProvider>
                </SWRProvider>
            </body>
        </html>
    );
}
export const viewport: Viewport = {
    width: 'device-width',
    height: 'device-height',
    viewportFit: 'cover',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
}
