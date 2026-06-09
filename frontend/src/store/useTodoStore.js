import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { Navigate } from 'react-router-dom';

export const useTodoStore = create((set) => ({
    loading: false,
    user: null,
    isAuth: false,
    todos: [],
    login: async (formdata) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post("/auth/login", formdata);

            set({
                user: response.data.user,
                isAuth: true
            });
            toast.success("login successful")

        } catch (error) {
            const message =
                error.response?.data?.message || // backend error message
                error.message ||
                "Something went wrong";

            toast.error(message);
            set({
                user: null,
            });
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },

    register: async (formdata) => {
        try {
            const response = await axiosInstance.post("/auth/register", formdata);

            set({
                user: response.data.user,
                isAuth: true
            });
            toast.success("login successful")

        } catch (error) {
            const message =
                error.response?.data?.message || // backend error message
                error.message ||
                "Something went wrong";

            toast.error(message);
            set({
                user: null,
            });
            console.log(error);
        } finally {
            set({ loading: false });
        }
       
    },
    checkAuth: async () => {

        set({ loading: true });
        try {
            const response = await axiosInstance.get("/auth/profile");

            set({
                user: response.data.user,
                isAuth: response.data.success
            });

        } catch (error) {
            const message =
                error.response?.data?.message || error.message ||
                "Something went wrong";

            toast.error(message);
            console.log(error);
            set({
                loading: false,
                user: null,
                isAuth: false
            });
        } finally {
            set({ loading: false });
        }
    },
    logout: async () => {

        set({ loading: true });
        try {
            const response = await axiosInstance.post("/auth/logout");

            set({
                user: null,
                isAuth: false
            });

        } catch (error) {
            const message =
                error.response?.data?.message || error.message ||
                "Something went wrong";

            toast.error(message);
            console.log(error);
            set({
                loading: false,
                user: null,
                isAuth: false
            });
        } finally {
            set({ loading: false });
        }
    }

}));

