import RightFilter from "./components/RightFilter"
function DatasetsDesktop() {
    return (
        <div className="w-full flex flex-col items-center justify-between bg-accent min-h-[100vh]">
            <div className="grid grid-cols-4 w-full gap-4 px-4 py-8 ">
                <div className="col-span-1">
                    <RightFilter />
                </div>
            </div>
        </div>
    )
}

export default DatasetsDesktop