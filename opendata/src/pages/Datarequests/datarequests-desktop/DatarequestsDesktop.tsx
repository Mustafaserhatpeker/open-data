import RightFilter from "./components/RightFilter"
import {
    SearchIcon,
} from "lucide-react"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import DatarequestCards from "./components/DatarequestCards"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

function DatarequestsDesktop() {
    return (
        <div className="w-full flex flex-col items-center justify-between bg-accent  ">
            <div className="grid grid-cols-4 w-full gap-8 px-4 py-8 max-w-7xl mx-auto ">
                <div className="col-span-1   rounded-xl">
                    <RightFilter />
                </div>
                <div className="col-span-3 bg-white p-2 rounded-xl">
                    <div className="grid grid-cols-5 w-full gap-6">
                        <div className="col-span-4 ">
                            <InputGroup>
                                <InputGroupInput placeholder="Type to search..." />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupButton variant="secondary">
                                        <SearchIcon />
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                        <div className="col-span-1">
                            <Select defaultValue="newest">
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


                    </div>

                    <div className="mt-4 mb-6">
                        <DatarequestCards />
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
    )
}

export default DatarequestsDesktop