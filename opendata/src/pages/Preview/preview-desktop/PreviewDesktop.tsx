import { FilePicker } from "./components/inner-components/FilePicker";
import { PreviewRenderer } from "./components/PreviewRenderer";
import { PreviewToolbar } from "./components/inner-components/PreviewToolbar";
import { useFilePreview } from "../hooks/useFilePreview";

function PreviewDesktop() {
    const { state, onFileSelect, reset, downloadUrl } = useFilePreview();

    return (
        <div className="w-full h-full max-w-6xl mx-auto p-4 space-y-4">
            <div className="text-2xl font-semibold">PreviewDesktop</div>

            {!state.file && (
                <FilePicker onSelect={onFileSelect} />
            )}

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
    );
}

export default PreviewDesktop;