import Link from 'next/link'

const Footer = () => {
    return (
        <>
            <footer className="flex flex-col items-center justify-between p-6 bg-white dark:bg-neutral-900 sm:flex-row">
                <Link href="/" className="text-xl font-bold text-neutral-600 transition-colors duration-300 dark:text-white hover:text-neutral-700 dark:hover:text-neutral-300">Shop Hub</Link>

                <p className="text-sm text-neutral-600 dark:text-neutral-300">© Copyright 2021. All Rights Reserved.</p>

                <div className="flex -mx-2">

                </div>
            </footer>
        </>
    )
}

export default Footer