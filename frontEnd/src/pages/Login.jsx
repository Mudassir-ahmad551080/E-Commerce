import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = () => {
  const {token,setToken,backendURL,navigate} = useContext(ShopContext )
  const [state,setCurrentStat] = useState('Login');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword]= useState('');
  async function  submitHnadler(e){
     e.preventDefault();

     try {
        if(state === 'Sign Up'){
           const response = await axios.post(backendURL+'/api/user/register',{name,email,password});
           if(response.data.success){
              setToken(response.data.token);
              localStorage.setItem('token',response.data.token)
           }
           else{
            toast.error(response.data.message)
           }
        }
        else{
          const response = await axios.post(backendURL+'/api/user/login',{email,password});
          if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token',response.data.token)
          }
          else{
             toast.error(response.data.message)
          }

        }
     } catch (error) {

      console.log(error)
      toast.error(error.message)
     }
     
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form onSubmit={submitHnadler} className='flex  shadow-md md:p-10 p-2 px-3 rounded-md flex-col mt-3 mx-auto md:w-90 w-70  gap-4 items-center mt-12 '>
       <div className='inline-flex items-center text-center justify-center gap-2 mt-3'>
          <p className='prata-regular text-2xl '>{state}</p>
          <hr className='h-[2px] rounded-full w-8 bg-zinc-600' />
       </div>
    {state === "Login"?'':  <input type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder='Name' required className='border border-gray-500 outline-none p-2 w-full' />}  
        <input type="email" placeholder='email' onChange={(e)=>setEmail(e.target.value)} value={email} required className='border border-gray-500 outline-none p-2 w-full' />
        <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} value={password} required className='border border-gray-500 outline-none p-2 w-full' />
          <div className='flex w-full justify-between text-gray-500'>
            <p className='text-sm  cursor-pointer'>Forgot Your Password?</p>
            {
              state==="Login"?
              <p className='cursor-pointer text-sm  hover:underline' onClick={()=>setCurrentStat('Sign Up')}>
                Create Account
              </p>:
              <p className='cursor-pointer text-sm  hover:underline' onClick={()=>setCurrentStat('Login')}>
               Login Here
              </p>
            }
          </div>
          <button className='bg-black px-6 mt-2 mb-1 py-1 text-white cursor-pointer'>{state==='Login'?'Sign In':'Sign Up'}</button>
    </form>
  )
}

export default Login