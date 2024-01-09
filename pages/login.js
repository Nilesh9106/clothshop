import Head from 'next/head'
import Link from 'next/link'
import { toast } from 'react-toastify';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai'
import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
const Login = () => {
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/')
    }
  }, [])

  const Login = async (e) => {
    e.preventDefault();
    let req = { Email: Email, Password: Password }

    let ans = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(req)
    });

    let response = await ans.json();

    if (response.success) {
      localStorage.setItem('token', response.token);

      setTimeout(() => {
        toast.success('Login Successfully', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }, 700);
      Router.push('/', '/');

    } else {
      toast.error(response.res, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }

  }
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <section className="bg-white dark:bg-neutral-900">
        <div className="container flex lg:items-center mt-20 lg:mt-1  justify-center md:py-24 py-4 px-6 mx-auto">
          <form onSubmit={Login} className="w-full max-w-md">
            <h1 className="text-3xl font-semibold text-neutral-800 capitalize dark:text-white">sign In</h1>

            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <AiOutlineMail className="text-2xl mx-3 text-neutral-300 dark:text-neutral-500" />
              </span>

              <input value={Email} type="email" onChange={(e) => {
                setEmail(e.target.value)
              }} className=" w-full py-3 text-neutral-700 bg-white border rounded-md px-11 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
            </div>

            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <AiOutlineLock className="text-2xl mx-3 text-neutral-300 dark:text-neutral-500" />
              </span>

              <input value={Password} type="password" onChange={(e) => {
                setPassword(e.target.value)
              }} className="block w-full px-10 py-3 text-neutral-700 bg-white border rounded-md dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
            </div>

            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Sign in
              </button>


              <div className="mt-6 text-center ">
                <Link href="/signup" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                  Dont have An Account?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login