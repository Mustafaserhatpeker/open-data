import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrganizationDataRequests, getPublicDataRequestCounts } from "@/services/datarequest.service";
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
import DatarequestCards from "./components/DatarequestCards";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type DataRequestResponse = {
    status: number;
    message: string;
    data: {
        data: any[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPage: number;
        };
    };
};
function DatarequestsDesktop() {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [sort, setSort] = useState("newest");
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<string>("all");

    // 🔹 React Query (tipli)
    const { data: datareqResp, isLoading, isError } = useQuery<DataRequestResponse>({
        queryKey: ["organization-datarequests", page, sort, search, status],
        queryFn: () =>
            getOrganizationDataRequests({
                page,
                limit,
                status: status === "all" ? null : status,
                sort,
                search,
            }),

    });

    const { data: countsResp } = useQuery({
        queryKey: ["public-datarequests-counts"],
        queryFn: getPublicDataRequestCounts,
    });

    // 🔹 Güvenli veri erişimi
    const dataRequests = Array.isArray(datareqResp?.data?.data)
        ? datareqResp!.data.data
        : [];

    const pagination: {
        total?: number;
        page?: number;
        limit?: number;
        totalPage?: number;
    } = datareqResp?.data?.pagination ?? { total: 0, page: 1, limit, totalPage: 1 };
    const totalPages = Number(pagination.totalPage ?? 1);

    // 🔹 Durum sayacı
    const counts = countsResp?.data ?? {
        approved: 0,
        pending: 0,
        rejected: 0,
        total: 0,
    };


    return (
        <div className="w-full flex flex-col items-center justify-between  min-h-screen">
            <div className="flex flex-col w-full gap-8 ">




                <div className="flex flex-col w-full bg-white p-4 ">

                    <div className="flex flex-row items-center justify-between w-full gap-6">
                        <div className="min-w-1/2">
                            <InputGroup>
                                <InputGroupInput
                                    placeholder="Ara..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                        variant="secondary"
                                        onClick={() => setPage(1)}
                                    >
                                        <SearchIcon />
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                        <div className="min-w-1/2 flex flex-row items-center gap-4">
                            <Select
                                value={sort}
                                onValueChange={(val) => {
                                    setSort(val);
                                    setPage(1);
                                }}
                            >
                                <SelectTrigger className="">
                                    <SelectValue placeholder="Sırala" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">En Yeni</SelectItem>
                                    <SelectItem value="oldest">En Eski</SelectItem>
                                    <SelectItem value="a-z">A-Z</SelectItem>
                                    <SelectItem value="z-a">Z-A</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select
                                value={status}
                                onValueChange={(val) => {
                                    setStatus(val);
                                    setPage(1);
                                }}
                            >
                                <SelectTrigger >
                                    <SelectValue placeholder="Durum" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        Tümü ({counts.total})
                                    </SelectItem>
                                    <SelectItem value="approved">
                                        Onaylandı ({counts.approved})
                                    </SelectItem>
                                    <SelectItem value="pending">
                                        Beklemede ({counts.pending})
                                    </SelectItem>
                                    <SelectItem value="rejected">
                                        Reddedildi ({counts.rejected})
                                    </SelectItem>
                                </SelectContent>
                            </Select>


                        </div>

                    </div>

                    {/* CARD LİSTESİ */}
                    <div className="mt-6 mb-6">
                        {isLoading && (
                            <p className="text-center text-gray-500">Yükleniyor...</p>
                        )}
                        {isError && (
                            <p className="text-center text-red-500">
                                Veriler yüklenirken bir hata oluştu.
                            </p>
                        )}
                        {!isLoading &&
                            !isError &&
                            Array.isArray(dataRequests) &&
                            dataRequests.length === 0 && (
                                <p className="text-center text-gray-400">
                                    Henüz herhangi bir veri isteği bulunamadı.
                                </p>
                            )}
                        {!isLoading &&
                            !isError &&
                            Array.isArray(dataRequests) &&
                            dataRequests.length > 0 && (
                                <DatarequestCards data={dataRequests} />
                            )}
                    </div>

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={() => page > 1 && setPage(page - 1)}
                                    />
                                </PaginationItem>

                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink
                                            href="#"
                                            isActive={page === i + 1}
                                            onClick={() => setPage(i + 1)}
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                {totalPages > 5 && <PaginationEllipsis />}

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={() =>
                                            page < totalPages && setPage(page + 1)
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DatarequestsDesktop;
