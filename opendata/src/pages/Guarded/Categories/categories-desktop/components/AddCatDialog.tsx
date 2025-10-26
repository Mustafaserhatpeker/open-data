"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

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
import { Plus } from "lucide-react";

import { createCategory } from "@/services/category.service";

const CategorySchema = z.object({
    categoryName: z.string().min(2, "Kategori adı en az 2 karakter olmalı"),
    description: z.string().min(5, "Açıklama en az 5 karakter olmalı"),
});

type CategoryFormValues = z.infer<typeof CategorySchema>;

export function AddCatDialog() {
    const [open, setOpen] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CategoryFormValues>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            categoryName: "",
            description: "",
        },
    });

    const createMutation = useMutation({
        mutationFn: async (payload: CategoryFormValues) => createCategory(payload),
        onSuccess: () => {
            reset();
            setOpen(false);
        },
    });

    const onSubmit = (values: CategoryFormValues) => createMutation.mutate(values);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="h-full" variant="secondary">
                    <Plus className="h-4 w-4 mr-1" /> Kategori Ekle
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[480px]">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <DialogHeader>
                        <DialogTitle>Kategori Ekle</DialogTitle>
                        <DialogDescription className="text-red-400">
                            Kategori oluşturmak bütün organizasyonlara açıktır. Lütfen doğru
                            bilgileri girdiğinizden emin olun. Yanlış bilgi girişi kategoriler ve içlerinde
                            bulunan veri setlerinin yanlış sınıflandırılmasına yol açabilir!
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="categoryName">Kategori Adı</Label>
                            <Controller
                                name="categoryName"
                                control={control}
                                render={({ field }) => (
                                    <Input id="categoryName" placeholder="Örn: Eğitim" {...field} />
                                )}
                            />
                            {errors.categoryName && (
                                <p className="text-sm text-red-500">{errors.categoryName.message}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Açıklama</Label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <Textarea id="description" placeholder="Kategori açıklaması" {...field} />
                                )}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>
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
