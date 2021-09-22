import { useEffect, useState } from "react"

export default function useFetch(url) {
    const [ret , setData] = useState([]);

    useEffect(()=>{
        fetch(url)
        .then(res=>res.json())
        .then(data=>setData(data))
    }, [url]);

    return ret;
}