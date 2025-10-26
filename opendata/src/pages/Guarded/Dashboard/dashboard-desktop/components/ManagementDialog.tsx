import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TagTab } from "./tabs/TagTab";
import { LicenceTab } from "./tabs/LicenceTab";
import { FormatTab } from "./tabs/FormatTab";

export function ManagementDialog({
    open,
    onOpenChange,
    defaultTab
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultTab: "tag" | "licence" | "format";
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle>Yönetim Paneli</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue={defaultTab}>
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="tag">Etiketler</TabsTrigger>
                        <TabsTrigger value="licence">Lisanslar</TabsTrigger>
                        <TabsTrigger value="format">Formatlar</TabsTrigger>
                    </TabsList>

                    <TabsContent value="tag">
                        <TagTab onDone={() => onOpenChange(false)} />
                    </TabsContent>

                    <TabsContent value="licence">
                        <LicenceTab onDone={() => onOpenChange(false)} />
                    </TabsContent>

                    <TabsContent value="format">
                        <FormatTab onDone={() => onOpenChange(false)} />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
