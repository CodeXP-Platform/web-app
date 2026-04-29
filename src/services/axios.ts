import useAuth from "@/hooks/use-auth";
import { env } from "@/lib/env";
import axios from "axios";

export const http = axios.create({
    baseURL: env.apiUrl,
});

axios.interceptors.request.use(
    (config) => {
        const jwt = useAuth.getState().jwt;

        if (jwt !== null) {
            config.headers.Authorization = `Bearer ${jwt}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
