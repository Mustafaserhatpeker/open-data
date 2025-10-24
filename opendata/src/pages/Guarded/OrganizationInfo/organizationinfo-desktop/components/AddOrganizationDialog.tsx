"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { createOrganization } from "@/services/organization.service"

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

// ✅ Zod doğrulama şeması
const organizationSchema = z.object({
    organizationName: z.string().min(2, "Kuruluş adı en az 2 karakter olmalı"),
    description: z.string().min(10, "Açıklama en az 10 karakter olmalı"),
    logoUrl: z.string().url("Geçerli bir logo URL girin"),
    websiteUrl: z.string().url("Geçerli bir web sitesi URL girin"),
    contactEmail: z.string().email("Geçerli bir e-posta adresi girin"),
})

type OrganizationForm = z.infer<typeof organizationSchema>

export function AddOrganizationDialog() {
    // ✅ React Hook Form + Zod entegrasyonu
    const form = useForm<OrganizationForm>({
        resolver: zodResolver(organizationSchema),
        defaultValues: {
            organizationName: "",
            description: "",
            logoUrl: "",
            websiteUrl: "",
            contactEmail: "",
        },
    })

    // ✅ React Query mutation (JSON body ile)
    const { mutate, isPending, isSuccess, error, reset } = useMutation({
        mutationFn: (data: OrganizationForm) => createOrganization(data),
    })

    const onSubmit = (data: OrganizationForm) => {
        mutate(data)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Kuruluş Ekle</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Yeni Kuruluş Ekle</DialogTitle>
                    <DialogDescription>
                        Yeni bir kuruluş oluşturmak için aşağıdaki alanları doldurun.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="organizationName">Kuruluş Adı</Label>
                        <Input
                            id="organizationName"
                            placeholder="Örn: Kartepe Belediyesi"
                            {...form.register("organizationName")}
                        />
                        {form.formState.errors.organizationName && (
                            <p className="text-sm text-red-600">
                                {form.formState.errors.organizationName.message}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Açıklama</Label>
                        <Input
                            id="description"
                            placeholder="Örn: Kartepe Belediyesi Açık Veri Portalı"
                            {...form.register("description")}
                        />
                        {form.formState.errors.description && (
                            <p className="text-sm text-red-600">
                                {form.formState.errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="logoUrl">Logo URL</Label>
                        <Input
                            id="logoUrl"
                            placeholder="https://example.com/logo.png"
                            {...form.register("logoUrl")}
                        />
                        {form.formState.errors.logoUrl && (
                            <p className="text-sm text-red-600">
                                {form.formState.errors.logoUrl.message}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="websiteUrl">Web Sitesi URL</Label>
                        <Input
                            id="websiteUrl"
                            placeholder="https://example.com"
                            {...form.register("websiteUrl")}
                        />
                        {form.formState.errors.websiteUrl && (
                            <p className="text-sm text-red-600">
                                {form.formState.errors.websiteUrl.message}
                            </p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="contactEmail">İletişim E-postası</Label>
                        <Input
                            id="contactEmail"
                            placeholder="ornek@belediye.gov.tr"
                            {...form.register("contactEmail")}
                        />
                        {form.formState.errors.contactEmail && (
                            <p className="text-sm text-red-600">
                                {form.formState.errors.contactEmail.message}
                            </p>
                        )}
                    </div>

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

                    {isSuccess && (
                        <p className="text-green-600 mt-3">Kuruluş başarıyla eklendi!</p>
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
