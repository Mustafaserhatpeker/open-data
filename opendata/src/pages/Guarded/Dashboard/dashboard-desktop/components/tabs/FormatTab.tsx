import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFormats, addFormat, updateFormat } from "@/services/format.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function FormatTab({ onDone }: { onDone: () => void }) {
    const queryClient = useQueryClient();
    const [selected, setSelected] = useState<any>(null);

    const { data, isLoading } = useQuery({
        queryKey: ["formats"],
        queryFn: getFormats
    });

    const addMutation = useMutation({
        mutationFn: addFormat,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["formats"] }),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }: any) => updateFormat(id, payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["formats"] }),
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const payload = {
            formatName: formData.get("formatName") as string
        };

        if (selected) {
            updateMutation.mutate({ id: selected._id, payload });
        } else {
            addMutation.mutate(payload);
        }
        setSelected(null);
        e.target.reset();
    };

    return (
        <div className="space-y-4">
            <h4 className="font-medium">Format Listesi</h4>

            {isLoading ? "Yükleniyor..." : (
                <ul className="space-y-2">
                    {data?.data?.map((item: any) => (
                        <li key={item._id}
                            className="p-2 rounded-md border cursor-pointer"
                            onClick={() => setSelected(item)}>
                            {item.formatName}
                        </li>
                    ))}
                </ul>
            )}

            <form onSubmit={handleSubmit} className="grid gap-3 pt-4">
                <Label>Format Adı</Label>
                <Input name="formatName" defaultValue={selected?.formatName} required />

                <Button type="submit">
                    {selected ? "Güncelle" : "Yeni Ekle"}
                </Button>
            </form>
        </div>
    );
}
