import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRouteTracker } from "@/contexts/RouteTrackContext";

export default function BackButton({ label = "Geri" }: { label?: string }) {
    const navigate = useNavigate();
    const { prevPath } = useRouteTracker();

    const handleBack = () => {
        // Eğer bir önceki route biliniyorsa, oraya git
        if (prevPath && prevPath !== window.location.pathname) {
            navigate(prevPath);
        }
        // Eğer kullanıcı geçmişten geldiyse
        else if (window.history.length > 1) {
            navigate(-1);
        }
        // Fallback: hiçbir geçmiş yoksa (örneğin sayfa direkt açıldıysa)
        else {
            navigate("/");
        }
    };

    return (
        <Button variant="ghost" className="pl-0" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            {label}
        </Button>
    );
}
