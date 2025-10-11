import React from "react";

interface Props {
    text: string;
    className?: string;
}

export const TextBlock: React.FC<Props> = ({ text, className }) => {
    return (
        <div className={`w-full h-full border rounded overflow-auto ${className || ""}`}>
            <pre className="p-4 text-sm leading-6 whitespace-pre-wrap break-words font-mono">
                {text}
            </pre>
        </div>
    );
};