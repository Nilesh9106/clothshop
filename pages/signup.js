import Link from "next/link"
import Head from "next/head";
import { useEffect, useState } from "react"
import { AiOutlineMail, AiOutlineUser, AiOutlineLock } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/router";
const Signup = () => {
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Password2, setPassword2] = useState('')
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/')
    }
  }, [])

  const signUp = async (e) => {
    e.preventDefault();
    // console.log(Name,Email,Password,Password2);
    if (Password === Password2) {
      let req = { Name: Name, Email: Email, Password: Password }

      let ans = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(req)
      });

      let response = await ans.json();
      // console.log(response);
      if (response.res == 'success') {
        toast.success('Account created Successfully Now you Login to Your Account', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      } else {
        toast.warning('You Have Already have Account on this Email ', {
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

    } else {
      toast.error('Password Mismatch', {
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
        <title>Sign Up</title>
      </Head>
      <ToastContainer />
      <section className="bg-white dark:bg-neutral-900">
        <div className="container flex lg:items-center mt-20 lg:mt-1  justify-center md:py-16 py-5 px-6 mx-auto">
          <form onSubmit={signUp} className="w-full max-w-md">
            <h1 className="text-3xl font-semibold text-neutral-800 capitalize dark:text-white">sign Up</h1>

            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <AiOutlineUser className="text-2xl mx-3 text-neutral-300 dark:text-neutral-500" />
              </span>

              <input type="text" value={Name} onChange={(e) => {
                setName(e.target.value)
              }} className="block w-full py-3 text-neutral-700 bg-white border rounded-md px-11 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" name="Name" placeholder="Your Name" />
            </div>
            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <AiOutlineMail className="text-2xl mx-3 text-neutral-300 dark:text-neutral-500" />
              </span>

              <input type="email" value={Email} onChange={(e) => {
                setEmail(e.target.value)
              }} className="block w-full py-3 text-neutral-700 bg-white border rounded-md px-11 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" name="Email" placeholder="Email address" />
            </div>

            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <AiOutlineLock className="text-2xl mx-3 text-neutral-300 dark:text-neutral-500" />
              </span>

              <input type="password" value={Password} onChange={(e) => {
                setPassword(e.target.value)
              }} name="Password" className="block w-full px-10 py-3 text-neutral-700 bg-white border rounded-md dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
            </div>
            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <AiOutlineLock className="text-2xl mx-3 text-neutral-300 dark:text-neutral-500" />
              </span>

              <input type="password" value={Password2} onChange={(e) => {
                setPassword2(e.target.value)
              }} name="Password2" className="block w-full px-10 py-3 text-neutral-700 bg-white border rounded-md dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password" />
            </div>

            <div className="mt-6">
              <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Sign Up
              </button>

              {/* <p className="mt-4 text-center text-neutral-600 dark:text-neutral-400">or sign Up with</p>

              <a href="#" className="flex items-center justify-center px-6 py-3 mt-4 text-neutral-600 transition-colors duration-300 transform border rounded-lg dark:border-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-600">
                <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
                  <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                  <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                  <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                  <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                </svg>

                <span className="mx-2">Sign Up with Google</span>
              </a> */}

              <div className="mt-6 text-center ">
                <Link href="/login" className="text-sm text-blue-500 hover:underline dark:text-blue-400">
                  Already have an account?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Signup