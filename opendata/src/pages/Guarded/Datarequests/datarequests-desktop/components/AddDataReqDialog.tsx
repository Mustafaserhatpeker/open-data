import { useState } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createDataRequest } from "@/services/datarequest.service"
import { getOrganizations } from "@/services/organization.service"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

type DataReqForm = {
    title: string
    description: string
    organizationId: string
}

export function AddDataReqDialog() {
    const [form, setForm] = useState<DataReqForm>({
        title: "",
        description: "",
        organizationId: "",
    })

    const { data: organizationsResp, isLoading: orgLoading } = useQuery({
        queryKey: ["organizations"],
        queryFn: getOrganizations,
    })

    const organizations = organizationsResp?.data ?? []

    const accessToken = localStorage.getItem("accessToken") || ""

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: () => createDataRequest(form, accessToken),
        onSuccess: () => {
            setForm({ title: "", description: "", organizationId: "" })
        },
    })

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate()
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Yeni Veri İsteği Oluştur</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Yeni Veri İsteği</DialogTitle>
                        <DialogDescription>
                            Lütfen istek bilgilerini doldurun.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-3 mt-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Başlık</Label>
                            <Input
                                id="title"
                                value={form.title}
                                required
                                onChange={(e) =>
                                    setForm((prev) => ({ ...prev, title: e.target.value }))
                                }
                                placeholder="Örn: Q5 Satış Verileri"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="desc">Açıklama</Label>
                            <Textarea
                                id="desc"
                                required
                                rows={4}
                                value={form.description}
                                onChange={(e) =>
                                    setForm((prev) => ({ ...prev, description: e.target.value }))
                                }
                                placeholder="İstek detaylarını giriniz..."
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Organizasyon</Label>
                            <Select
                                required
                                value={form.organizationId}
                                onValueChange={(v) =>
                                    setForm((prev) => ({ ...prev, organizationId: v }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Organizasyon seçiniz..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {orgLoading && (
                                        <SelectItem value="loading" disabled>
                                            Yükleniyor...
                                        </SelectItem>
                                    )}
                                    {!orgLoading &&
                                        organizations.map((org: any) => (
                                            <SelectItem key={org._id} value={org._id}>
                                                {org.organizationName}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter className="mt-6">
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                İptal
                            </Button>
                        </DialogClose>

                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="animate-spin mr-1" />}
                            Oluştur
                        </Button>
                    </DialogFooter>
                </form>

                {isSuccess && (
                    <p className="text-green-600 text-sm mt-2">
                        ✅ Veri isteği başarıyla oluşturuldu!
                    </p>
                )}
            </DialogContent>
        </Dialog>
    )
}
