import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CrudTab } from "./tabs/CrudTab";

import {
    getTags, addTag, updateTag
} from "@/services/tag.service";
import {
    getLicences, addLicence, updateLicence
} from "@/services/licence.service";
import {
    getFormats, addFormat, updateFormat
} from "@/services/format.service";

type TabType = "tag" | "licence" | "format";

export function ManagementDialog({
    open,
    onOpenChange,
    defaultTab,
    onChangeTab
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultTab: TabType;
    onChangeTab: (tab: TabType) => void;
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] space-y-4">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        Yönetim Paneli
                    </DialogTitle>
                </DialogHeader>

                <Tabs
                    value={defaultTab}
                    onValueChange={(tab) => onChangeTab(tab as TabType)}
                    className="space-y-4"
                >
                    <TabsList className="grid grid-cols-3 w-full">
                        <TabsTrigger value="tag">Etiketler</TabsTrigger>
                        <TabsTrigger value="licence">Lisanslar</TabsTrigger>
                        <TabsTrigger value="format">Formatlar</TabsTrigger>
                    </TabsList>

                    <TabsContent value="tag">
                        <CrudTab
                            title="Etiket Listesi"
                            queryKey="tags"
                            queryFn={getTags}
                            addFn={addTag}
                            updateFn={updateTag}
                            fields={[
                                { name: "tagName", label: "Etiket Adı", required: true }
                            ]}
                        />
                    </TabsContent>

                    <TabsContent value="licence">
                        <CrudTab
                            title="Lisans Listesi"
                            queryKey="licences"
                            queryFn={getLicences}
                            addFn={addLicence}
                            updateFn={updateLicence}
                            fields={[
                                { name: "licenceName", label: "Lisans Adı", required: true },
                                { name: "licenceUrl", label: "Lisans URL", type: "url", required: true }
                            ]}
                        />
                    </TabsContent>

                    <TabsContent value="format">
                        <CrudTab
                            title="Format Listesi"
                            queryKey="formats"
                            queryFn={getFormats}
                            addFn={addFormat}
                            updateFn={updateFormat}
                            fields={[
                                { name: "formatName", label: "Format Adı", required: true }
                            ]}
                        />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
