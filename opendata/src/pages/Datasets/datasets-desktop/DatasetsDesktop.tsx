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
  const {
    items,
    search,
    setSearch,
    setSort,
    page,
    totalPage,
    nextPage,
    prevPage,
    goToPage,
    organizationId,
    categoryIDs,
    tagIDs,
    formatIDs,
    licenseID,
    setOrganizationId,
    toggleCategoryId,
    toggleTagId,
    toggleFormatId,
    setLicenseID,
  } = useDatasets();


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

            organizationId={organizationId}
            categoryIDs={categoryIDs}
            tagIDs={tagIDs}
            formatIDs={formatIDs}
            licenseID={licenseID}

            setOrganizationId={setOrganizationId}
            toggleCategoryId={toggleCategoryId}
            toggleTagId={toggleTagId}
            toggleFormatId={toggleFormatId}
            setLicenseID={setLicenseID}
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
                <PaginationPrevious
                  onClick={prevPage}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPage }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    onClick={() => goToPage(p)}
                    isActive={page === p}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={nextPage}
                  className={page === totalPage ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default DatasetsDesktop;
