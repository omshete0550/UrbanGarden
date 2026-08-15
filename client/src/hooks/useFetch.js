import axios from "axios";
import { useEffect, useState } from "react"
import { API_BASE_URL } from "../lib/apiBase";

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {

                const res = await axios.get(API_BASE_URL + url)
                setData(res.data)
            } catch (err) {
                setError(true)
            }
            setLoading(false)
        }
        fetchData()
    }, [url]);
    const reFetch = async () => {
        setLoading(true)
        try {
            const res = await axios.get(API_BASE_URL + url)
            setData(res.data)
        } catch (err) {
            setError(true)
        }
        setLoading(false)
    }
    return { data, loading, error, reFetch }
}

export default useFetch
