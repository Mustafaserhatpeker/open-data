import React, { useMemo } from "react";
import DOMPurify from "dompurify";

interface Props {
    html: string;
    className?: string;
    height?: number;
}

export const HTMLPreview: React.FC<Props> = ({ html, className, height = 480 }) => {
    const sanitized = useMemo(() => {
        // Allow basic but safe HTML for preview
        return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
    }, [html]);

    return (
        <div className={`w-full border rounded ${className || ""}`} style={{ height }}>
            <iframe
                className="w-full h-full rounded"
                sandbox="allow-same-origin"
                srcDoc={sanitized}
                title="HTML Preview"
            />
        </div>
    );
};