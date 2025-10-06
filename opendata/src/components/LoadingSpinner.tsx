
import { Loader } from "lucide-react";

const LoadingSpinner = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <Loader className='size-10 animate-spin  mx-auto' />
        </div>
    );
};

export default LoadingSpinner;