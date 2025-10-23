"use client";

import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from "@/components/ui/multi-select";

import { Plus } from "lucide-react";

import { getCategories } from "@/services/category.service";
import { createDataset } from "@/services/dataset.service";
import { getFormats } from "@/services/format.service";
import { getLicences } from "@/services/licence.service";
import { getMyOrganizations } from "@/services/organization.service";
import { getTags } from "@/services/tag.service";

// ----------------------
// Zod Schema
// ----------------------
const FormSchema = z.object({
    title: z.string().min(3, "Başlık en az 3 karakter olmalı"),
    description: z.string().min(10, "Açıklama en az 10 karakter olmalı"),
    organizationId: z.string().min(1, "Organizasyon seçimi gerekli"),
    categoryIDs: z.array(z.string()).min(1, "En az bir kategori seçin"),
    tagIDs: z.array(z.string()).min(1, "En az bir etiket seçin"),
    formatIDs: z.array(z.string()).min(1, "En az bir format seçin"),
    licenseID: z.string().min(1, "Lisans seçimi gerekli"),
    isPublic: z.boolean().default(true),
});

type DatasetCatFormValues = z.infer<typeof FormSchema>;

interface AddDataCatDialogProps {
    categoryId: string;
    categoryName: string;
}

export function AddDataCatDialog({ categoryId, categoryName }: AddDataCatDialogProps) {
    const [open, setOpen] = useState(false);
    const accessToken =
        typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<DatasetCatFormValues>({
        resolver: zodResolver(FormSchema) as any,
        defaultValues: {
            title: "",
            description: "",
            organizationId: "",
            categoryIDs: [categoryId],
            tagIDs: [],
            formatIDs: [],
            licenseID: "",
            isPublic: true,
        },
    });

    // ----------------------
    // Queries
    // ----------------------
    const { data: categoriesResp } = useQuery({ queryKey: ["categories"], queryFn: getCategories });
    const { data: orgsResp } = useQuery({ queryKey: ["organizations"], queryFn: getMyOrganizations });
    const { data: tagsResp } = useQuery({ queryKey: ["tags"], queryFn: getTags });
    const { data: formatsResp } = useQuery({ queryKey: ["formats"], queryFn: getFormats });
    const { data: licencesResp } = useQuery({ queryKey: ["licences"], queryFn: getLicences });

    // ----------------------
    // Normalized options
    // ----------------------
    const categoryOptions = useMemo(
        () => (categoriesResp?.data ?? []).map((c: any) => ({ value: c._id, label: c.categoryName })),
        [categoriesResp]
    );
    const orgOptions = useMemo(
        () => (orgsResp?.data ?? []).map((o: any) => ({ value: o._id, label: o.organizationName })),
        [orgsResp]
    );
    const tagOptions = useMemo(
        () => (tagsResp?.data ?? []).map((t: any) => ({ value: t._id, label: t.tagName })),
        [tagsResp]
    );
    const formatOptions = useMemo(
        () => (formatsResp?.data ?? []).map((f: any) => ({ value: f._id, label: f.formatName })),
        [formatsResp]
    );
    const licenceOptions = useMemo(
        () => (licencesResp?.data ?? []).map((l: any) => ({ value: l._id, label: l.licenceName })),
        [licencesResp]
    );

    // ----------------------
    // Mutation
    // ----------------------
    const createMutation = useMutation({
        mutationFn: async (payload: DatasetCatFormValues) => {
            if (!accessToken) throw new Error("Giriş yapmalısınız");
            const apiPayload = {
                title: payload.title,
                description: payload.description,
                organizationId: payload.organizationId,
                categoryIDs: payload.categoryIDs,
                tagIDs: payload.tagIDs,
                formatIDs: payload.formatIDs,
                licenseID: payload.licenseID,
                isPublic: payload.isPublic,
            };
            return createDataset(apiPayload, accessToken);
        },
        onSuccess: () => {
            reset();
            setValue("categoryIDs", [categoryId]);
            setOpen(false);
        },
    });

    const onSubmit = (values: DatasetCatFormValues) => createMutation.mutate(values);

    // ----------------------
    // UI
    // ----------------------
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="secondary">
                    <Plus className="h-4 w-4 mr-1" /> Veri Seti Ekle
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[640px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <DialogHeader>
                        <DialogTitle>{categoryName} – Veri Seti Ekle</DialogTitle>
                        <DialogDescription>
                            Bu kategoriye (ve istersen diğer kategorilere) veri seti ekle.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Title */}
                    <div className="grid gap-2">
                        <Label htmlFor="title">Başlık</Label>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => <Input id="title" placeholder="Veri seti başlığı" {...field} />}
                        />
                        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="grid gap-2">
                        <Label htmlFor="description">Açıklama</Label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Textarea id="description" placeholder="Veri seti açıklaması" {...field} />
                            )}
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Organization */}
                    <div className="grid gap-2">
                        <Label>Organizasyon</Label>
                        <Controller
                            name="organizationId"
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Organizasyon seçin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Organizasyonlarım</SelectLabel>
                                            {orgOptions.map((opt: any) => (
                                                <SelectItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.organizationId && (
                            <p className="text-sm text-red-500">{errors.organizationId.message}</p>
                        )}
                    </div>

                    {/* Categories */}
                    <div className="grid gap-2">
                        <Label>Kategoriler</Label>
                        <Controller
                            name="categoryIDs"
                            control={control}
                            render={({ field }) => (
                                <MultiSelect values={field.value} onValuesChange={field.onChange}>
                                    <MultiSelectTrigger className="w-full">
                                        <MultiSelectValue placeholder="Kategorileri seçin" />
                                    </MultiSelectTrigger>
                                    <MultiSelectContent
                                        search={{ placeholder: "Kategori ara...", emptyMessage: "Kategori yok" }}
                                    >
                                        <MultiSelectGroup>
                                            {categoryOptions.map((opt: any) => (
                                                <MultiSelectItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </MultiSelectItem>
                                            ))}
                                        </MultiSelectGroup>
                                    </MultiSelectContent>
                                </MultiSelect>
                            )}
                        />
                        {errors.categoryIDs && (
                            <p className="text-sm text-red-500">{errors.categoryIDs.message}</p>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="grid gap-2">
                        <Label>Etiketler</Label>
                        <Controller
                            name="tagIDs"
                            control={control}
                            render={({ field }) => (
                                <MultiSelect values={field.value} onValuesChange={field.onChange}>
                                    <MultiSelectTrigger className="w-full">
                                        <MultiSelectValue placeholder="Etiketleri seçin" />
                                    </MultiSelectTrigger>
                                    <MultiSelectContent
                                        search={{ placeholder: "Etiket ara...", emptyMessage: "Etiket yok" }}
                                    >
                                        <MultiSelectGroup>
                                            {tagOptions.map((opt: any) => (
                                                <MultiSelectItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </MultiSelectItem>
                                            ))}
                                        </MultiSelectGroup>
                                    </MultiSelectContent>
                                </MultiSelect>
                            )}
                        />
                        {errors.tagIDs && <p className="text-sm text-red-500">{errors.tagIDs.message}</p>}
                    </div>

                    {/* Formats */}
                    <div className="grid gap-2">
                        <Label>Formatlar</Label>
                        <Controller
                            name="formatIDs"
                            control={control}
                            render={({ field }) => (
                                <MultiSelect values={field.value} onValuesChange={field.onChange}>
                                    <MultiSelectTrigger className="w-full">
                                        <MultiSelectValue placeholder="Formatları seçin" />
                                    </MultiSelectTrigger>
                                    <MultiSelectContent
                                        search={{ placeholder: "Format ara...", emptyMessage: "Format yok" }}
                                    >
                                        <MultiSelectGroup>
                                            {formatOptions.map((opt: any) => (
                                                <MultiSelectItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </MultiSelectItem>
                                            ))}
                                        </MultiSelectGroup>
                                    </MultiSelectContent>
                                </MultiSelect>
                            )}
                        />
                        {errors.formatIDs && <p className="text-sm text-red-500">{errors.formatIDs.message}</p>}
                    </div>

                    {/* Licence */}
                    <div className="grid gap-2">
                        <Label>Lisans</Label>
                        <Controller
                            name="licenseID"
                            control={control}
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Lisans seçin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Lisanslar</SelectLabel>
                                            {licenceOptions.map((opt: any) => (
                                                <SelectItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.licenseID && (
                            <p className="text-sm text-red-500">{errors.licenseID.message}</p>
                        )}
                    </div>

                    {/* Public switch */}
                    <div className="flex items-center justify-between border rounded-lg p-3">
                        <div>
                            <Label htmlFor="isPublic">Herkese Açık</Label>
                            <p className="text-xs text-muted-foreground">
                                Veri setini herkes görebilsin mi?
                            </p>
                        </div>
                        <Controller
                            name="isPublic"
                            control={control}
                            render={({ field }) => (
                                <Switch id="isPublic" checked={field.value} onCheckedChange={field.onChange} />
                            )}
                        />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">İptal</Button>
                        </DialogClose>
                        <Button type="submit" disabled={createMutation.isPending}>
                            {createMutation.isPending ? "Kaydediliyor..." : "Kaydet"}
                        </Button>
                    </DialogFooter>

                    {createMutation.isError && (
                        <p className="text-sm text-red-500">
                            {(createMutation.error as Error)?.message ?? "Hata oluştu"}
                        </p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
