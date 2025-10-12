import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function RightFilter(
    {
        categories,
        organizations,
        tags,
        formats,
        licences,
    }: any
) {
    return (
        <Accordion
            type="multiple"
            className="w-full bg-white p-4 rounded-lg "
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>Organizasyonlar</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    {organizations?.data?.map((org: any) => (
                        <Button key={org._id} variant="outline" size="sm" className="justify-between">
                            {org.organizationName}
                            <Badge variant={"outline"}>
                                {org.datasetCount}
                            </Badge>
                        </Button>
                    ))}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Kategoriler</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    {categories?.data?.map((cat: any) => (
                        <Button key={cat._id} variant="outline" size="sm" className="justify-between">
                            {cat.categoryName}
                            <Badge variant={"outline"}>
                                {cat.datasetCount}
                            </Badge>
                        </Button>
                    ))}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Etiketler</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    {
                        tags?.data?.map((tag: any) => (
                            <Button key={tag._id} variant="outline" size="sm" className="justify-between">
                                {tag.tagName}
                                <Badge variant={"outline"}>
                                    {tag.datasetCount}
                                </Badge>
                            </Button>
                        ))}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>Formatlar</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    {
                        formats?.data?.map((format: any) => (
                            <Button key={format._id} variant="outline" size="sm" className="justify-between">
                                {format.formatName}
                                <Badge variant={"outline"}>
                                    {format.datasetCount}
                                </Badge>
                            </Button>
                        ))}


                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger>Lisanslar</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    {
                        licences?.data?.map((licence: any) => (
                            <Button key={licence._id} variant="outline" size="sm" className="justify-between">
                                {licence.licenceName}
                                <Badge variant={"outline"}>
                                    {licence.datasetCount}
                                </Badge>
                            </Button>
                        ))}

                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
