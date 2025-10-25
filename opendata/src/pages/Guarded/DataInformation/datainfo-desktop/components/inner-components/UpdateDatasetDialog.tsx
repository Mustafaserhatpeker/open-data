"use client";

import { useEffect, useMemo, useState } from "react";
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

import { Pen } from "lucide-react";

import { getCategories } from "@/services/category.service";
import { getFormats } from "@/services/format.service";
import { getLicences } from "@/services/licence.service";
import { getMyOrganizations } from "@/services/organization.service";
import { getTags } from "@/services/tag.service";
import { updateDataset } from "@/services/dataset.service";

// ----------------------
// Zod Schema & Types
// ----------------------
const FormSchema = z.object({
    title: z.string().min(3, "Başlık en az 3 karakter olmalı"),
    description: z.string().min(10, "Açıklama en az 10 karakter olmalı"),
    organizationId: z.string().uuid("Geçerli bir organizasyon seçin"),
    categoryIDs: z.array(z.string().uuid()).min(1, "En az bir kategori seçin"),
    tagIDs: z.array(z.string().uuid()).min(1, "En az bir etiket seçin"),
    formatIDs: z.array(z.string().uuid()).min(1, "En az bir format seçin"),
    licenseID: z.string().uuid("Geçerli bir lisans seçin"),
    isPublic: z.boolean().default(true),
});

export type DatasetFormValues = z.infer<typeof FormSchema>;

