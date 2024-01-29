import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchData = async (url) => {
            try {
                setIsLoading(true);
                const response = await axios.get(url, {
                    signal: controller.signal,
                });
                if (isMounted) {
                    setFetchError(null);
                    setData(response.data);
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        fetchData(dataUrl);

        const cleanUp = () => {
            console.log("clean up function");
            isMounted = false;
            controller.abort();
        };

        return cleanUp;
    }, [dataUrl]);

    return { data, isLoading, fetchError };
};

export default useAxiosFetch;
