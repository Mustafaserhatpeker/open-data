"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { updateOrganization } from "@/services/organization.service"

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

const organizationSchema = z.object({
    organizationName: z.string().min(2, "Kuruluş adı en az 2 karakter olmalı"),
    description: z.string().min(10, "Açıklama en az 10 karakter olmalı"),
    logoUrl: z.string().url("Geçerli bir logo URL girin"),
    websiteUrl: z.string().url("Geçerli bir web sitesi URL girin"),
    contactEmail: z.string().email("Geçerli bir e-posta adresi girin"),
})

type OrganizationForm = z.infer<typeof organizationSchema>

export function UpdateOrgDialog({
    organizationId,
    organization,
}: {
    organizationId: string
    organization: any
}) {
    const form = useForm<OrganizationForm>({
        resolver: zodResolver(organizationSchema),
        defaultValues: {
            organizationName: organization?.organizationName ?? "",
            description: organization?.description ?? "",
            logoUrl: organization?.logoUrl ?? "",
            websiteUrl: organization?.websiteUrl ?? "",
            contactEmail: organization?.contactEmail ?? "",
        },
    })

    // Organizasyon değiştiğinde formu güncelle
    useEffect(() => {
        if (organization) {
            form.reset({
                organizationName: organization?.organizationName ?? "",
                description: organization?.description ?? "",
                logoUrl: organization?.logoUrl ?? "",
                websiteUrl: organization?.websiteUrl ?? "",
                contactEmail: organization?.contactEmail ?? "",
            })
        }
    }, [organization, form])

    const { mutate, isPending, isSuccess, error, reset } = useMutation({
        mutationFn: (data: OrganizationForm) =>
            updateOrganization(organizationId, data),
        onSuccess: () => {
            form.reset()
        },
    })

    const onSubmit = (data: OrganizationForm) => {
        mutate(data)
    }

    return (
        <Dialog
            onOpenChange={(open) => {
                // Kapatıldığında form ve hata durumlarını sıfırla
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
                    <DialogTitle>Kuruluşu Güncelle</DialogTitle>
                    <DialogDescription>
                        Mevcut kuruluş bilgilerini güncellemek için aşağıdaki alanları doldurun.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    {/* Kuruluş Adı */}
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

                    {/* Açıklama */}
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

                    {/* Logo URL */}
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

                    {/* Web Sitesi URL */}
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

                    {/* E-posta */}
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
                        <p className="text-green-600 mt-3">Kuruluş başarıyla güncellendi!</p>
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
