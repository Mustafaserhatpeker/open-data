"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { updateCategory } from "@/services/category.service"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pen } from "lucide-react"

const categorySchema = z.object({
    categoryName: z.string().min(2, "Kategori adı en az 2 karakter olmalı"),
    description: z.string().min(5, "Açıklama en az 5 karakter olmalı"),
})

type CategoryForm = z.infer<typeof categorySchema>

export function UpdateCatDialog({
    categoryId,
    category,
}: {
    categoryId: string
    category: any
}) {
    const form = useForm<CategoryForm>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            categoryName: category?.categoryName ?? "",
            description: category?.description ?? "",
        },
    })

    useEffect(() => {
        if (category) {
            form.reset({
                categoryName: category?.categoryName ?? "",
                description: category?.description ?? "",
            })
        }
    }, [category, form])

    const { mutate, isPending, isSuccess, error, reset } = useMutation({
        mutationFn: (data: CategoryForm) =>
            updateCategory(categoryId, data),
        onSuccess: () => {
            form.reset()
        },
    })

    const onSubmit = (data: CategoryForm) => {
        mutate(data)
    }

    return (
        <Dialog
            onOpenChange={(open) => {
                if (!open) {
                    form.reset()
                    reset()
                }
            }}
        >
            <DialogTrigger asChild>
                <Button className="absolute top-2 right-2" variant="outline">
                    <Pen />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Kategoriyi Güncelle</DialogTitle>
                    <DialogDescription className="text-red-400">
                        Kategori bilgilerini güncelliyorsunuz. Lütfen doğru
                        bilgileri girdiğinizden emin olun. Yanlış bilgi girişi kategoriler ve içlerinde
                        bulunan veri setlerinin yanlış sınıflandırılmasına yol açabilir!
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    {/* Kategori Adı */}
                    <div className="grid gap-2">
                        <Label htmlFor="categoryName">Kategori Adı</Label>
                        <Input
                            id="categoryName"
                            placeholder="Örn: Eğitim"
                            {...form.register("categoryName")}
                        />
                        {form.formState.errors.categoryName && (
                            <p className="text-sm text-red-600">
                                {form.formState.errors.categoryName.message}
                            </p>
                        )}
                    </div>

                    {/* Açıklama */}
                    <div className="grid gap-2">
                        <Label htmlFor="description">Açıklama</Label>
                        <Input
                            id="description"
                            placeholder="Kategori açıklaması"
                            {...form.register("description")}
                        />
                        {form.formState.errors.description && (
                            <p className="text-sm text-red-600">
                                {form.formState.errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Footer */}
                    <DialogFooter className="pt-4">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                İptal
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Gönderiliyor..." : "Kaydet"}
                        </Button>
                    </DialogFooter>

                    {/* Durum mesajları */}
                    {isSuccess && (
                        <p className="text-green-600 mt-3">Kategori başarıyla güncellendi!</p>
                    )}
                    {error && (
                        <p className="text-red-600 mt-3">
                            {(error as Error).message}
                            <Button
                                variant="link"
                                onClick={() => reset()}
                                className="ml-2 text-red-500"
                            >
                                Tekrar Dene
                            </Button>
                        </p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    )
}
