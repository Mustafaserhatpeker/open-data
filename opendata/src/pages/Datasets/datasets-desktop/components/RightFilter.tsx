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
    { categories, organizations }: { categories: any, organizations: any }
) {
    return (
        <Accordion
            type="multiple"
            className="w-full bg-white p-4 rounded-lg "
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>Organizasyonlar</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    {organizations.data?.map((org: any) => (
                        <Button key={org._id} variant="outline" size="sm" className="justify-between">
                            {org.organizationName}
                            <Badge>
                                {org.datasetCount}
                            </Badge>
                        </Button>
                    ))}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Kategoriler</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    {categories.data?.map((cat: any) => (
                        <Button key={cat._id} variant="outline" size="sm" className="justify-between">
                            {cat.categoryName}
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
