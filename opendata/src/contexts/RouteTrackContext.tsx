import {
    createContext,
    useContext,
    useEffect,
    useRef,
    type ReactNode,
    type JSX,
} from "react";
import { useLocation } from "react-router-dom";

// Context'in tipi: string veya null olabilir
const RouteTrackerContext = createContext<string | null>(null);

// Provider bileşeni için prop tipi tanımlanıyor
interface RouteTrackerProviderProps {
    children: ReactNode;
}

export function RouteTrackerProvider({
    children,
}: RouteTrackerProviderProps): JSX.Element {
    const location = useLocation();
    const previousPathRef = useRef<string | null>(null);

    useEffect(() => {
        previousPathRef.current = location.pathname;
    }, [location.pathname]);

    return (
        <RouteTrackerContext.Provider value={previousPathRef.current}>
            {children}
        </RouteTrackerContext.Provider>
    );
}

export function usePreviousPath(): string | null {
    return useContext(RouteTrackerContext);
}