import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthStore } from "@/stores/auth.store";


export default function UserDropdown(
    { role }: { role: any }
) {
    const { logout } = useAuthStore();
    const email = localStorage.getItem("email") || "";
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>

                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{email}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                    {role === "organization" ? (
                        <DropdownMenuItem onClick={
                            () => {
                                window.location.href = "/dashboard";
                            }
                        }>
                            Kullanıcı Panelim
                        </DropdownMenuItem>
                    ) : (

                        <DropdownMenuItem onClick={
                            () => {
                                window.location.href = "/datarequests";
                            }
                        }>
                            Veri İsteklerim
                        </DropdownMenuItem>
                    )
                    }
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={
                    () => {
                        logout();
                        window.location.href = "/";
                    }
                }>
                    Çıkış Yap
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
