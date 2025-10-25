import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPublicDataRequestCounts, getPublicDataRequests, getUserDataRequests } from "@/services/datarequest.service";
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
import { useAuthStore } from "@/stores/auth.store";
import { AddDataReqDialog } from "./components/AddDataReqDialog";
import MyCheck from "./components/MyCheck";

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
    const { isAuthenticated } = useAuthStore();
    const [myRequestsOnly, setMyRequestsOnly] = useState(false);

    const { data: requestsResp, isLoading, isError } = useQuery<DataRequestResponse>({
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

    const dataRequests = Array.isArray(requestsResp?.data?.data)
        ? requestsResp.data.data
        : [];

    const pagination = requestsResp?.data?.pagination ?? {
        total: 0,
        page: 1,
        limit,
        totalPage: 1,
    };
    const totalPages = Number(pagination.totalPage ?? 1);


    // 🔹 Durum sayacı
    const counts = countsResp?.data ?? {
        approved: 0,
        pending: 0,
        rejected: 0,
        total: 0,
    };


    return (
        <div className="w-full flex flex-col items-center justify-between bg-accent min-h-screen">
            <div className="flex flex-col w-full gap-8 px-4 py-8 max-w-[80%] mx-auto">




                <div className="flex flex-col w-full bg-white p-4 rounded-xl shadow-sm">

                    <div className="flex flex-row items-center justify-start w-full gap-6">
                        <div className="min-w-2/5">
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
                        <div className="min-w-1/3 flex flex-row items-center gap-4">
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


                            {isAuthenticated && (
                                <div className="flex flex-row items-center gap-3 border p-1.5 px-2 rounded-md">
                                    <span className={`text-sm font-medium ${myRequestsOnly ? 'text-green-700' : ''}`}>Sadece Bana Ait</span>
                                    <MyCheck checked={myRequestsOnly} onChange={setMyRequestsOnly} />

                                </div>
                            )}
                            {isAuthenticated ? (
                                <div className=" text-right">
                                    <AddDataReqDialog />
                                </div>
                            ) : (
                                <div className=" text-left">
                                    <p className="text-sm text-gray-500">
                                        Veri isteği oluşturmak ve detayları görüntülemek için lütfen {" "}
                                        <a className="text-accent-foreground" href="/login">
                                            giriş yapın.
                                        </a>
                                    </p>
                                </div>
                            )}

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
