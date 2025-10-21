import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FileSpreadsheet,
  FileJson,
  FileText,
  FileCode,
  Map,
  Network,
  FileArchive,
  Building2,
  FolderClosed,
  Tags,
  CircleHelp,
} from "lucide-react";
import DataDialog from "./DataDialog";
import type { DatasetItem } from "@/pages/Datasets/types";

type DataType =
  | "XLSX"
  | "CSV"
  | "PDF"
  | "API"
  | "GeoJSON"
  | "XML"
  | "HTML"
  | "KML"
  | "TXT"
  | "KMZ"
  | "JSON";

export interface Dataset {
  id: number | string;
  title: string;
  description?: string;
  datatype: DataType | string;
  organization?: string;
  category?: string;
  tags?: string[];
  createdDate?: string;
  updatedDate?: string;
}

function getTypeMeta(datatypeRaw: string) {
  const t = (datatypeRaw || "").toUpperCase().trim();

  let Icon = CircleHelp;
  let color = "bg-gray-100 text-gray-700 ring-1 ring-gray-200";
  let accent = "text-gray-500";

  let label = t || "UNKNOWN";

  switch (t) {
    case "XLSX":
    case "CSV":
      Icon = FileSpreadsheet;
      color = "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100";
      accent = "text-emerald-600";
      break;
    case "PDF":
      Icon = FileText;
      color = "bg-red-50 text-red-700 ring-1 ring-red-100";
      accent = "text-red-600";
      break;
    case "TXT":
      Icon = FileText;
      color = "bg-slate-50 text-slate-700 ring-1 ring-slate-200";
      accent = "text-slate-600";
      break;
    case "XML":
    case "HTML":
      Icon = FileCode;
      color = "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100";
      accent = "text-indigo-600";
      break;
    case "GEOJSON":
    case "KML":
      Icon = Map;
      color = "bg-teal-50 text-teal-700 ring-1 ring-teal-100";
      accent = "text-teal-600";
      break;
    case "KMZ":
      Icon = FileArchive;
      color = "bg-amber-50 text-amber-700 ring-1 ring-amber-100";
      accent = "text-amber-600";
      break;
    case "API":
      Icon = Network;
      color = "bg-sky-50 text-sky-700 ring-1 ring-sky-100";
      accent = "text-sky-600";
      break;
    case "JSON":
      Icon = FileJson;
      color = "bg-violet-50 text-violet-700 ring-1 ring-violet-100";
      accent = "text-violet-600";
      break;
  }

  return { Icon, color, accent, label };
}

export default function DataCard({ dataset }: { dataset: DatasetItem }) {
  const { Icon, color, accent, label } = getTypeMeta(
    dataset.formats?.[0]?.formatName || ""
  );

  return (
    <TooltipProvider delayDuration={200}>
      <div
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          window.location.href = `/datasets/${dataset._id}`;
        }}
      >
        <Card className="flex h-full flex-col overflow-hidden border border-border/60 shadow-sm transition-all hover:shadow-md relative">
          <CardHeader className="space-y-3 pb-3">
            <div className="flex items-center justify-between gap-3 w-full">
              <div className="flex items-center gap-3 w-full">
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${color}`}
                  aria-hidden
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 w-full">
                  <CardTitle className="text-base md:text-lg truncate">
                    {dataset.title}
                  </CardTitle>
                  <div className="mt-1 flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="secondary"
                          className={`border ${accent} bg-transparent`}
                        >
                          {label}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        Veri türü: {label}
                      </TooltipContent>
                    </Tooltip>
                    {dataset.organization ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Building2 className="h-3.5 w-3.5" />
                        <span className="truncate">
                          {dataset?.organization?.organizationName}
                        </span>
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {dataset.description ? (
              <CardDescription className="mt-1 line-clamp-2">
                {dataset.description}
              </CardDescription>
            ) : null}
          </CardHeader>

          <CardContent className="pt-0">
            <Separator className="mb-3" />
            <div className="grid grid-cols-1 gap-3 text-sm text-muted-foreground md:grid-cols-2">
              <div className="flex items-start gap-2">
                <FolderClosed className="mt-0.5 h-4 w-4 shrink-0 opacity-80" />
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground pb-2">
                    Kategori
                  </div>
                  <div className="truncate text-foreground">
                    {dataset.categories[0].categoryName || "-"}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Tags className="mt-0.5 h-4 w-4 shrink-0 opacity-80" />
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground pb-2">
                    Etiketler
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {dataset.tags && dataset.tags.length !== 0 &&
                      dataset.tags.map((tag) => (
                        <Badge
                          key={tag._id}
                          variant="outline"
                          className="px-2 py-0.5"
                        >
                          {tag.tagName}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <div className="absolute top-3 right-3 flex items-center gap-2 ">
            <DataDialog dataset={dataset} />
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
}
