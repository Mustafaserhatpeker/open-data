import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPublicDataRequests } from "@/services/datarequest.service";
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
import { Button } from "@/components/ui/button";

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
    const [status, setStatus] = useState<string | null>(null);
    const { isAuthenticated } = useAuthStore();

    // 🔹 React Query (tipli)
    const { data: datareqResp, isLoading, isError } = useQuery<DataRequestResponse>({
        queryKey: ["public-datarequests", page, sort, search, status],
        queryFn: () =>
            getPublicDataRequests({
                page,
                limit,
                status,
                sort,
                search,
            }),
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
    const counts = dataRequests.reduce(
        (acc: any, item: any) => {
            const st = item.status;
            if (st === "approved") acc.approved++;
            else if (st === "rejected") acc.rejected++;
            else acc.pending++;
            return acc;
        },
        { approved: 0, pending: 0, rejected: 0 }
    );

    return (
        <div className="w-full flex flex-col items-center justify-between bg-accent min-h-screen">
            <div className="grid grid-cols-4 w-full gap-8 px-4 py-8 max-w-[80%] mx-auto">
                {/* SOL FİLTRE */}
                <div className="col-span-1 rounded-xl">
                    <RightFilter
                        counts={counts}
                        selectedStatus={status}
                        onStatusChange={(val) => {
                            setStatus(val);
                            setPage(1);
                        }}
                    />
                </div>

                {/* ANA CONTENT */}
                <div className="col-span-3 bg-white p-4 rounded-xl shadow-sm">
                    {/* SEARCH + SORT */}
                    <div className="grid grid-cols-5 w-full gap-6">
                        <div className="col-span-4">
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
                        <div className="col-span-1">
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
                        </div>
                        {isAuthenticated ? (
                            <div className="col-span-5 text-right">
                                <Button variant="outline"

                                >
                                    Yeni Veri İsteği Oluştur
                                </Button>
                            </div>
                        ) : (
                            <div className="col-span-5 text-right">
                                <p className="text-sm text-gray-500">
                                    Veri isteği oluşturmak ve detayları görüntülemek için lütfen {" "}
                                    <a className="text-accent-foreground" href="/login">
                                        giriş yapın.
                                    </a>
                                </p>
                            </div>
                        )}
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
