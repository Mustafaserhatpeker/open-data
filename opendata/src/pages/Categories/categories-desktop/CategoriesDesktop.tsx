import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import type { Category } from "@/lib/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { FolderClosed, CalendarClock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/category.service";

function getInitials(name?: string) {
  if (!name) return "CT";
  const parts = name.split(" ").filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase();
}

function toTime(s?: string) {
  if (!s) return 0;
  const t = new Date(s).getTime();
  return isNaN(t) ? 0 : t;
}

type SortKey = "name" | "datasets" | "recent";

type ApiCategory = {
  _id?: string;
  id?: string;
  name?: string;
  categoryName?: string;
  description?: string;
  datasetCount?: number;
  datasetsCount?: number;
  createdAt?: string;
  updatedAt?: string;
};

export default function CategoriesDesktop() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("name");

  const { data: categoriesResp } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  // API'nin döndürdüğü veriyi uygulama içi Category tipine map ediyoruz
  const categories: Category[] = useMemo(() => {
    const apiData: ApiCategory[] = (categoriesResp as any)?.data ?? [];
    return (apiData ?? []).map((c) => ({
      id: c._id ?? c.id ?? "",
      name: c.name ?? c.categoryName ?? "",
      description: c.description ?? "",
      // Uygulama içi beklenen alan adı datasetsCount olabilir; her iki ismi de destekleyelim
      datasetsCount: c.datasetCount ?? c.datasetsCount ?? 0,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    }));
  }, [categoriesResp]);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("tr");
    const base = q
      ? categories.filter((c) => {
        const hay = `${c.name} ${c.description ?? ""}`.toLocaleLowerCase(
          "tr"
        );
        return hay.includes(q);
      })
      : categories.slice();

    base.sort((a, b) => {
      switch (sortBy) {
        case "datasets": {
          const ac = a.datasetsCount ?? 0;
          const bc = b.datasetsCount ?? 0;
          return bc - ac;
        }
        case "recent": {
          const at = Math.max(toTime(a.updatedAt), toTime(a.createdAt));
          const bt = Math.max(toTime(b.updatedAt), toTime(b.createdAt));
          return bt - at;
        }
        case "name":
        default:
          return a.name.localeCompare(b.name, "tr");
      }
    });

    return base;
  }, [query, sortBy, categories]);

  return (
    <div className="w-full bg-accent px-4 py-6 min-h-screen">
      <div className="mx-auto w-full max-w-[80%]">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Kategoriler</h1>
              <p className="text-muted-foreground mt-1">
                Veri setlerinin sınıflandırıldığı kategoriler
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <Badge variant="secondary">Toplam: {categories.length}</Badge>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <Input
                placeholder="Ara: isim veya açıklama..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="sm:col-span-1">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="sort"
                  className="text-sm text-muted-foreground whitespace-nowrap"
                >
                  Sırala:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortKey)}
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                >
                  <option value="name">Ada göre (A-Z)</option>
                  <option value="datasets">
                    Veri seti sayısı (çoktan aza)
                  </option>
                  <option value="recent">En yeni güncellenen</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cat: Category) => {
            const count = cat.datasetsCount ?? 0;
            const latest = Math.max(
              toTime(cat.updatedAt),
              toTime(cat.createdAt)
            );
            const latestText = latest
              ? new Date(latest).toLocaleDateString("tr-TR")
              : "-";

            return (
              <Card
                onClick={() => {
                  window.location.href = `/categories/${cat.id}`;
                }}
                key={cat.id}
                className="h-full overflow-hidden border border-border/60 cursor-pointer"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12 rounded-lg bg-primary/10 text-primary">
                      <AvatarFallback className="rounded-lg">
                        {getInitials(cat.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <CardTitle className="text-base">{cat.name}</CardTitle>
                      {cat.description ? (
                        <CardDescription className="mt-1 line-clamp-2">
                          {cat.description}
                        </CardDescription>
                      ) : null}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-md border p-3">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">
                        Veri Setleri
                      </div>
                      <div className="mt-1 inline-flex items-center gap-2">
                        <FolderClosed className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{count}</span>
                      </div>
                    </div>
                    <div className="rounded-md border p-3">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">
                        En Son
                      </div>
                      <div className="mt-1 inline-flex items-center gap-2">
                        <CalendarClock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{latestText}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end">
                    <Button variant="secondary" asChild>
                      <Link to={`/datasets?categoryId=${cat.id}`}>
                        <FolderClosed className="h-4 w-4 mr-2" />
                        Veri setleri
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-16 text-center text-muted-foreground">
            Aramanızla eşleşen kategori bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
}