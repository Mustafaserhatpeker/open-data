import React from "react"

type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>

export default function StatCard({
    title,
    icon: Icon,
    items,
}: {
    title: string
    icon: LucideIcon
    items: Array<{ label: string; value: number }>
}) {
    return (
        <div className="relative overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md">
            <div className="relative p-4">
                <div className="mb-3 flex items-center gap-2">
                    <div className="rounded-lg bg-zinc-100 p-2 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                        <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                        {title}
                    </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {items.map((it) => (
                        <div
                            key={it.label}
                            className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-800/60"
                        >
                            <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                                {it.value}
                            </div>
                            <div className="text-[11px] text-zinc-500">{it.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}