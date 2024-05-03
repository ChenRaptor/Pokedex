import { useEffect, useState } from "react";


const useRefresh = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return isLoading;
}

export default useRefresh;