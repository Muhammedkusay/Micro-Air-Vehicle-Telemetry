import { useState } from "react";

const API_URL = "http://localhost:8000/api" 

export function usePostApi() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)

    const request = async (endpoint, body, options = {}) => {
        
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers,
                },
                body: JSON.stringify(body),
            });

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result?.message || "Server Error");
            }
            
            setMessage(result.message)

            return result;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        request,
        loading,
        error,
        message
    }
};
