import axios from "../api/axios";
import { useStoreActions } from "easy-peasy";

const useRefreshToken = () => {
    const setToken = useStoreActions((actions) => actions.setToken);

    const refresh = async () => {
        const response = await axios.get("/auth/refresh", {
            withCredentials: true,
        });

        setToken(response.data.accessToken);
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
