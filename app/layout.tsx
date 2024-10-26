import "@/globals.css";
import { SelectEveryRecipeSlugs } from "@actions/database/Recipe";
import HeaderClient from "@comps/client/header";
import { getSession } from "@lib/auth";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "G4cuisiner",
    description: "Application de partage de recettes",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession();

    const slugPageList = [{ group: "Recipe", route: "/recipe", slugList: await SelectEveryRecipeSlugs() }];

    return (
        <html lang="fr" className="h-full">
            <body className={`${inter.className} flex h-full flex-col items-center justify-center overflow-x-hidden`}>
                <HeaderClient serverSession={session} slugPageList={slugPageList} />
                <main className="flex w-full flex-1 flex-col items-center justify-center gap-2 px-4 pb-4">
                    {children}
                </main>
            </body>
        </html>
    );
}