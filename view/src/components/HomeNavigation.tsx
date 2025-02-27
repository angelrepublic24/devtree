import {Link} from 'react-router-dom'

export default function HomeNavigation() {
  return (
    <>
    <Link className='text-white p-2 uppercase text-xs font-black cursor-pointer' to="/auth/login"> Sign In</Link>
    <Link className='bg-lime-500 text-slate-800 rounded-lg p-2 uppercase font-black text-xs cursor-pointer' to="/auth/register"> Sign Up</Link>
      
    </>
  )
}
