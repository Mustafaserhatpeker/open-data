import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

type RouteTrackerContextType = {
    prevPath: string | null;
};

const RouteTrackerContext = createContext<RouteTrackerContextType>({
    prevPath: null,
});

export const RouteTrackerProvider = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const [prevPath, setPrevPath] = useState<string | null>(null);
    const lastPath = useRef(location.pathname);

    useEffect(() => {
        if (location.pathname !== lastPath.current) {
            setPrevPath(lastPath.current);
            lastPath.current = location.pathname;
        }
    }, [location]);

    return (
        <RouteTrackerContext.Provider value={{ prevPath }}>
            {children}
        </RouteTrackerContext.Provider>
    );
};

export const useRouteTracker = () => useContext(RouteTrackerContext);
