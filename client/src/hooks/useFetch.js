import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../lib/apiBase";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(false);

            try {
                const res = await axios.get(API_BASE_URL + url, {
                    withCredentials: true,
                });

                setData(res.data);
            } catch (err) {
                console.error("API request failed:", err);
                setError(true);
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    const reFetch = async () => {
        setLoading(true);
        setError(false);

        try {
            const res = await axios.get(API_BASE_URL + url, {
                withCredentials: true,
            });

            setData(res.data);
        } catch (err) {
            console.error("API request failed:", err);
            setError(true);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        reFetch,
    };
};

export default useFetch;