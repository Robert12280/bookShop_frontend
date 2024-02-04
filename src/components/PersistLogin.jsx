import { useStoreActions, useStoreState } from "easy-peasy";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import { useEffect, useState } from "react";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const token = useStoreState((state) => state.token);
    const setIsRefreshSuccess = useStoreActions(
        (actions) => actions.setIsRefreshSuccess
    );
    const refresh = useRefreshToken();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
                setIsRefreshSuccess(true);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        !token ? verifyRefreshToken() : setIsLoading(false);
    }, []);

    return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
