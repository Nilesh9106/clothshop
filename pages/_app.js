import Footer from '../components/footer'
import Navbar from '../components/navbar'
import LoadingBar from 'react-top-loading-bar'
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "next-themes";
import '../styles/globals.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken'
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }) {
  const [Cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [SideNav, setSideNav] = useState(false);
  const [Token, setToken] = useState({ value: null })
  const [Key, setKey] = useState(0)
  const [User, setUser] = useState({ Email: '', Name: '', isAdmin: false })
  const [progress, setProgress] = useState(0)
  const [Disable, setDisable] = useState(Object.keys(Cart).length === 0)
  let Router = useRouter()

  useEffect(() => {
    Router.events.on('routeChangeComplete', () => {
      setProgress(100);
    })
    Router.events.on('routeChangeStart', () => {
      setProgress(40);
    })
    try {
      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')));
      }
      if (localStorage.getItem('subtotal')) {
        setSubTotal((localStorage.getItem('subtotal')));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear
    }
    if (localStorage.getItem('token')) {

      setToken({ value: localStorage.getItem('token') })
      console.log('hello use effect is running');
      try {
        var decoded = jwt.verify(localStorage.getItem('token'), '@NILESH003');
        setUser(decoded);

      } catch (err) {
        localStorage.removeItem('token')
        setKey(Math.random())
        setToken({ value: null })
        setUser(null)
        Router.push('/')
      }
    }
    else {
      setUser({ Email: '', Name: '' })
    }
    setKey(Math.random())
  }, [Router.query])



  const saveCart = (newCart) => {

    localStorage.setItem('cart', JSON.stringify(newCart));
    let keys = Object.keys(newCart);
    let temp = 0;
    for (let i = 0; i < keys.length; i++) {
      temp += newCart[keys[i]].price * newCart[keys[i]].qty;
    }
    setSubTotal(temp);

    if (Object.keys(newCart).length === 0) {
      setDisable(true)
    } else {
      setDisable(false)
    }

    localStorage.setItem('subtotal', temp);
  }
  const buyNow = (itemCode, qty, price, name, size, variant) => {

    let newCart = {};
    newCart[itemCode] = { qty, price, name, size, variant };

    setCart(newCart);
    saveCart(newCart);

    Router.push({ pathname: '/checkout' }, `/checkout`);
  }
  const clearCart = () => {
    setCart({});
    saveCart({});
    setSideNav(false)
  }
  const addToCart = (itemCode, qty, price, name, size, variant, availableQty) => {
    let newCart = Cart;


    if (itemCode in Cart) {
      newCart[itemCode].qty = Cart[itemCode].qty + qty;

    } else {
      newCart[itemCode] = { qty, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);

  }
  const removeFromCart = (itemCode, qty) => {
    let newCart = Cart;
    if (itemCode in Cart) {
      newCart[itemCode].qty = Cart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode]
    }
    setCart(newCart);
    saveCart(newCart);
  }

  return <ThemeProvider enableSystem={true} attribute="class">
    <LoadingBar
      color='#1d4ed8'
      progress={progress}
      waitingTime={400}
      onLoaderFinished={() => setProgress(0)}
    />
    <div className='dark:bg-neutral-950 dark:text-white'>
      <Navbar key={Key} Disable={Disable} setDisable={setDisable} User={User} setUser={setUser} setKey={setKey} setToken={setToken} Token={Token} Cart={Cart} SideNav={SideNav} setSideNav={setSideNav} setCart={setCart} subTotal={subTotal} setSubTotal={setSubTotal} addToCart={addToCart} removeFromCart={removeFromCart} saveCart={saveCart} clearCart={clearCart} />
      <Component buyNow={buyNow} User={User} setUser={setUser} Cart={Cart} setCart={setCart} subTotal={subTotal} setSubTotal={setSubTotal} addToCart={addToCart} removeFromCart={removeFromCart} saveCart={saveCart} clearCart={clearCart}  {...pageProps} />
      <Footer />
      <ToastContainer />
    </div>
  </ThemeProvider>
}

export default MyApp
