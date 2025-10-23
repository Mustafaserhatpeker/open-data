import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { CalendarClock, ShieldCheck } from "lucide-react"


type Props = {
    dataset: any
    createdByName?: string
}

export function DatasetMetaCard({ dataset }: Props) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base">Veri Seti Bilgileri</CardTitle>
                <CardDescription>Kimlik ve sürüm bilgileri</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">

                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Lisans:</span>
                    <span className="text-foreground">{dataset?.license?.licenceName}</span>
                </div>

                <div className="flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Oluşturulma:</span>
                    <span className="text-foreground">{
                        new Date(dataset?.createdAt).toLocaleDateString("tr-TR")
                    }</span>
                </div>
                <div className="flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Güncellenme:</span>
                    <span className="text-foreground">{
                        new Date(dataset?.updatedAt).toLocaleDateString("tr-TR")}</span>
                </div>
            </CardContent>
        </Card>
    )
}