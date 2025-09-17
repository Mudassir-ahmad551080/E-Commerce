import React from 'react'
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl+ '/api/user/admin',{email,password});
            if(response.data.success){
                setToken(response.data.token);
            }
            else{
                toast.error(response.data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong' + error.message);
        }
    }
    return (
        <div>
            <div className="flex items-center shadow-md justify-center min-h-screen bg-gray-100">
                <form className="bg-white shadow-lg p-8 rounded shadow-md w-full max-w-sm md:mx-0 mx-3" onSubmit={onSubmitHandler}>
                    <h2 className="text-2xl prata-regular   mb-6 text-center">Admin Panel</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            className="w-full outline-none px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            onChange={(e)=>setEmail(e.target.value)}
                            value={email}
                            id="email"
                            name="email"
                            required
                            autoComplete="username"
                            placeholder='Your@gmail.com'
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input
                            className="w-full outline-none px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            onChange={(e)=>setPassword(e.target.value)}
                            value={password}
                            id="password"
                            name="password"
                            required
                            autoComplete="current-password"
                            placeholder='**********'
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 cursor-pointer rounded  transition-colors" 
                    >
                        Login
                    </button>
                    <div className="mt-4 text-center">
                        <a href="#" className="text-blue-600 hover:underline text-sm">Forgot password?</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login