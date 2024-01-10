import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'
import { FiHome } from 'react-icons/fi'
import { RiMenu3Line } from 'react-icons/ri'
import { HiOutlineShoppingCart, HiOutlineLogout } from 'react-icons/hi'
import { AiOutlinePlusCircle, AiOutlineUser, AiOutlineShopping, AiOutlineClose, AiOutlineMinusCircle, AiFillBank } from 'react-icons/ai'
import { useTheme } from 'next-themes'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router'

const Navbar = ({ Cart, Token, User, setUser, Disable, setKey, setToken, subTotal, addToCart, removeFromCart, SideNav, setSideNav, clearCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [SideNav, setSideNav] = useState(false);
  const [Dropdown, setDropdown] = useState(false)
  const router = useRouter();
  const toggle = () => {
    setSideNav(false);
    setIsOpen(!isOpen)
  }



  const toggleSideNav = () => {
    setSideNav(!SideNav);
    setIsOpen(false)
  }
  const { setTheme } = useTheme();
  // setTheme('light');

  return (
    <>
      <ToastContainer />
      <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-2xl shadow dark:bg-neutral-800/70">
        <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
          {/* logo  */}
          <div className="flex items-center justify-between">
            <div>
              <Link className="text-2xl font-bold text-neutral-800 transition-colors duration-300 transform dark:text-white lg:text-3xl hover:text-neutral-700 dark:hover:text-neutral-300" href="/">Shop Hub</Link>
            </div>

          </div>

          {/* navigation  */}
          <div className={`absolute inset-x-0 md:h-full h-[100vh] z-40 max-md:dark:bg-neutral-900 max-md:bg-neutral-200   w-full px-6 py-4 transition-all duration-300 ease-in-out md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full'}`}>


            <div className="flex flex-col md:flex-row md:mx-6">
              <Link href={'/shirts'} className="my-2 text-neutral-700 transition-colors duration-300 transform dark:text-neutral-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">Shirts</Link>
              <Link href={'/tshirts'} className="my-2 text-neutral-700 transition-colors duration-300 transform dark:text-neutral-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">T-Shirts</Link>
              <Link href={'/pants'} className="my-2 text-neutral-700 transition-colors duration-300 transform dark:text-neutral-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">Pants</Link>
              <Link href={'/shoes'} className="my-2 text-neutral-700 transition-colors duration-300 transform dark:text-neutral-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0">shoes</Link>
              {!Token.value && <Link href={'/login'} className="my-2 text-blue-600 hidden md:block transition-colors duration-300 transform dark:text-blue-400 hover:text-blue-400 dark:hover:text-blue-500 md:mx-4 md:my-0">Login</Link>}
            </div>


          </div>
          {/* cart and user  */}
          <div className=" items-center justify-center md:block hidden t">
            {Token.value && <button onMouseEnter={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className={`relative text-neutral-700 transition-colors duration-300 bg-none hover:bg-neutral-100 hover:shadow  dark:hover:bg-neutral-700 rounded-full p-3 transform dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-300`}><AiOutlineUser className='text-lg' /></button>}
            <button onClick={toggleSideNav} className={`relative hover:shadow text-neutral-700 transition-colors duration-300 bg-none hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full p-3 transform dark:text-neutral-200 hover:text-neutral-600 dark:hover:text-neutral-300`}><FaShoppingCart className='text-lg' /></button>
          </div>
        </div>


      </nav>
      {/* cart  */}
      <div className={`fixed bg-blue-100 h-[100vh] top-0 right-0   z-50 md:w-[27%] w-full px-6 py-14 transition-all duration-300 ease-in-out  dark:bg-neutral-800 ${SideNav ? 'opacity-100 ' : 'opacity-0 translate-x-full'}`}>

        <div className='p-2 hover:shadow t hover:bg-blue-50 dark:hover:bg-neutral-700 absolute top-7 right-8 rounded-full'><AiOutlineClose className=' text-2xl  cursor-pointer     ' onClick={toggleSideNav} /></div>
        <h3 className='text-2xl p-3 text-center font-bold '> Shopping Cart</h3>
        {Object.keys(Cart).length === 0 && <div className='text-lg font-normal px-10 py-3'>Your Cart Is Empty </div>}
        <ul className='list-decimal px-5'>
          {Object.keys(Cart).map((data, index) => {

            return (
              <li className='my-3' key={index}>
                <div className='flex font-semibold'>
                  <Link href={`/products/${data}`}><span className='w-2/3'>{Cart[data].name} ( {Cart[data].size}/{Cart[data].variant} )</span></Link>
                  <div className='w-1/3 flex items-center justify-center text-lg '><AiOutlineMinusCircle onClick={() => {
                    removeFromCart(data, 1);
                  }} className='text-blue-800 cursor-pointer' /><span className='mx-4'>{Cart[data].qty}</span> <AiOutlinePlusCircle className='text-blue-800 cursor-pointer' onClick={() => {
                    addToCart(data, 1, Cart[data].price, Cart[data].name, Cart[data].size, Cart[data].variant);
                  }} /></div>
                </div>
              </li>
            )
          })}

        </ul>
        <div className='bg-neutral-500 py-[0.5px] my-3'></div>
        <span className='mt-4 mx-4 text-lg font-bold'>Sub Total : {subTotal}</span>
        <div className='flex gap-5 my-10 px-3'>
          {!Disable && <Link href={'/checkout'} onClick={toggleSideNav} className="flex  text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded " >Checkout</Link>}
          <button onClick={() => {
            clearCart();
          }} className="flex  text-white disabled:bg-blue-300 bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded " disabled={Disable}>Clear Cart</button>
        </div>
      </div>
      {/* bottom navigation */}

      <ul className='flex justify-evenly dark:bg-neutral-800 bg-neutral-100 z-50 py-4 px-2   fixed md:hidden w-[100%]   bottom-0'>
        <li onClick={toggle} className='p-2 active:scale-95'><RiMenu3Line className='sm:text-2xl text-xl font-bold' /></li>
        <Link href={'/'} className='p-2 active:scale-95'><FiHome className='sm:text-2xl text-xl font-bold' /></Link>
        <li onClick={toggleSideNav} className='p-2 active:scale-95'><HiOutlineShoppingCart onClick={toggleSideNav} className='sm:text-2xl text-xl font-bold' /></li>
        {!Token.value && <Link href={'/login'} className='p-2 active:scale-95' ><FaUserCircle className='sm:text-2xl text-xl font-bold' /></Link>}
        {Token.value && <li onClick={() => { setDropdown(!Dropdown) }} className='p-2 active:scale-95'>
          <FaUserCircle className='sm:text-2xl text-xl cursor-pointer font-bold' />
        </li>}
      </ul>
      {/* dropdown */}
      <div onMouseEnter={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className={`fixed md:top-14 py-2 rounded-lg transition-all duration-300 md:bottom-auto max-md:bottom-16 shadow-lg z-50 bg-neutral-50 dark:bg-neutral-800 md:right-20 right-10 inline-block ${Dropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} `}>
        <div >
          <Link href={'/myaccount'}><div className="flex items-center px-3 py-3 text-sm text-neutral-600 capitalize transition-colors duration-300 transform dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white">
            <AiOutlineUser className='text-lg mx-1 text-neutral-600 dark:text-neutral-300' />
            <span className="mx-1">
              view profile
            </span>
          </div></Link>
          <Link href={'/allorders'}><div className="flex items-center px-3 py-3 text-sm text-neutral-600 capitalize transition-colors duration-300 transform dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white">
            <AiOutlineShopping className='text-lg mx-1 text-neutral-600 dark:text-neutral-300' />
            <span className="mx-1">
              orders
            </span>
          </div></Link>
          {
            User.isAdmin && <Link href={'/admin'}><div className="flex items-center px-3 py-3 text-sm text-neutral-600 capitalize transition-colors duration-300 transform dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white">
              <AiFillBank className='text-lg mx-1 text-neutral-600 dark:text-neutral-300' />
              <span className="mx-1">
                Admin
              </span>
            </div></Link>
          }

          <hr className="border-neutral-200 dark:border-neutral-700 " />

          <button onClick={() => {
            localStorage.removeItem('token')
            setKey(Math.random())
            setToken({ value: null })
            setUser({ Email: '', Name: '' })
            router.push('/')
            toast.success('Logout Successfully', {
              position: "top-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })

          }} className="flex items-center p-3 text-sm text-neutral-600 w-full capitalize transition-colors duration-300 transform dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:hover:text-white">
            <HiOutlineLogout className='text-lg mx-1 text-neutral-600 dark:text-neutral-300' />
            <span className="mx-1">
              Log Out
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Navbar