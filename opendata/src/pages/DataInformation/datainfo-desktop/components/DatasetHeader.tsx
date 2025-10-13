import { Badge } from "@/components/ui/badge";

import { Download, Eye, FolderClosed, Tags as TagsIcon } from "lucide-react";
import { getTypeMeta } from "./utils";
import BackButton from "@/components/back-button";

type Props = {
  dataset: any;
  createdByName?: string;
  categoryNames: string[];
  tagNames: string[];
  primaryFormat: string;
};

export function DatasetHeader({
  dataset,
  categoryNames,
  tagNames,
  primaryFormat,
}: Props) {
  const primaryFormatMeta = getTypeMeta(primaryFormat);

  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center justify-between">
        <BackButton />
        <div className="flex items-center gap-2">
          {dataset?.isPublic ? (
            <Badge className="bg-emerald-600 hover:bg-emerald-600/90 px-2.5 py-1">
              Açık Veri
            </Badge>
          ) : (
            <Badge variant="outline">Kısıtlı</Badge>
          )}
          <Badge
            variant="outline"
            className={`border ${primaryFormatMeta.accent} px-2.5 py-1`}
          >
            {primaryFormatMeta.label}
          </Badge>

          <Badge
            variant="outline"
            className="flex items-center gap-1.5 px-2.5 py-1"
          >
            {dataset?.license?.licenceName || "Bilinmiyor"}
          </Badge>
          <span className="inline-flex items-center text-xs gap-1.5 bg-accent-foreground/10 px-2.5 py-1 rounded-md">
            <Download className="h-4 w-4" />
            {dataset?.downloadsCount ?? 1}
          </span>
          <span className="inline-flex items-center text-xs gap-1.5 bg-accent-foreground/10 px-2.5 py-1 rounded-md">
            <Eye className="h-4 w-4" />
            {dataset?.viewsCount ?? 1}
          </span>
        </div>
      </div>

      {/* Title and meta */}
      <div className="flex items-start gap-3">
        <div
          className={`inline-flex h-14 w-14 items-center justify-center rounded-lg ${primaryFormatMeta.color}`}
          aria-hidden
        >
          <primaryFormatMeta.Icon className="h-8 w-8" />
        </div>
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold leading-tight">
            {dataset?.title}
          </h1>
        </div>
      </div>

      {dataset?.description ? (
        <p className="mt-3 text-muted-foreground">{dataset?.description}</p>
      ) : null}

      {/* Tags and categories */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {categoryNames.length > 0 ? (
          <div className="inline-flex items-center gap-2">
            <FolderClosed className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-1.5">
              {categoryNames.map((c) => (
                <Badge key={c} variant="outline">
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}
        {tagNames.length > 0 ? (
          <div className="inline-flex items-center gap-2">
            <TagsIcon className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-1.5">
              {tagNames.map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
