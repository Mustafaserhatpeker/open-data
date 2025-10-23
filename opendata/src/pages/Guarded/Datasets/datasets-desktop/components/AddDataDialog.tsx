"use client"

import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useQuery } from "@tanstack/react-query"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { createDataset } from "@/services/dataset.service"
import { getCategories } from "@/services/category.service"
import { getMyOrganizations } from "@/services/organization.service"
import { getTags } from "@/services/tag.service"
import { getFormats } from "@/services/format.service"
import { getLicences } from "@/services/licence.service"
import { toast } from "sonner"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from "@/components/ui/multi-select"

// 🧩 Form doğrulama şeması
const datasetSchema = z.object({
    title: z.string().min(3, "Başlık en az 3 karakter olmalı"),
    description: z.string().min(10, "Açıklama en az 10 karakter olmalı"),
    organizationId: z.string().min(1, "Bir organizasyon seçmelisiniz"),
    categoryIDs: z.array(z.string()).nonempty("En az bir kategori seçin"),
    tagIDs: z.array(z.string()).default([]),
    formatIDs: z.array(z.string()).default([]),
    licenseID: z.string().min(1, "Bir lisans seçmelisiniz"),
    isPublic: z.boolean().default(true),
})

type DatasetFormValues = z.infer<typeof datasetSchema>

export function AddDataDialog() {
    const accessToken = localStorage.getItem("accessToken")

    // 🔽 React Query çağrıları
    const { data: categories } = useQuery({ queryKey: ["categories"], queryFn: getCategories })
    const { data: organizations } = useQuery({ queryKey: ["organizations"], queryFn: getMyOrganizations })
    const { data: tags } = useQuery({ queryKey: ["tags"], queryFn: getTags })
    const { data: formats } = useQuery({ queryKey: ["formats"], queryFn: getFormats })
    const { data: licences } = useQuery({ queryKey: ["licences"], queryFn: getLicences })

    const form = useForm<DatasetFormValues>({
        resolver: zodResolver(datasetSchema) as any,
        defaultValues: {
            title: "",
            description: "",
            organizationId: "",
            categoryIDs: [],
            tagIDs: [],
            formatIDs: [],
            licenseID: "",
            isPublic: true,
        },
    })

    const [open, setOpen] = useState(false)

    const onSubmit: SubmitHandler<DatasetFormValues> = async (values) => {
        try {
            await createDataset(accessToken, values)
            toast.success("Veri seti başarıyla oluşturuldu 🎉")
            setOpen(false)
            form.reset()
        } catch (error) {
            toast.error("Veri seti oluşturulurken hata oluştu.")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <Plus size={16} /> Veri Seti Ekle
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Yeni Veri Seti Ekle</DialogTitle>
                    <DialogDescription>
                        Lütfen veri seti bilgilerini doldurun. Kaydettiğinizde sistemde yayınlanacaktır.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {/* Başlık */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Başlık</Label>
                        <Input id="title" placeholder="Veri seti başlığı" {...form.register("title")} />
                        {form.formState.errors.title && (
                            <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
                        )}
                    </div>

                    {/* Açıklama */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Açıklama</Label>
                        <Textarea id="description" placeholder="Veri seti açıklaması" {...form.register("description")} />
                    </div>

                    {/* Organizasyon */}
                    <div className="space-y-2">
                        <Label>Organizasyon</Label>
                        <Select
                            value={form.watch("organizationId")}
                            onValueChange={(val) => form.setValue("organizationId", val)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Bir organizasyon seçin" />
                            </SelectTrigger>
                            <SelectContent>
                                {organizations?.data?.map((org: any) => (
                                    <SelectItem key={org.id} value={org.id}>
                                        {org.organizationName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Kategoriler */}
                    <div className="space-y-2">
                        <Label>Kategoriler</Label>
                        <MultiSelect
                            values={form.watch("categoryIDs")}
                            onValuesChange={(vals) => form.setValue("categoryIDs", vals)}
                        >
                            <MultiSelectTrigger className="w-full">
                                <MultiSelectValue placeholder="Kategori seçin" />
                            </MultiSelectTrigger>
                            <MultiSelectContent
                                search={{
                                    placeholder: "Kategorilerde ara...",
                                    emptyMessage: "Hiç kategori bulunamadı",
                                }}
                            >
                                <MultiSelectGroup>
                                    {categories?.data?.map((cat: any) => (
                                        <MultiSelectItem key={cat.id} value={cat.id}>
                                            {cat.categoryName}
                                        </MultiSelectItem>
                                    ))}
                                </MultiSelectGroup>
                            </MultiSelectContent>
                        </MultiSelect>
                    </div>

                    {/* Etiketler */}
                    <div className="space-y-2">
                        <Label>Etiketler</Label>
                        <MultiSelect
                            values={form.watch("tagIDs")}
                            onValuesChange={(vals) => form.setValue("tagIDs", vals)}
                        >
                            <MultiSelectTrigger className="w-full">
                                <MultiSelectValue placeholder="Etiket seçin" />
                            </MultiSelectTrigger>
                            <MultiSelectContent
                                search={{
                                    placeholder: "Etiketlerde ara...",
                                    emptyMessage: "Etiket bulunamadı",
                                }}
                            >
                                <MultiSelectGroup>
                                    {tags?.data?.map((tag: any) => (
                                        <MultiSelectItem key={tag.id} value={tag.id}>
                                            {tag.tagName}
                                        </MultiSelectItem>
                                    ))}
                                </MultiSelectGroup>
                            </MultiSelectContent>
                        </MultiSelect>
                    </div>

                    {/* Formatlar */}
                    <div className="space-y-2">
                        <Label>Formatlar</Label>
                        <MultiSelect
                            values={form.watch("formatIDs")}
                            onValuesChange={(vals) => form.setValue("formatIDs", vals)}
                        >
                            <MultiSelectTrigger className="w-full">
                                <MultiSelectValue placeholder="Format seçin" />
                            </MultiSelectTrigger>
                            <MultiSelectContent
                                search={{
                                    placeholder: "Formatlarda ara...",
                                    emptyMessage: "Format bulunamadı",
                                }}
                            >
                                <MultiSelectGroup>
                                    {formats?.data?.map((fmt: any) => (
                                        <MultiSelectItem key={fmt.id} value={fmt.id}>
                                            {fmt.formatName}
                                        </MultiSelectItem>
                                    ))}
                                </MultiSelectGroup>
                            </MultiSelectContent>
                        </MultiSelect>
                    </div>

                    {/* Lisans */}
                    <div className="space-y-2">
                        <Label>Lisans</Label>
                        <Select
                            value={form.watch("licenseID")}
                            onValueChange={(val) => form.setValue("licenseID", val)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Bir lisans seçin" />
                            </SelectTrigger>
                            <SelectContent>
                                {licences?.data?.map((lic: any) => (
                                    <SelectItem key={lic.id} value={lic.id}>
                                        {lic.licenceName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Yayın Durumu */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isPublic"
                            {...form.register("isPublic")}
                            className="w-4 h-4 accent-blue-600"
                        />
                        <Label htmlFor="isPublic">Herkese açık olarak yayınla</Label>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                İptal
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Kaydediliyor..." : "Kaydet"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
