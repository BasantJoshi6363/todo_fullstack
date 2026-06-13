import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { Navigate } from 'react-router-dom';
// import { fetchCompletedTask } from '../../../backend/src/controllers/todos.controller';

export const useTodoStore = create((set) => ({
    loading: false,
    user: null,
    isAuth: false,
    todos: [],
    tasks: [],
    singleTask: [],
    renderListener: false,
    completedTask: [],
    pendingTask: [],
    stats: [],
    setUser: (user) => {
        set({ user: user })
    },
    setRenderListener: (value) => { set({ renderListener: value }) },
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
                isAuth: false
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
            await axiosInstance.post("/auth/logout");

            set({
                user: null,
                isAuth: false,
            });

            toast.success("Logout successful");
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Something went wrong";

            toast.error(message);
        } finally {
            set({ loading: false });
        }
    },
    updateProfile: async (data) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.put(`/auth/updateuser`, data);

            set({
                user: response.data.user,
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

    fetchTask: async () => {
        set({ loading: true });
        try {
            const response = await axiosInstance.get(`/todo`);

            set({
                tasks: response.data.todo,
            });

        } catch (error) {
            const message =
                error.response?.data?.message || error.message ||
                "Something went wrong";

            toast.error("todo creation failed");
            console.log(error);
            set({
                loading: false,
                tasks: null,
            });
        } finally {
            set({ loading: false });
        }
    },
    fetchSingleTask: async (data) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.post(`/todo/create`, data);

            set({
                tasks: response.data.task,
            });

        } catch (error) {
            const message =
                error.response?.data?.message || error.message ||
                "Something went wrong";

            toast.error("todo creation failed");
            console.log(error);
            set({
                loading: false,
                tasks: null,
            });
        } finally {
            set({ loading: false });
        }
    },
    completeTask: async (data, id) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.put(`/todo/${id}`, { isFinished: data });
            toast.success("task completed.")

        } catch (error) {
            const message =
                error.response?.data?.message || error.message ||
                "Something went wrong";

            toast.error("todo creation failed");
            console.log(error);
            set({
                loading: false,
                tasks: null,
            });
        } finally {
            set({ loading: false });
        }
    },
    fetchCompletedTask: async (data, id) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.get(`/todo/completed-task`);
            set({ completedTask: response.data.todo });

        } catch (error) {
            const message =
                error.response?.data?.message || error.message ||
                "Something went wrong";

            toast.error("todo creation failed");
            console.log(error);
            set({
                loading: false,
                tasks: null,
            });
        } finally {
            set({ loading: false });
        }
    },
    fetchPendingTask: async (data, id) => {
        set({ loading: true });
        try {
            const response = await axiosInstance.get(`/todo/pending-task`);
            set({ pendingTask: response.data.todo });

        } catch (error) {
            const message =
                error.response?.data?.message || error.message ||
                "Something went wrong";

            toast.error("todo creation failed");
            console.log(error);
            set({
                loading: false,
                tasks: null,
            });
        } finally {
            set({ loading: false });
        }
    },
    createTask: async (data) => {
        console.log(data)
        set({ loading: true });
        try {
            const response = await axiosInstance.post(`/todo/create`, data);
            toast.success("task created")

        } catch (error) {
            const message =
                error.response?.data?.message || error.message ||
                "Something went wrong";

            toast.error("todo creation failed");
            console.log(error);
            set({
                loading: false,
                tasks: null,
            });
        } finally {
            set({ loading: false });
        }
    },
    deleteTodo: async (id) => {
        console.log(id)
        set({ loading: true });
        try {
            const response = await axiosInstance.delete(`/todo/${id}`);
            toast.success("task deleted")

        } catch (error) {
            const message =
                error.response?.data?.message || error.message ||
                "Something went wrong";

            toast.error("todo creation failed");
            console.log(error);
            set({
                loading: false,
                tasks: null,
            });
        } finally {
            set({ loading: false });
        }
    },
    updateTask: async (data, id) => {
        console.log(data)
        set({ loading: true });
        try {
            const response = await axiosInstance.put(`/todo/${id}`, data);
            toast.success("task deleted")

        } catch (error) {
            const message =
                error.response?.data?.message || error.message ||
                "Something went wrong";

            toast.error("todo creation failed");
            console.log(error);
            set({
                loading: false,
                tasks: null,
            });
        } finally {
            set({ loading: false });
        }
    },
    getStats: async () => {
        set({ loading: true });
        try {
            const response = await axiosInstance.get(`/todo/stats`);
            console.log(response)
            set({ stats: response.data.stats })
        } catch (error) {
            const message =
                error.response?.data?.message || error.message ||
                "Something went wrong";

            toast.error("todo creation failed");
            console.log(error);
            set({
                loading: false,
                tasks: null,
            });
        } finally {
            set({ loading: false });
        }
    },

}));

