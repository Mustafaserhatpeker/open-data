import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/auth.store";

export default function UserDropdown({ role }: { role: any }) {
    const { logout } = useAuthStore();
    const email = localStorage.getItem("email") || "";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>TR</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-48"
                align="end"
                side="bottom"
            >
                <DropdownMenuLabel className="text-xs text-gray-600">
                    {email}
                </DropdownMenuLabel>

                {role === "organization" ? (
                    <DropdownMenuItem onClick={() => window.location.href = "/dashboard"}>
                        Panelim
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem onClick={() => window.location.href = "/datarequests"}>
                        Veri Taleplerim
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => {
                        logout();
                        window.location.href = "/";
                    }}
                >
                    Çıkış Yap
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
