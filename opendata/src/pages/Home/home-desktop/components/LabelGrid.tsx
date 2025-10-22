import { useQuery } from '@tanstack/react-query';
import LabelCard from './inner-components/LabelCard'
import { getCategories } from '@/services/category.service';

type Category = {
    _id: string;
    // add other properties as needed
};

function LabelGrid() {
    const { data: categoriesResp } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
    });
    return (
        <div className='w-full flex flex-col items-center justify-center bg-[#6A60F2] text-white pt-80 py-8 pb-40 '>
            <span className=" text-2xl">Popüler Etiketler</span>
            <span className="text-6xl font-bold max-w-[80%] text-center">Veri Setlerini Kategorilerine Göre Keşfedin</span>
            <div className='grid grid-cols-5 gap-12 mt-12 '>
                {categoriesResp?.data?.map((category: Category) => (
                    <LabelCard key={category._id} category={category} />
                ))}
            </div>
        </div>
    )
}

export default LabelGrid