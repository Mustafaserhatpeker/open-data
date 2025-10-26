import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

type Field = {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
};

export function CrudTab({
    title,
    queryKey,
    queryFn,
    addFn,
    updateFn,
    fields,
}: {
    title: string;
    queryKey: string;
    queryFn: () => Promise<any>;
    addFn: (data: any) => Promise<any>;
    updateFn: (id: string, data: any) => Promise<any>;
    fields: Field[];
}) {
    const queryClient = useQueryClient();
    const [selected, setSelected] = useState<any>(null);

    // Dynamic Yup Schema
    const schema = yup.object(
        fields.reduce((acc: any, f) => {
            acc[f.name] = f.required
                ? yup.string().required(`${f.label} zorunludur`)
                : yup.string();
            return acc;
        }, {})
    );

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const { data, isLoading } = useQuery({
        queryKey: [queryKey],
        queryFn
    });

    useEffect(() => {
        if (selected) reset(selected);
        else reset({});
    }, [selected, reset]);

    const mutation = useMutation({
        mutationFn: async (values: any) => {
            if (selected) return updateFn(selected._id, values);
            return addFn(values);
        },
        onSuccess: () => {
            toast.success("Başarılı ✅");
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            setSelected(null);
            reset({});
        },
        onError: () => toast.error("Bir hata oluştu ❌")
    });

    const list = data?.data || [];

    return (
        <div className="space-y-4">
            <h4 className="font-medium">{title}</h4>

            {isLoading ? (
                <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="w-full h-9 rounded-md" />
                    ))}
                </div>
            ) : (
                <ul className="space-y-2 max-h-[250px] overflow-y-auto border p-2 rounded-md">
                    {list.map((item: any) => (
                        <li
                            key={item._id}
                            onClick={() => setSelected(item)}
                            className={[
                                "p-2 rounded-md border cursor-pointer transition-colors",
                                selected?._id === item._id
                                    ? "bg-primary text-white border-primary"
                                    : "hover:bg-primary/10"
                            ].join(" ")}
                        >
                            {fields.map((f) => item[f.name]).join(" / ")}
                        </li>
                    ))}
                </ul>
            )}

            <form onSubmit={handleSubmit((values) => mutation.mutate(values))} className="grid gap-3 pt-3">
                {fields.map((field) => (
                    <div key={field.name} className="space-y-1">
                        <Label>{field.label}</Label>
                        <Input {...register(field.name)} type={field.type || "text"} />
                        {errors[field.name] && (
                            <p className="text-sm text-red-500">
                                {String(errors[field.name]?.message)}
                            </p>
                        )}
                    </div>
                ))}

                <div className="flex justify-between gap-2 pt-2">
                    {selected && (
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => setSelected(null)}
                        >
                            İptal
                        </Button>
                    )}

                    <Button type="submit" className="ml-auto">
                        {selected ? "Güncelle" : "Yeni Ekle"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
