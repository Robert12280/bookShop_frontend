import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
    const [bookData, setBookData] = useState([]);
    const [bookFetchError, setBookFetchError] = useState(null);
    const [bookIsLoading, setBookIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async (url) => {
            try {
                setBookIsLoading(true);
                const response = await axios.get(url, {
                    signal: controller.signal,
                });
                setBookFetchError(null);
                setBookData(response.data);
            } catch (err) {
                setBookFetchError(err.message);
                setBookData([]);
            } finally {
                setBookIsLoading(false);
            }
        };

        fetchData(dataUrl);

        const cleanUp = () => {
            console.log("clean up function");
            controller.abort();
        };

        return cleanUp;
    }, [dataUrl]);

    return { bookData, bookIsLoading, bookFetchError };
};

export default useAxiosFetch;