// ----------------------
// Component
// ----------------------
export function UpdateDatasetDialog({ dataset }: { dataset: any }) {
    const [open, setOpen] = useState(false);
    const accessToken =
        typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<DatasetFormValues>({
        resolver: zodResolver(FormSchema) as any,
        defaultValues: {
            title: dataset?.title ?? "",
            description: dataset?.description ?? "",
            organizationId: dataset?.organization?._id ?? "",
            categoryIDs: dataset?.categories?.map((c: any) => c._id) ?? [],
            tagIDs: dataset?.tags?.map((t: any) => t._id) ?? [],
            formatIDs: dataset?.formats?.map((f: any) => f._id) ?? [],
            licenseID: dataset?.license?._id ?? "",
            isPublic: dataset?.isPublic ?? true,
        },
    });

    // dataset değişirse formu resetle (örn. dialog açıldığında)
    useEffect(() => {
        if (dataset) {
            reset({
                title: dataset.title ?? "",
                description: dataset.description ?? "",
                organizationId: dataset.organization?._id ?? "",
                categoryIDs: dataset.categories?.map((c: any) => c._id) ?? [],
                tagIDs: dataset.tags?.map((t: any) => t._id) ?? [],
                formatIDs: dataset.formats?.map((f: any) => f._id) ?? [],
                licenseID: dataset.license?._id ?? "",
                isPublic: dataset.isPublic ?? true,
            });
        }
    }, [dataset, reset]);

    // ----------------------
    // Queries (dropdown verileri)
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

    const loadingAny =
        categoriesLoading ||
        orgsLoading ||
        tagsLoading ||
        formatsLoading ||
        licencesLoading;

    const categoryOptions = useMemo(
        () =>
            (categoriesResp?.data ?? []).map((c: any) => ({
                value: c._id,
                label: c.categoryName,
            })),
        [categoriesResp]
    );
    const orgOptions = useMemo(
        () =>
            (organizationsResp?.data ?? []).map((o: any) => ({
                value: o._id,
                label: o.organizationName,
            })),
        [organizationsResp]
    );
    const tagOptions = useMemo(
        () =>
            (tagsResp?.data ?? []).map((t: any) => ({
                value: t._id,
                label: t.tagName,
            })),
        [tagsResp]
    );
    const formatOptions = useMemo(
        () =>
            (formatsResp?.data ?? []).map((f: any) => ({
                value: f._id,
                label: f.formatName,
            })),
        [formatsResp]
    );
    const licenceOptions = useMemo(
        () =>
            (licencesResp?.data ?? []).map((l: any) => ({
                value: l._id,
                label: l.licenceName,
            })),
        [licencesResp]
    );

    // ----------------------
    // Mutation (update)
    // ----------------------
    const updateMutation = useMutation({
        mutationFn: async (payload: DatasetFormValues) => {
            if (!accessToken) throw new Error("Giriş yapmalısınız");
            const apiPayload = {
                datasetId: dataset._id,
                ...payload,
            };
            return updateDataset(apiPayload, accessToken);
        },
        onSuccess: () => {
            setOpen(false);
        },
    });

    const onSubmit = (values: DatasetFormValues) => {
        updateMutation.mutate(values);
    };

    // ----------------------
    // UI
    // ----------------------
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Pen />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[640px]">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <DialogHeader>
                        <DialogTitle>Veri Setini Güncelle</DialogTitle>
                        <DialogDescription>
                            Mevcut veri setinin bilgilerini düzenleyin.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        {/* Title */}
                        <div className="grid gap-2">
                            <Label htmlFor="title">Başlık</Label>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <Input id="title" placeholder="Veri seti başlığı" {...field} />
                                )}
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
                                    <Textarea
                                        id="description"
                                        placeholder="Veri seti açıklaması"
                                        {...field}
                                    />
                                )}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Organization */}
                        <div className="grid gap-2">
                            <Label>Organizasyon</Label>
                            <Controller
                                name="organizationId"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={loadingAny}
                                    >
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
                                <p className="text-sm text-red-500">
                                    {errors.organizationId.message}
                                </p>
                            )}
                        </div>

                        {/* Multi-select fields (kategoriler, etiketler, formatlar) */}
                        {[
                            {
                                name: "categoryIDs",
                                label: "Kategoriler",
                                options: categoryOptions,
                                error: errors.categoryIDs,
                            },
                            {
                                name: "tagIDs",
                                label: "Etiketler",
                                options: tagOptions,
                                error: errors.tagIDs,
                            },
                            {
                                name: "formatIDs",
                                label: "Formatlar",
                                options: formatOptions,
                                error: errors.formatIDs,
                            },
                        ].map((fieldData) => (
                            <div key={fieldData.name} className="grid gap-2">
                                <Label>{fieldData.label}</Label>
                                <Controller
                                    name={fieldData.name as keyof DatasetFormValues}
                                    control={control}
                                    render={({ field }) => (
                                        <MultiSelect
                                            values={field.value as string[]}
                                            onValuesChange={field.onChange}
                                        >
                                            <MultiSelectTrigger className="w-full">
                                                <MultiSelectValue
                                                    placeholder={`${fieldData.label} seçin`}
                                                />
                                            </MultiSelectTrigger>
                                            <MultiSelectContent
                                                search={{
                                                    placeholder: `${fieldData.label} ara...`,
                                                    emptyMessage: `${fieldData.label} bulunamadı`,
                                                }}
                                            >
                                                <MultiSelectGroup>
                                                    {fieldData.options.map((opt: any) => (
                                                        <MultiSelectItem
                                                            key={opt.value}
                                                            value={opt.value}
                                                        >
                                                            {opt.label}
                                                        </MultiSelectItem>
                                                    ))}
                                                </MultiSelectGroup>
                                            </MultiSelectContent>
                                        </MultiSelect>
                                    )}
                                />
                                {fieldData.error && (
                                    <p className="text-sm text-red-500">
                                        {fieldData.error.message}
                                    </p>
                                )}
                            </div>
                        ))}

                        {/* Licence */}
                        <div className="grid gap-2">
                            <Label>Lisans</Label>
                            <Controller
                                name="licenseID"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        disabled={loadingAny}
                                    >
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
                                <p className="text-sm text-red-500">
                                    {errors.licenseID.message}
                                </p>
                            )}
                        </div>

                        {/* Visibility */}
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div className="space-y-1">
                                <Label htmlFor="isPublic">Herkese Açık</Label>
                                <p className="text-xs text-muted-foreground">
                                    Veri setini portalda herkese görünür yapar.
                                </p>
                            </div>
                            <Controller
                                name="isPublic"
                                control={control}
                                render={({ field }) => (
                                    <Switch
                                        id="isPublic"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={isSubmitting}>
                                İptal
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={isSubmitting || loadingAny}
                        >
                            {updateMutation.isPending ? "Güncelleniyor..." : "Kaydet"}
                        </Button>
                    </DialogFooter>

                    {updateMutation.isError && (
                        <p className="text-sm text-red-500">
                            {(updateMutation.error as Error)?.message ??
                                "Güncelleme sırasında bir hata oluştu."}
                        </p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}
