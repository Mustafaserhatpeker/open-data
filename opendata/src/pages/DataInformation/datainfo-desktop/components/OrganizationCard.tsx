import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, FolderClosed, Globe, Mail } from "lucide-react"

type Props = {
    organization?: any
}

export function OrganizationCard({ organization }: Props) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base">Sağlayan Organizasyon</CardTitle>
                <CardDescription>Veri setini yayımlayan kurum bilgileri</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12 rounded-lg">
                        <AvatarImage src={organization?.logoUrl} alt={organization?.organizationName} />
                        <AvatarFallback className="rounded-lg">
                            {(organization?.organizationName ?? "ORG").slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <p className="font-medium truncate">{organization?.name ?? "-"}</p>
                        </div>
                        {organization?.description ? (
                            <p className="mt-1 text-sm text-muted-foreground">{organization.description}</p>
                        ) : null}
                    </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        {organization?.websiteUrl ? (
                            <a
                                href={organization.websiteUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-foreground hover:underline truncate"
                            >
                                Web sitesi
                            </a>
                        ) : (
                            <span className="text-muted-foreground">Web sitesi yok</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {organization?.contactEmail ? (
                            <a href={`mailto:${organization.contactEmail}`} className="hover:underline">
                                {organization.contactEmail}
                            </a>
                        ) : (
                            <span className="text-muted-foreground">İletişim e-postası yok</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <FolderClosed className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                            Veri seti sayısı: <span className="text-foreground">{organization?.datasetCount ?? 0}</span>
                        </span>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}