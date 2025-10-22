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
import { getOrganizations } from "@/services/organization.service";
import { getTags } from "@/services/tag.service";
import { getFormats } from "@/services/format.service";
import { getLicences } from "@/services/licence.service";
import { useDatasets } from "../hooks/use-datasets";
import { useState } from "react";

function DatasetsDesktop() {
  const { items, setSort, search, setSearch } = useDatasets();

  const { data: categoriesResp } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
  const { data: organizationsResp } = useQuery({
    queryKey: ["organizations"],
    queryFn: () => getOrganizations(),
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
    <div className="w-full flex flex-col items-center justify-between bg-accent min-h-screen  ">
      <div className="grid grid-cols-4 w-full gap-8 px-4 py-8 max-w-[80%] mx-auto ">
        <div className="col-span-1   rounded-xl">
          <RightFilter
            categories={categoriesResp || { data: [] }}
            organizations={organizationsResp || { data: [] }}
            tags={tagsResp || { data: [] }}
            formats={formatsResp || { data: [] }}
            licences={licencesResp || { data: [] }}
          />
        </div>
        <div className="col-span-3 bg-white p-2 rounded-xl">
          <div className="grid grid-cols-5 w-full gap-6">
            <div className="col-span-3 ">
              <InputGroup>
                <InputGroupInput
                  placeholder="Type to search..."
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
            <div className="grid grid-cols-2 gap-2 col-span-2">
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
              <div className="text-xs text-muted-foreground col-span-1">
                <Select value={gridView ? "grid" : "list"} onValueChange={(value) => setGridView(value === "grid")}>
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
            </div>
          </div>

          <div className="mt-4 mb-6">
            <DatasetCards items={items} gridView={gridView} />
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default DatasetsDesktop;
