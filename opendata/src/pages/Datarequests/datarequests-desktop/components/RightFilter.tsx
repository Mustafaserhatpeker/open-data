import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Clock, BadgeX } from "lucide-react";

type Props = {
    counts?: {
        approved?: number;
        pending?: number;
        rejected?: number;
    };
    selectedStatus?: string | null;
    onStatusChange?: (status: string | null) => void;
};

export default function RightFilter({
    counts,
    selectedStatus,
    onStatusChange,
}: Props) {
    const handleSelect = (status: string | null) => {
        if (onStatusChange) onStatusChange(status);
    };

    return (
        <Accordion type="multiple" className="w-full bg-white px-4 rounded-lg shadow-sm">
            <AccordionItem value="item-1">
                <AccordionTrigger>Durum Bilgisi</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-3 text-balance">
                    <Button
                        className={`flex flex-row items-center justify-between ${selectedStatus === "approved" ? "border-green-500 bg-green-50" : ""
                            }`}
                        variant="outline"
                        onClick={() =>
                            handleSelect(selectedStatus === "approved" ? null : "approved")
                        }
                    >
                        <span className="flex flex-row items-center gap-2">
                            <BadgeCheck color="green" /> Onaylandı
                        </span>
                        <Badge variant="outline">{counts?.approved ?? 0}</Badge>
                    </Button>

                    <Button
                        className={`flex flex-row items-center justify-between ${selectedStatus === "pending" ? "border-yellow-500 bg-yellow-50" : ""
                            }`}
                        variant="outline"
                        onClick={() =>
                            handleSelect(selectedStatus === "pending" ? null : "pending")
                        }
                    >
                        <span className="flex flex-row items-center gap-2">
                            <Clock color="orange" /> Beklemede
                        </span>
                        <Badge variant="outline">{counts?.pending ?? 0}</Badge>
                    </Button>

                    <Button
                        className={`flex flex-row items-center justify-between ${selectedStatus === "rejected" ? "border-red-500 bg-red-50" : ""
                            }`}
                        variant="outline"
                        onClick={() =>
                            handleSelect(selectedStatus === "rejected" ? null : "rejected")
                        }
                    >
                        <span className="flex flex-row items-center gap-2">
                            <BadgeX color="red" /> Reddedildi
                        </span>
                        <Badge variant="outline">{counts?.rejected ?? 0}</Badge>
                    </Button>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
