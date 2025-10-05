import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
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
                    <Button className="flex flex-row items-center justify-between" variant="outline" >
                        <span className="flex flex-row items-center gap-2">
                            <BadgeCheck color="green" /> Onaylandı
                        </span>
                        <Badge variant="outline">17</Badge>
                    </Button>
                    <Button className="flex flex-row items-center justify-between" variant="outline" >                        <span className="flex flex-row items-center gap-2">
                        <BadgeInfo color="blue" /> İnceleniyor
                    </span>
                        <Badge variant="outline">5</Badge>
                    </Button>
                    <Button className="flex flex-row items-center justify-between" variant="outline" >                        <span className="flex flex-row items-center gap-2">
                        <BadgeX color="red" /> Reddedildi
                    </span>
                        <Badge variant="outline">2</Badge>
                    </Button>
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    )
}
