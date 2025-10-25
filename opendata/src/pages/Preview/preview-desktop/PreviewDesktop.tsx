import { useEffect } from "react";
import { PreviewRenderer } from "./components/PreviewRenderer";
import { PreviewToolbar } from "./components/inner-components/PreviewToolbar";
import { useFilePreview } from "../hooks/useFilePreview";
import BackButton from "@/components/back-button";
import { useParams } from "react-router-dom";

function PreviewDesktop() {
    const { state, reset, downloadUrl, loadFileFromToken } = useFilePreview();
    const { token } = useParams();
    useEffect(() => {
        if (token) {
            loadFileFromToken(token);
        }
    }, [token]);
    if (!token && !state.file) {
        return (
            <div className="w-full bg-accent">
                <div className="w-full h-full  mx-auto p-4 space-y-4">

                    <span>dosya yüklenemedi</span>

                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-accent">
            <div className="w-full h-full mx-auto p-4 space-y-4">
                <div className="text-2xl font-semibold">
                    Dosya Önizleme
                </div>
                <BackButton />


                {state.file && (
                    <div className="w-full border rounded p-4 bg-white">
                        <PreviewToolbar
                            fileName={state.file.name}
                            fileSize={state.file.size}
                            onChangeFile={reset}
                            downloadUrl={downloadUrl}
                        />

                        <div className="mt-4">
                            {state.status === "loading" && (
                                <div className="p-4 text-sm text-gray-500">Önizleme hazırlanıyor...</div>
                            )}
                            {state.status === "error" && (
                                <div className="p-4 text-sm text-red-600">
                                    Hata: {state.error || "Bilinmeyen hata"}
                                </div>
                            )}
                            {state.status === "ready" && (
                                <PreviewRenderer data={state.data} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PreviewDesktop;
