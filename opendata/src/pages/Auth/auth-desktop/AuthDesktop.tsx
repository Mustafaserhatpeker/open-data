import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthDesktop() {
    return (
        <div className="flex w-full  flex-col items-center justify-center min-h-[90vh] py-2">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Tabs defaultValue="giris">
                    <TabsList>
                        <TabsTrigger value="giris">Giriş Yap</TabsTrigger>
                        <TabsTrigger value="uye-ol">Üye Ol</TabsTrigger>
                    </TabsList>

                    <TabsContent value="giris">
                        <Card>
                            <CardHeader>
                                <CardTitle>Giriş Yap</CardTitle>
                                <CardDescription>
                                    Devam etmek için e-posta ve şifrenle giriş yap.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="login-email">E-posta</Label>
                                    <Input
                                        id="login-email"
                                        type="email"
                                        placeholder="ornek@eposta.com"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="login-password">Şifre</Label>
                                    <Input
                                        id="login-password"
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="button">Giriş Yap</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="uye-ol">
                        <Card>
                            <CardHeader>
                                <CardTitle>Üye Ol</CardTitle>
                                <CardDescription>
                                    Aşağıdaki bilgileri doldurarak yeni bir hesap oluştur.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="signup-name">Ad Soyad</Label>
                                    <Input
                                        id="signup-name"
                                        type="text"
                                        placeholder="Adın Soyadın"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="signup-email">E-posta</Label>
                                    <Input
                                        id="signup-email"
                                        type="email"
                                        placeholder="ornek@eposta.com"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="signup-password">Şifre</Label>
                                    <Input
                                        id="signup-password"
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="signup-password-confirm">Şifre (Tekrar)</Label>
                                    <Input
                                        id="signup-password-confirm"
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="button">Üye Ol</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}