import OrganizationDatasets from "./inner-components/organization/OrganizationDatasets"
import OrganizationInformation from "./inner-components/organization/OrganizationInformation"
function OrganizationArea() {
    return (
        <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border bg-popover">
            <OrganizationInformation />
            <OrganizationDatasets />
        </div>
    )
}

export default OrganizationArea