import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRouteTracker } from "@/contexts/RouteTrackContext";

interface BackButtonProps {
    fallback?: string; // opsiyonel — default: "/"
    label?: string; // opsiyonel — default: "Geri"
}

export default function BackButton({ fallback = "/", label = "Geri" }: BackButtonProps) {
    const navigate = useNavigate();
    const { prevPath } = useRouteTracker();

    const handleBack = () => {
        // Aynı sayfaya dönmeye çalışmayı engelle
        if (prevPath && prevPath !== window.location.pathname) {
            navigate(prevPath);
        } else if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(fallback);
        }
    };

    return (
        <Button variant="ghost" className="pl-0" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {label}
        </Button>
    );
}
