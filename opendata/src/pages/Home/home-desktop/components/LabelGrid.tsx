import LabelCard from './inner-components/LabelCard'

function LabelGrid() {
    return (
        <div className='w-full flex flex-col items-center justify-center bg-[#6A60F2] text-white pt-80 py-8 '>
            <span className=" text-2xl">Popüler Etiketler</span>
            <span className="text-6xl font-bold max-w-7xl text-center">Veri Setlerini Etiketlerine Göre Keşfedin</span>
            <div className='grid grid-cols-5 gap-12 mt-12'>
                <LabelCard />
                <LabelCard />
                <LabelCard />
                <LabelCard />
                <LabelCard />
                <LabelCard />
                <LabelCard />
                <LabelCard />
                <LabelCard />
                <LabelCard />
            </div>
        </div>
    )
}

export default LabelGrid