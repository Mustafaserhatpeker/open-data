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
// Zod Schema & Types
// ----------------------
const FormSchema = z.object({
    title: z
        .string({ error: "Başlık gerekli" })
        .min(3, "Başlık en az 3 karakter olmalı"),
    description: z
        .string({ error: "Açıklama gerekli" })
        .min(10, "Açıklama en az 10 karakter olmalı"),
    organizationId: z.string({ error: "Organizasyon seçimi gerekli" }).uuid("Geçerli bir organizasyon seçin"),
    categoryIDs: z
        .array(z.string().uuid())
        .min(1, "En az bir kategori seçin"),
    tagIDs: z.array(z.string().uuid()).min(1, "En az bir etiket seçin"),
    formatIDs: z.array(z.string().uuid()).min(1, "En az bir format seçin"),
    licenseID: z.string({ error: "Lisans seçimi gerekli" }).uuid("Geçerli bir lisans seçin"),
    isPublic: z.boolean().default(true),
});

export type DatasetFormValues = z.infer<typeof FormSchema>;

// ----------------------
// Component
// ----------------------
export function AddDataDialog() {
    const [open, setOpen] = useState(false);
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<DatasetFormValues>({
        resolver: zodResolver(FormSchema) as any,
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
    });

    // ----------------------
    // Queries (lists)
    // ----------------------
    const { data: categoriesResp, isLoading: categoriesLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });
    const { data: organizationsResp, isLoading: orgsLoading } = useQuery({
        queryKey: ["organizations"],
        queryFn: () => getMyOrganizations(),
    });
    const { data: tagsResp, isLoading: tagsLoading } = useQuery({
        queryKey: ["tags"],
        queryFn: () => getTags(),
    });
    const { data: formatsResp, isLoading: formatsLoading } = useQuery({
        queryKey: ["formats"],
        queryFn: () => getFormats(),
    });
    const { data: licencesResp, isLoading: licencesLoading } = useQuery({
        queryKey: ["licences"],
        queryFn: () => getLicences(),
    });

    const loadingAny = categoriesLoading || orgsLoading || tagsLoading || formatsLoading || licencesLoading;

    // Normalize options from API
    const categoryOptions = useMemo(
        () => (categoriesResp?.data ?? []).map((c: any) => ({ value: c._id as string, label: c.categoryName as string })),
        [categoriesResp]
    );
    const orgOptions = useMemo(
        () => (organizationsResp?.data ?? []).map((o: any) => ({ value: o._id as string, label: o.organizationName as string })),
        [organizationsResp]
    );
    const tagOptions = useMemo(
        () => (tagsResp?.data ?? []).map((t: any) => ({ value: t._id as string, label: t.tagName as string })),
        [tagsResp]
    );
    const formatOptions = useMemo(
        () => (formatsResp?.data ?? []).map((f: any) => ({ value: f._id as string, label: f.formatName as string })),
        [formatsResp]
    );
    const licenceOptions = useMemo(
        () => (licencesResp?.data ?? []).map((l: any) => ({ value: l._id as string, label: l.licenceName as string })),
        [licencesResp]
    );

    // ----------------------
    // Mutation (create)
    // ----------------------
    const createMutation = useMutation({
        mutationFn: async (payload: DatasetFormValues) => {
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
            setOpen(false);
        },
    });

    const onSubmit = (values: DatasetFormValues) => createMutation.mutate(values);

    // ----------------------
    // UI
    // ----------------------
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" /> Veri Seti Ekle
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[640px]">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <DialogHeader>
                        <DialogTitle>Yeni Veri Seti</DialogTitle>
                        <DialogDescription>
                            Başlık, açıklama ve ilgili alanları doldurarak yeni bir veri seti oluşturun.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        {/* Title */}
                        <div className="grid gap-2">
                            <Label htmlFor="title">Başlık</Label>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => <Input id="title" placeholder="Örn: Trafik Kazaları 2024" {...field} />}
                            />
                            {errors.title && (
                                <p className="text-sm text-red-500">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="grid gap-2">
                            <Label htmlFor="description">Açıklama</Label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <Textarea id="description" placeholder="Veri setinin kapsamını kısaca açıklayın" {...field} />
                                )}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Organization (single) */}
                        <div className="grid gap-2">
                            <Label>Organizasyon</Label>
                            <Controller
                                name="organizationId"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange} disabled={loadingAny}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={loadingAny ? "Yükleniyor..." : "Organizasyon seçin"} />
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

                        {/* Categories (multi) */}
                        <div className="grid gap-2">
                            <Label>Kategoriler</Label>
                            <Controller
                                name="categoryIDs"
                                control={control}
                                render={({ field }) => (
                                    <MultiSelect values={field.value} onValuesChange={field.onChange}>
                                        <MultiSelectTrigger className="w-full">
                                            <MultiSelectValue placeholder={loadingAny ? "Yükleniyor..." : "Kategorileri seçin"} />
                                        </MultiSelectTrigger>
                                        <MultiSelectContent search={{ placeholder: "Kategori ara...", emptyMessage: "Kategori bulunamadı" }}>
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

                        {/* Tags (multi) */}
                        <div className="grid gap-2">
                            <Label>Etiketler</Label>
                            <Controller
                                name="tagIDs"
                                control={control}
                                render={({ field }) => (
                                    <MultiSelect values={field.value} onValuesChange={field.onChange}>
                                        <MultiSelectTrigger className="w-full">
                                            <MultiSelectValue placeholder={loadingAny ? "Yükleniyor..." : "Etiketleri seçin"} />
                                        </MultiSelectTrigger>
                                        <MultiSelectContent search={{ placeholder: "Etiket ara...", emptyMessage: "Etiket bulunamadı" }}>
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
                            {errors.tagIDs && (
                                <p className="text-sm text-red-500">{errors.tagIDs.message}</p>
                            )}
                        </div>

                        {/* Formats (multi) */}
                        <div className="grid gap-2">
                            <Label>Formatlar</Label>
                            <Controller
                                name="formatIDs"
                                control={control}
                                render={({ field }) => (
                                    <MultiSelect values={field.value} onValuesChange={field.onChange}>
                                        <MultiSelectTrigger className="w-full">
                                            <MultiSelectValue placeholder={loadingAny ? "Yükleniyor..." : "Formatları seçin"} />
                                        </MultiSelectTrigger>
                                        <MultiSelectContent search={{ placeholder: "Format ara...", emptyMessage: "Format bulunamadı" }}>
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
                            {errors.formatIDs && (
                                <p className="text-sm text-red-500">{errors.formatIDs.message}</p>
                            )}
                        </div>

                        {/* Licence (single) */}
                        <div className="grid gap-2">
                            <Label>Lisans</Label>
                            <Controller
                                name="licenseID"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange} disabled={loadingAny}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={loadingAny ? "Yükleniyor..." : "Lisans seçin"} />
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

                        {/* Visibility */}
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div className="space-y-1">
                                <Label htmlFor="isPublic">Herkese Açık</Label>
                                <p className="text-xs text-muted-foreground">Veri setini portalda herkese görünür yapar.</p>
                            </div>
                            <Controller
                                name="isPublic"
                                control={control}
                                render={({ field }) => (
                                    <Switch id="isPublic" checked={field.value} onCheckedChange={field.onChange} />
                                )}
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={isSubmitting || createMutation.isPending}>
                                İptal
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting || createMutation.isPending || loadingAny}>
                            {createMutation.isPending ? "Kaydediliyor..." : "Kaydet"}
                        </Button>
                    </DialogFooter>

                    {/* Hata / Başarı mesajları (opsiyonel - kendi toast sisteminle entegre edebilirsin) */}
                    {createMutation.isError && (
                        <p className="text-sm text-red-500">{(createMutation.error as Error)?.message ?? "Kayıt sırasında bir hata oluştu"}</p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
