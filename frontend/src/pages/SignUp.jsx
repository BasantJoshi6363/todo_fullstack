import React, { useState } from 'react';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import AuthInput from '../component/AuthInput';
import r2 from "../assets/sign/r2.png"
import { Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTodoStore } from "../store/useTodoStore"
import Loader from '../component/Loader';
const SignUp = () => {
    const { register } = useTodoStore();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if(formData.password !==formData.confirmPassword){
            return toast.error("password & confirm password field doesn't match.")
        }
        setLoading(true);
        try {
            await register(formData);
            <Navigate to={"/"} />
        } catch (error) {
            console.log(error.response)
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="">
            {loading ? <Loader /> : <div className="min-h-screen bg-rose-400 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">

                    {/* Left Side: Illustration */}
                    <div className="hidden md:flex md:w-1/2 bg-white items-center justify-center p-8">
                        <img
                            src={r2}
                            alt="Sign up illustration"

                            className="size-[90%]"
                        />
                    </div>

                    {/* Right Side: Form */}
                    <div className="w-full md:w-1/2 p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Sign Up</h2>

                        <form onSubmit={submitHandler}>

                            <AuthInput
                                icon={User} type="text" name="name"
                                placeholder="Enter Username" onChange={handleChange}
                            />
                            <AuthInput
                                icon={Mail} type="email" name="email"
                                placeholder="Enter Email" onChange={handleChange}
                            />
                            <AuthInput
                                icon={Lock} type="password" name="password"
                                placeholder="Enter Password" onChange={handleChange}
                            />
                            <AuthInput
                                icon={Lock} type="password" name="confirmPassword"
                                placeholder="Confirm Password" onChange={handleChange}
                            />

                            <div className="flex items-center mb-6">
                                <input
                                    id="agreeTerms"
                                    name="agreeTerms"
                                    type="checkbox"
                                    className="h-4 w-4 text-rose-500 border-gray-300 rounded focus:ring-rose-400"
                                    onChange={handleChange}
                                />
                                <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
                                    I agree to all terms
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-300 hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors"
                            >
                                Register
                            </button>
                        </form>

                        <p className="mt-6 text-sm text-gray-600">
                            Already have an account? {' '}
                            <Link to="/signin" className="font-medium text-blue-400 hover:text-blue-500">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default SignUp;