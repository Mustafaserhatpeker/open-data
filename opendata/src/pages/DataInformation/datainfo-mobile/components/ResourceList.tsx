import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { getResourceTypeMeta } from "./utils";
import { DOWNLOAD_URL } from "@/lib/urls";
import { useMutation } from "@tanstack/react-query";
import { incrementDatasetViewOrDownloadCount } from "@/services/dataset.service";

type Props = {
    resources?: any;
    datasetId?: any;
};

export function ResourcesList({ resources, datasetId }: Props) {
    const mutation = useMutation({
        mutationFn: async () =>
            await incrementDatasetViewOrDownloadCount(
                datasetId!,
                "downloadsCount"
            ),
    });

    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Kaynaklar</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                    Dosyalar ve bağlantılar
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {resources && resources.length > 0 ? (
                    <div className="flex flex-col space-y-4">
                        {resources.map((r: any) => {
                            const meta = getResourceTypeMeta(r.mimeType);

                            return (
                                <div
                                    key={r._id}
                                    className="bg-gray-50 rounded-lg p-3 flex flex-col gap-3"
                                >
                                    {/* Icon + Title */}
                                    <div className="flex items-center gap-3 w-full">
                                        <div
                                            className={`h-10 w-10 flex items-center justify-center rounded-md ${meta.color}`}
                                        >
                                            <meta.Icon className="h-5 w-5" />
                                        </div>

                                        <div className="flex flex-col w-full">
                                            <a
                                                href={r.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-sm font-medium text-primary truncate"
                                                title={r.resourceName}
                                            >
                                                {r.resourceName}
                                            </a>

                                            <div className="mt-1">
                                                <Badge
                                                    variant="secondary"
                                                    className={`border text-xs px-2 py-0.5 bg-transparent ${meta.accent}`}
                                                >
                                                    {meta.label}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dates */}
                                    <div className="text-[11px] text-muted-foreground flex flex-col">
                                        <span>
                                            Oluşturulma:{" "}
                                            {new Date(r?.createdAt).toLocaleDateString("tr-TR") ??
                                                "-"}
                                        </span>
                                        {r.updatedAt && (
                                            <span>
                                                Güncelleme:{" "}
                                                {new Date(r?.updatedAt).toLocaleDateString("tr-TR") ??
                                                    "-"}
                                            </span>
                                        )}
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex flex-col gap-2 w-full">
                                        <Button
                                            className="w-full text-sm"
                                            onClick={() => mutation.mutate()}
                                            asChild
                                        >
                                            <a
                                                href={`${DOWNLOAD_URL}/${r.fileUrl}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Download className="h-4 w-4 mr-1" />
                                                İndir
                                            </a>
                                        </Button>

                                        <Button className="w-full text-sm" asChild>
                                            <a
                                                href={`/preview/${datasetId}/${r.fileUrl}`}
                                                rel="noreferrer"
                                            >
                                                <Eye className="h-4 w-4 mr-1" />
                                                Önizleme
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Herhangi bir kaynak bulunamadı.
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
