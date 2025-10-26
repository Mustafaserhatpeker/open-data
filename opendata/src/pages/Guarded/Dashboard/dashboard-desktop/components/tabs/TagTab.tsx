import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTags, addTag, updateTag } from "@/services/tag.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function TagTab({ onDone }: { onDone: () => void }) {
    const queryClient = useQueryClient();
    const [selected, setSelected] = useState<any>(null);

    const { data, isLoading } = useQuery({
        queryKey: ["tags"],
        queryFn: getTags
    });

    const addMutation = useMutation({
        mutationFn: addTag,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tags"] }),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }: any) => updateTag(id, payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tags"] }),
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const payload = {
            tagName: formData.get("tagName") as string
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
            <h4 className="font-medium">Etiket Listesi</h4>

            {isLoading ? "Yükleniyor..." : (
                <ul className="space-y-2">
                    {data?.data?.map((item: any) => (
                        <li
                            key={item._id}
                            className="p-2 rounded-md border cursor-pointer"
                            onClick={() => setSelected(item)}>
                            {item.tagName}
                        </li>
                    ))}
                </ul>
            )}

            <form onSubmit={handleSubmit} className="grid gap-3 pt-4">
                <Label>Etiket Adı</Label>
                <Input name="tagName" defaultValue={selected?.tagName} required />

                <Button type="submit" className="justify-end">
                    {selected ? "Güncelle" : "Yeni Ekle"}
                </Button>
            </form>
        </div>
    );
}
