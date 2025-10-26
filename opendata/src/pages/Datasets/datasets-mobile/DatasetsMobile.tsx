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
  SelectItem,
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

function DatasetsMobile() {
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
    <div className="w-full min-h-screen bg-accent flex flex-col items-center px-3 py-5">

      {/* FILTER UI ON TOP */}
      <div className="w-full mb-4 bg-white rounded-lg shadow-sm p-3">
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

      {/* Search and Sort Controls */}
      <div className="w-full flex flex-col gap-3 bg-white p-3 rounded-lg shadow-sm">
        <InputGroup>
          <InputGroupInput
            placeholder="Veri ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="secondary">
              <SearchIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        {/* Sorting / View Toggle */}
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

        <Select value={gridView ? "grid" : "list"} onValueChange={(value) => setGridView(value === "grid")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Görünüm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grid">Izgara</SelectItem>
            <SelectItem value="list">Liste</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* CARDS VIEW */}
      <div className="w-full mt-4">
        <DatasetCards items={items} gridView={gridView} />
      </div>

      {/* PAGINATION */}
      <div className="w-full mt-4 mb-10 flex justify-center">
        <Pagination>
          <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationPrevious onClick={prevPage} />
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
              <PaginationNext onClick={nextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default DatasetsMobile;
