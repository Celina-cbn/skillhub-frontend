import { ILogin } from "@/interfaces/user";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const loginService = async (params: ILogin) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message);
        }

        return await response.json(); 

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        throw new Error("Error connecting to API");
    }
};

export const signupService = async (name: string, email: string, password: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message);
        }

        return await response.json(); 

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        throw new Error("Error connecting to API");
    }
};