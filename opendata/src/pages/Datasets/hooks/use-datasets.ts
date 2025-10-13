import { useMemo, useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDatasets } from "@/services/dataset.service";
import type { DatasetItem } from "../types";

function useDebouncedValue<T>(value: T, delay = 400) {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

const addUnique = (arr: string[], id: string) =>
  arr.includes(id) ? arr : [...arr, id];
const removeItem = (arr: string[], id: string) => arr.filter((x) => x !== id);
const toggleItem = (arr: string[], id: string) =>
  arr.includes(id) ? removeItem(arr, id) : [...arr, id];

type SortKey = "newest" | "oldest" | "a-z" | "z-a";

type Filters = {
  search: string;
  sort: SortKey;
  organizationId?: string | null;
  categoryIDs: string[];
  tagIDs: string[];
  formatIDs: string[];
  licenseID?: string | null;
  page: number;
  limit: number;
};

export function useDatasets() {
  // ---- state
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");

  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [licenseID, setLicenseID] = useState<string | null>(null);

  const [categoryIDs, setCategoryIDs] = useState<string[]>([]);
  const [tagIDs, setTagIDs] = useState<string[]>([]);
  const [formatIDs, setFormatIDs] = useState<string[]>([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  // ---- search debounced
  const debouncedSearch = useDebouncedValue(search, 450);

  // ---- params obj (queryKey için stable)
  const params: Filters = useMemo(
    () => ({
      search: debouncedSearch.trim(),
      sort,
      organizationId: organizationId || undefined,
      categoryIDs,
      tagIDs,
      formatIDs,
      licenseID: licenseID || undefined,
      page,
      limit,
    }),
    [
      debouncedSearch,
      sort,
      organizationId,
      categoryIDs,
      tagIDs,
      formatIDs,
      licenseID,
      page,
      limit,
    ]
  );

  // Filtreler değişince sayfayı 1’e çek (page/limit hariç)
  useEffect(() => {
    setPage(1);
  }, [
    debouncedSearch,
    sort,
    organizationId,
    licenseID,
    categoryIDs.join(","),
    tagIDs.join(","),
    formatIDs.join(","),
  ]);

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["datasets", params],
    queryFn: () => getDatasets(params),
  });

  //  response mapping
  const items: DatasetItem[] = data?.data?.data ?? [];
  const pagination = data?.data?.pagination ?? {
    total: 0,
    page: 1,
    limit,
    totalPage: 0,
  };
  const total = pagination.total ?? 0;
  const totalPage = pagination.totalPage ?? 0;

  // ---- array setter helpers
  const addCategoryId = useCallback(
    (id: string) => setCategoryIDs((s) => addUnique(s, id)),
    []
  );
  const removeCategoryId = useCallback(
    (id: string) => setCategoryIDs((s) => removeItem(s, id)),
    []
  );
  const toggleCategoryId = useCallback(
    (id: string) => setCategoryIDs((s) => toggleItem(s, id)),
    []
  );
  const clearCategoryIds = useCallback(() => setCategoryIDs([]), []);

  const addTagId = useCallback(
    (id: string) => setTagIDs((s) => addUnique(s, id)),
    []
  );
  const removeTagId = useCallback(
    (id: string) => setTagIDs((s) => removeItem(s, id)),
    []
  );
  const toggleTagId = useCallback(
    (id: string) => setTagIDs((s) => toggleItem(s, id)),
    []
  );
  const clearTagIds = useCallback(() => setTagIDs([]), []);

  const addFormatId = useCallback(
    (id: string) => setFormatIDs((s) => addUnique(s, id)),
    []
  );
  const removeFormatId = useCallback(
    (id: string) => setFormatIDs((s) => removeItem(s, id)),
    []
  );
  const toggleFormatId = useCallback(
    (id: string) => setFormatIDs((s) => toggleItem(s, id)),
    []
  );
  const clearFormatIds = useCallback(() => setFormatIDs([]), []);

  // ---- pagination helpers
  const nextPage = useCallback(
    () => setPage((p) => Math.min(p + 1, Math.max(1, totalPage))),
    [totalPage]
  );
  const prevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const goToPage = useCallback(
    (p: number) =>
      setPage(() => Math.min(Math.max(1, p), Math.max(1, totalPage))),
    [totalPage]
  );

  // ---- reset
  const resetFilters = useCallback(() => {
    setSearch("");
    setSort("newest");
    setOrganizationId(null);
    setLicenseID(null);
    setCategoryIDs([]);
    setTagIDs([]);
    setFormatIDs([]);
    setPage(1);
  }, []);

  return {
    // data
    items,
    pagination,
    total,
    totalPage,

    // react-query state
    isLoading,
    isFetching,
    isError,
    error,
    refetch,

    // filters (values)
    search,
    sort,
    organizationId,
    categoryIDs,
    tagIDs,
    formatIDs,
    licenseID,
    page,
    limit,

    // filters (setters / actions)
    setSearch,
    setSort,
    setOrganizationId, // string | null ver
    setLicenseID, // string | null ver

    addCategoryId,
    removeCategoryId,
    toggleCategoryId,
    clearCategoryIds,

    addTagId,
    removeTagId,
    toggleTagId,
    clearTagIds,

    addFormatId,
    removeFormatId,
    toggleFormatId,
    clearFormatIds,

    // pagination actions
    setLimit,
    nextPage,
    prevPage,
    goToPage,

    // utils
    resetFilters,

    // raw params (gerekirse debug)
    params,
  };
}
