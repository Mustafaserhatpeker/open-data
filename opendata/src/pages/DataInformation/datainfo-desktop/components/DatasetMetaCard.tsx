import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarClock, Hash, ShieldCheck, UserRound } from "lucide-react"
import type { Dataset as DummyDataset } from "@/lib/types"
import { formatDate } from "./utils"

type Props = {
    dataset: DummyDataset
    createdByName?: string
}

export function DatasetMetaCard({ dataset, createdByName }: Props) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base">Veri Seti Bilgileri</CardTitle>
                <CardDescription>Kimlik ve sürüm bilgileri</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">ID:</span>
                    <span className="text-foreground">{dataset.id}</span>
                </div>
                <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Lisans:</span>
                    <span className="text-foreground">{dataset.license}</span>
                </div>
                {dataset.version ? (
                    <div className="flex items-center gap-2">
                        <Badge className="h-5 px-2 rounded">v{dataset.version}</Badge>
                        <span className="text-muted-foreground">sürüm</span>
                    </div>
                ) : null}
                <div className="flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Oluşturulma:</span>
                    <span className="text-foreground">{formatDate(dataset.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Güncellenme:</span>
                    <span className="text-foreground">{formatDate(dataset.updatedAt)}</span>
                </div>
                {createdByName ? (
                    <div className="flex items-center gap-2">
                        <UserRound className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Oluşturan:</span>
                        <span className="text-foreground">{createdByName}</span>
                    </div>
                ) : null}
            </CardContent>
        </Card>
    )
}