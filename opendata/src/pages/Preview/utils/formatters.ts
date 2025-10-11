export function formatXml(xml: string): string {
    // Pretty-print XML (simple approach)
    try {
        const PADDING = "  ";
        const reg = /(>)(<)(\/*)/g;
        let xmlFormatted = xml.replace(reg, "$1\r\n$2$3");
        let pad = 0;
        return xmlFormatted
            .split("\r\n")
            .map((line) => {
                let indent = 0;
                if (line.match(/.+<\/\w[^>]*>$/)) {
                    indent = 0;
                } else if (line.match(/^<\/\w/)) {
                    if (pad !== 0) pad -= 1;
                } else if (line.match(/^<\w([^>]*[^/])?>.*$/)) {
                    indent = 1;
                } else {
                    indent = 0;
                }
                const padding = new Array(pad + 1).join(PADDING);
                pad += indent;
                return padding + line;
            })
            .join("\r\n");
    } catch {
        return xml;
    }
}