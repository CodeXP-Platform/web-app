import useAuth from "@/hooks/use-auth";
import { env } from "@/lib/env";
import { paths } from "@/lib/paths";
import axios from "axios";

export const http = axios.create({
    baseURL: env.apiUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

http.interceptors.request.use(
    (config) => {
        const accessToken = useAuth.getState().accessToken;

        if (accessToken !== null) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            const { accessToken, clearAuth } = useAuth.getState();
            if (accessToken) {
                clearAuth();
                window.location.replace(paths.auth.login);
            }
        }
        return Promise.reject(error);
    },
);
