"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addResource } from "@/services/resource.service";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";


const allowedMimeTypes = [
    "application/pdf",
    "text/plain",
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/json",
    "application/xml",
    "text/xml",
    "text/html",
    "application/vnd.google-earth.kml+xml",
    "application/vnd.google-earth.kmz",
];

// -----------------------------
// ✅ Zod Şeması
// -----------------------------
const FormSchema = z.object({
    resourceName: z.string().min(3, "Kaynak adı en az 3 karakter olmalı"),
    file: z
        .any()
        .refine((file) => file instanceof File, "Bir dosya seçmelisiniz.")
        .refine(
            (file: File) => allowedMimeTypes.includes(file.type),
            "Geçersiz dosya türü. Sadece PDF, CSV, XLS, XLSX, JSON, XML, HTML, KML, KMZ, TXT dosyalarına izin verilir."
        ),
});

type ResourceFormValues = z.infer<typeof FormSchema>;

// -----------------------------
// ✅ Bileşen
// -----------------------------
interface AddResourceProps {
    datasetId: string;
}

export function AddResource({ datasetId }: AddResourceProps) {
    const [open, setOpen] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ResourceFormValues>({
        resolver: zodResolver(FormSchema),
    });

    const mutation = useMutation({
        mutationFn: async (values: ResourceFormValues) => {
            const formData = new FormData();
            formData.append("resourceName", values.resourceName);
            formData.append("file", values.file);
            formData.append("datasetId", datasetId);
            return await addResource(formData);
        },
        onSuccess: () => {
            reset();
            setOpen(false);
        },
    });

    const onSubmit = (values: ResourceFormValues) => mutation.mutate(values);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="secondary">
                    <Upload className="h-4 w-4 mr-1" /> Kaynak Ekle
                </Button>
            </DialogTrigger>

            {/* 🔒 Modal dışına tıklayınca kapanmasın */}
            <DialogContent
                className="sm:max-w-[480px]"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <DialogHeader>
                        <DialogTitle>Yeni Kaynak Ekle</DialogTitle>
                        <DialogDescription>
                            Bu veri setine bir kaynak dosyası ekleyin. Maksimum boyut: 5 MB.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Kaynak adı */}
                    <div className="grid gap-2">
                        <Label htmlFor="resourceName">Kaynak Adı</Label>
                        <Controller
                            name="resourceName"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    id="resourceName"
                                    placeholder="Örnek: 2024 Nüfus Verisi"
                                    {...field}
                                />
                            )}
                        />
                        {errors.resourceName && (
                            <p className="text-sm text-red-500">
                                {errors.resourceName.message}
                            </p>
                        )}
                    </div>

                    {/* Dosya alanı */}
                    <Controller
                        name="file"
                        control={control}
                        render={({ field }) => (
                            <div className="grid gap-2">
                                <Label htmlFor="file">Dosya</Label>
                                <Input
                                    id="file"
                                    type="file"
                                    accept={allowedMimeTypes.join(",")}
                                    onChange={(e) => {
                                        const files = e.target.files;
                                        if (files && files.length > 0) {
                                            field.onChange(files[0]); // sadece ilk dosyayı al
                                        } else {
                                            field.onChange(null);
                                        }
                                    }}
                                    onClick={(e) => e.stopPropagation()} // 🔥 Dialog kapanmasını önler
                                />
                                {errors.file && (
                                    <p className="text-sm text-red-500">
                                        {errors.file.message as string}
                                    </p>
                                )}
                            </div>
                        )}
                    />

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">İptal</Button>
                        </DialogClose>
                        <Button type="submit" disabled={mutation.isPending || isSubmitting}>
                            {mutation.isPending ? "Yükleniyor..." : "Kaydet"}
                        </Button>
                    </DialogFooter>

                    {mutation.isError && (
                        <p className="text-sm text-red-500">
                            {(mutation.error as Error)?.message ?? "Yükleme başarısız"}
                        </p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AddResource;
