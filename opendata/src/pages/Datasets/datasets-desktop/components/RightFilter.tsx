import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { PhoneIncomingIcon } from "lucide-react"

export default function RightFilter() {
    return (
        <Accordion
            type="multiple"
            className="w-full"
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
