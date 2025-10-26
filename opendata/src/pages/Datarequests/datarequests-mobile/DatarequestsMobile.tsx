import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    getPublicDataRequestCounts,
    getPublicDataRequests,
    getUserDataRequests,
} from "@/services/datarequest.service";
import { SearchIcon } from "lucide-react";

import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
    InputGroupButton,
} from "@/components/ui/input-group";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import DatarequestCards from "./components/DatarequestCards";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { useAuthStore } from "@/stores/auth.store";
import { AddDataReqDialog } from "./components/AddDataReqDialog";
import MyCheck from "./components/MyCheck";


function DatarequestsMobile() {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [sort, setSort] = useState("newest");
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const { isAuthenticated } = useAuthStore();
    const [myRequestsOnly, setMyRequestsOnly] = useState(false);


    const { data: requestsResp, isLoading, isError } = useQuery({
        queryKey: ["datarequests", page, sort, search, status, myRequestsOnly],
        queryFn: myRequestsOnly
            ? () =>
                getUserDataRequests({
                    page,
                    limit,
                    status: status === "all" ? null : status,
                    sort,
                    search,
                })
            : () =>
                getPublicDataRequests({
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

    const dataRequests = requestsResp?.data?.data ?? [];
    const pagination = requestsResp?.data?.pagination;
    const totalPages = Number(pagination?.totalPage ?? 1);
    const counts = countsResp?.data ?? {
        approved: 0,
        pending: 0,
        rejected: 0,
        total: 0,
    };


    return (
        <div className="w-full min-h-screen bg-accent flex flex-col items-center px-3 py-5">

            {/* FILTER BAR */}
            <div className="w-full bg-white p-4 rounded-lg shadow-sm flex flex-col gap-4">

                {/* Search */}
                <InputGroup>
                    <InputGroupInput
                        placeholder="Veri isteği ara..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <InputGroupAddon align="inline-end">
                        <InputGroupButton onClick={() => setPage(1)}>
                            <SearchIcon className="w-4 h-4" />
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>

                {/* Sort */}
                <Select
                    value={sort}
                    onValueChange={(val) => {
                        setSort(val);
                        setPage(1);
                    }}
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

                {/* Status */}
                <Select
                    value={status}
                    onValueChange={(val) => {
                        setStatus(val);
                        setPage(1);
                    }}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Durum" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tümü ({counts.total})</SelectItem>
                        <SelectItem value="approved">Onaylandı ({counts.approved})</SelectItem>
                        <SelectItem value="pending">Beklemede ({counts.pending})</SelectItem>
                        <SelectItem value="rejected">Reddedildi ({counts.rejected})</SelectItem>
                    </SelectContent>
                </Select>

                {/* Only My Requests */}
                {isAuthenticated && (
                    <div className="flex flex-row items-center gap-3 bg-gray-100 p-2 rounded-md">
                        <span className="text-sm font-medium">
                            Sadece Bana Ait
                        </span>
                        <MyCheck checked={myRequestsOnly} onChange={setMyRequestsOnly} />
                    </div>
                )}

                {/* Create Button / Login Info */}
                {isAuthenticated ? (
                    <AddDataReqDialog />
                ) : (
                    <p className="text-xs text-gray-500 text-center">
                        Veri isteği oluşturmak için{" "}
                        <a href="/login" className="text-[#6558F6] font-semibold underline">
                            giriş yapın
                        </a>
                    </p>
                )}
            </div>


            {/* LIST AREA */}
            <div className="w-full mt-6">
                {isLoading && <p className="text-center text-gray-500">Yükleniyor...</p>}
                {isError && (
                    <p className="text-center text-red-500">Bir hata oluştu.</p>
                )}
                {!isLoading && !isError && dataRequests.length === 0 && (
                    <p className="text-center text-gray-400">
                        Henüz veri isteği bulunamadı.
                    </p>
                )}
                {!isLoading && !isError && dataRequests.length > 0 && (
                    <DatarequestCards data={dataRequests} />
                )}
            </div>


            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="w-full mt-8 flex justify-center">
                    <Pagination>
                        <PaginationContent className="gap-1">
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => page > 1 && setPage(page - 1)}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }).map((_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        isActive={page === i + 1}
                                        onClick={() => setPage(i + 1)}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => page < totalPages && setPage(page + 1)}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}

export default DatarequestsMobile;
