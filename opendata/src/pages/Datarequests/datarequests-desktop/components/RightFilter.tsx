import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { BadgeCheck, BadgeInfo, BadgeX } from "lucide-react"

export default function RightFilter() {
    return (
        <Accordion
            type="multiple"
            className="w-full bg-white p-4 rounded-lg "
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>Durum Bilgisi</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <Button variant="outline" >
                        <BadgeCheck color="green" /> Onaylandı
                    </Button>
                    <Button variant="outline" >
                        <BadgeInfo color="orange" /> Bekleniyor
                    </Button>
                    <Button variant="outline" >
                        <BadgeX color="red" /> Reddedildi
                    </Button>
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    )
}
