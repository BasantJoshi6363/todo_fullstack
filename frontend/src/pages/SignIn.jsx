import React, { useState } from 'react';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import AuthInput from '../component/AuthInput';
import r1 from "../assets/sign/r1.png"
import { Link, Navigate } from 'react-router-dom';
import { useTodoStore } from '../store/useTodoStore';
import Loader from '../component/Loader';

const SignIn = () => {
    const { login } = useTodoStore();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);
        try {
            await login(formData);
            <Navigate to={"/"} />
        } catch (error) {
            console.log(error.response)
            toast.error(error.message);
        } finally {
            setLoading(false)
        }
    }
    if (loading) {
        return <Loader />
    }
    return (
        <div className="min-h-screen bg-rose-400 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">



                {/* Right Side: Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Sign In</h2>

                    <form onSubmit={submitHandler}>


                        <AuthInput
                            icon={Mail} type="email" name="email"
                            placeholder="Enter Email" onChange={handleChange}
                        />
                        <AuthInput
                            icon={Lock} type="password" name="password"
                            placeholder="Enter Password" onChange={handleChange}
                        />



                        <button
                            type="submit"
                            className="w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-300 hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors"
                        >
                            Login
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-gray-600">
                        Already have an account? {' '}
                        <Link to="/signup" className="font-medium text-blue-400 hover:text-blue-500">
                            Sign In
                        </Link>
                    </p>
                </div>
                {/* Left Side: Illustration */}
                <div className="hidden md:flex md:w-1/2 bg-white items-center justify-center p-8">
                    <img
                        src={r1}
                        alt="Sign up illustration"
                        className="max-w-full h-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignIn;