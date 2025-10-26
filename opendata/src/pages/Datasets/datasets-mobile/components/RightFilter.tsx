import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function RightFilter({
    categories,
    organizations,
    tags,
    formats,
    licences,

    // filter values
    organizationId,
    categoryIDs,
    tagIDs,
    formatIDs,
    licenseID,

    // filter setters
    setOrganizationId,
    toggleCategoryId,
    toggleTagId,
    toggleFormatId,
    setLicenseID,
}: any) {
    return (
        <Accordion type="multiple" className="w-full bg-white p-4 rounded-lg">
            {/* Organizasyon */}
            <AccordionItem value="item-1">
                <AccordionTrigger>Organizasyonlar</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                    {organizations?.data?.map((org: any) => (
                        <Button
                            key={org._id}
                            variant={organizationId === org._id ? "default" : "outline"}
                            className="w-full flex justify-between"
                            size="sm"
                            onClick={() =>
                                setOrganizationId(organizationId === org._id ? null : org._id)
                            }
                        >
                            {org.organizationName}
                            <Badge>{org.datasetCount}</Badge>
                        </Button>
                    ))}
                </AccordionContent>
            </AccordionItem>

            {/* Kategoriler */}
            <AccordionItem value="item-2">
                <AccordionTrigger>Kategoriler</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                    {categories?.data?.map((cat: any) => (
                        <Button
                            key={cat._id}
                            variant={
                                categoryIDs.includes(cat._id) ? "default" : "outline"
                            }
                            className="w-full flex justify-between"
                            size="sm"
                            onClick={() => toggleCategoryId(cat._id)}
                        >
                            {cat.categoryName}
                            <Badge>{cat.datasetCount}</Badge>
                        </Button>
                    ))}
                </AccordionContent>
            </AccordionItem>

            {/* Tagler */}
            <AccordionItem value="item-3">
                <AccordionTrigger>Etiketler</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                    {tags?.data?.map((tag: any) => (
                        <Button
                            key={tag._id}
                            variant={tagIDs.includes(tag._id) ? "default" : "outline"}
                            className="w-full flex justify-between"
                            size="sm"
                            onClick={() => toggleTagId(tag._id)}
                        >
                            {tag.tagName}
                            <Badge>{tag.datasetCount}</Badge>
                        </Button>
                    ))}
                </AccordionContent>
            </AccordionItem>

            {/* Formatlar */}
            <AccordionItem value="item-4">
                <AccordionTrigger>Formatlar</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                    {formats?.data?.map((format: any) => (
                        <Button
                            key={format._id}
                            variant={formatIDs.includes(format._id) ? "default" : "outline"}
                            className="w-full flex justify-between"
                            size="sm"
                            onClick={() => toggleFormatId(format._id)}
                        >
                            {format.formatName}
                            <Badge>{format.datasetCount}</Badge>
                        </Button>
                    ))}
                </AccordionContent>
            </AccordionItem>

            {/* Lisanslar */}
            <AccordionItem value="item-5">
                <AccordionTrigger>Lisanslar</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                    {licences?.data?.map((licence: any) => (
                        <Button
                            key={licence._id}
                            variant={licenseID === licence._id ? "default" : "outline"}
                            className="w-full flex justify-between"
                            size="sm"
                            onClick={() =>
                                setLicenseID(licenseID === licence._id ? null : licence._id)
                            }
                        >
                            {licence.licenceName}
                            <Badge>{licence.datasetCount}</Badge>
                        </Button>
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
