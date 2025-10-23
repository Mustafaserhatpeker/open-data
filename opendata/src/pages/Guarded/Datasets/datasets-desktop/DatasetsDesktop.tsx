import RightFilter from "./components/RightFilter";
import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatasetCards from "./components/DatasetCards";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/category.service";
import { getMyOrganizations } from "@/services/organization.service";
import { getTags } from "@/services/tag.service";
import { getFormats } from "@/services/format.service";
import { getLicences } from "@/services/licence.service";
import { useDatasets } from "../hooks/use-datasets";
import { useState } from "react";
import { AddDataDialog } from "./components/AddDataDialog";

function DatasetsDesktop() {
  const {
    items,
    setSort,
    search,
    setSearch,
    nextPage,
    prevPage,
    page,
    totalPage,
  } = useDatasets();

  const { data: categoriesResp } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
  const { data: organizationsResp } = useQuery({
    queryKey: ["organizations"],
    queryFn: () => getMyOrganizations(),
  });
  const { data: tagsResp } = useQuery({
    queryKey: ["tags"],
    queryFn: () => getTags(),
  });
  const { data: formatsResp } = useQuery({
    queryKey: ["formats"],
    queryFn: () => getFormats(),
  });
  const { data: licencesResp } = useQuery({
    queryKey: ["licences"],
    queryFn: () => getLicences(),
  });

  const [gridView, setGridView] = useState(false);

  return (
    <div className="w-full flex flex-col items-center justify-between  min-h-screen">
      <div className="grid grid-cols-4 w-full gap-8 px-4 py-8  mx-auto">
        {/* SOL FİLTRE */}
        <div className="col-span-1 rounded-xl">
          <RightFilter
            categories={categoriesResp || { data: [] }}
            organizations={organizationsResp || { data: [] }}
            tags={tagsResp || { data: [] }}
            formats={formatsResp || { data: [] }}
            licences={licencesResp || { data: [] }}
          />
        </div>

        {/* SAĞ TARAF */}
        <div className="col-span-3 bg-white p-4 rounded-xl">
          <div className="grid grid-cols-6 w-full gap-4">
            {/* Arama */}
            <div className="col-span-3">
              <InputGroup>
                <InputGroupInput
                  placeholder="Dataset ara..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton variant="secondary">
                    <SearchIcon />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>

            {/* Sıralama */}
            <div className="col-span-1">
              <Select
                defaultValue="newest"
                onValueChange={(value) =>
                  setSort(value as "newest" | "oldest" | "a-z" | "z-a")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">En Yeni</SelectItem>
                  <SelectItem value="oldest">En Eski</SelectItem>
                  <SelectItem value="a-z">A-Z</SelectItem>
                  <SelectItem value="z-a">Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Görünüm Seçimi */}
            <div className="col-span-1 text-xs text-muted-foreground">
              <Select
                value={gridView ? "grid" : "list"}
                onValueChange={(value) => setGridView(value === "grid")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Görünüm Seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Görünümler</SelectLabel>
                    <SelectItem value="grid">Izgara</SelectItem>
                    <SelectItem value="list">Liste</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-1">
              <AddDataDialog />
            </div>
          </div>


          <div className="mt-4 mb-6">
            <DatasetCards items={items} gridView={gridView} />
          </div>

          {/* Sayfalama */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={prevPage} />
              </PaginationItem>

              {[...Array(totalPage)].map((_, idx) => (
                <PaginationItem key={idx}>
                  <PaginationLink href="#" isActive={page === idx + 1}>
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {totalPage > 5 && <PaginationEllipsis />}

              <PaginationItem>
                <PaginationNext href="#" onClick={nextPage} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default DatasetsDesktop;
