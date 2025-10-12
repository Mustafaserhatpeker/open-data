import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PhoneIncomingIcon } from "lucide-react"

export default function RightFilter(
    { categories }: { categories: any }
) {
    return (
        <Accordion
            type="multiple"
            className="w-full bg-white p-4 rounded-lg "
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>Organizasyonlar</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <Button variant="outline" size="sm">
                        <PhoneIncomingIcon /> New Branch
                    </Button>
                    <Button variant="outline" size="sm">
                        <PhoneIncomingIcon /> New Branch
                    </Button>
                    <Button variant="outline" size="sm">
                        <PhoneIncomingIcon /> New Branch
                    </Button>
                    <Button variant="outline" size="sm">
                        <PhoneIncomingIcon /> New Branch
                    </Button>
                    <Button variant="outline" size="sm">
                        <PhoneIncomingIcon /> New Branch
                    </Button>
                    <Button variant="outline" size="sm">
                        <PhoneIncomingIcon /> New Branch
                    </Button>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Kategoriler</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    {categories.data?.map((cat: any) => (
                        <Button key={cat._id} variant="outline" size="sm" className="justify-between">
                            <div className="flex items-center">
                                <PhoneIncomingIcon className="mr-2" /> {cat.categoryName}
                            </div>
                            <Badge>
                                {cat.datasetCount}
                            </Badge>
                        </Button>
                    ))}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Etiketler</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <Button variant="outline" size="sm">
                        <PhoneIncomingIcon /> New Branch
                    </Button>
                    <Button variant="outline" size="sm">
                        <PhoneIncomingIcon /> New Branch
                    </Button>
                    <Button variant="outline" size="sm">
                        <PhoneIncomingIcon /> New Branch
                    </Button>
                    <Button variant="outline" size="sm">
                        <PhoneIncomingIcon /> New Branch
                    </Button>
                    <Button variant="outline" size="sm">
                        <PhoneIncomingIcon /> New Branch
                    </Button>
                    <Button variant="outline" size="sm">
                        <PhoneIncomingIcon /> New Branch
                    </Button>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>Formatlar</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <Button variant="outline" size="sm">
                        <PhoneIncomingIcon /> New Branch
                    </Button>
                    <Button variant="outline" size="sm">
                        <PhoneIncomingIcon /> New Branch
                    </Button>
                    <Button variant="outline" size="sm">
                        <PhoneIncomingIcon /> New Branch
                    </Button>
                    <Button variant="outline" size="sm">
                        <PhoneIncomingIcon /> New Branch
                    </Button>
                    <Button variant="outline" size="sm">
                        <PhoneIncomingIcon /> New Branch
                    </Button>
                    <Button variant="outline" size="sm">
                        <PhoneIncomingIcon /> New Branch
                    </Button>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
