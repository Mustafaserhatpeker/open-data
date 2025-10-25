"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandList,
    CommandItem,
} from "@/components/ui/command"
import { useMutation } from "@tanstack/react-query"
import { updateDataRequestStatus } from "@/services/datarequest.service"

const statusOptions = [
    { value: "pending", label: "Beklemede ⏳" },
    { value: "approved", label: "Onayla ✅" },
    { value: "rejected", label: "Reddet ❌" },
]

export function StatusChange({ request }: { request: any }) {
    const [open, setOpen] = React.useState(false)
    const [selected, setSelected] = React.useState<string>(request.status)


    const mutation = useMutation({
        mutationFn: (newStatus: string) =>
            updateDataRequestStatus(request._id, newStatus,),
        onSuccess: (_, newStatus) => {
            setSelected(newStatus)


        },
    })

    const handleSelectStatus = (newStatus: string) => {
        mutation.mutate(newStatus)
        setOpen(false)
    }

    const selectedLabel =
        statusOptions.find((s) => s.value === selected)?.label || selected

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="h-7 px-2 text-xs">
                    {mutation.isPending ? "Güncelleniyor..." : selectedLabel}
                    <ChevronsUpDown className="ml-1 h-3 w-3 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[180px] p-0">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {statusOptions.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    onSelect={() => handleSelectStatus(option.value)}
                                    className={option.value === selected ? "bg-accent" : ""}
                                >
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
