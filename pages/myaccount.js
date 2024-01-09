import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react'

const MyAccount = ({ User }) => {
    const router = useRouter();



    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/');
        }
    }, [router.query])




    return (
        <>
            <Head>
                <title>My Account</title>
            </Head>
            <div className='container mx-auto '>
                <div className='text-2xl font-bold px-4 py-3 text-center'>Hello, {User && User.Name} </div>

            </div>
        </>
    )
}

export default MyAccount