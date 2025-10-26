import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getLicences, addLicence, updateLicence } from "@/services/licence.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function LicenceTab({ onDone }: { onDone: () => void }) {
    const queryClient = useQueryClient();
    const [selected, setSelected] = useState<any>(null);

    const { data, isLoading } = useQuery({
        queryKey: ["licences"],
        queryFn: getLicences
    });

    const addMutation = useMutation({
        mutationFn: addLicence,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["licences"] }),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, payload }: any) => updateLicence(id, payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["licences"] }),
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const payload = {
            licenceName: formData.get("licenceName") as string,
            licenceUrl: formData.get("licenceUrl") as string
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
            <h4 className="font-medium">Lisans Listesi</h4>

            {isLoading ? "Yükleniyor..." : (
                <ul className="space-y-2">
                    {data?.data?.map((item: any) => (
                        <li key={item._id}
                            className="p-2 rounded-md border cursor-pointer"
                            onClick={() => setSelected(item)}>
                            {item.licenceName}
                        </li>
                    ))}
                </ul>
            )}

            <form onSubmit={handleSubmit} className="grid gap-3 pt-4">
                <Label>Lisans Adı</Label>
                <Input name="licenceName" defaultValue={selected?.licenceName} required />

                <Label>Lisans URL</Label>
                <Input name="licenceUrl" defaultValue={selected?.licenceUrl} required />

                <Button type="submit">
                    {selected ? "Güncelle" : "Yeni Ekle"}
                </Button>
            </form>
        </div>
    );
}
