import { useStoreState } from "easy-peasy";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import { useEffect, useState } from "react";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const token = useStoreState((state) => state.token);
    const refresh = useRefreshToken();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.log(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        !token ? verifyRefreshToken() : setIsLoading(false);

        return () => (isMounted = false);
    }, []);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${token}`);
    }, [isLoading]);

    return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
