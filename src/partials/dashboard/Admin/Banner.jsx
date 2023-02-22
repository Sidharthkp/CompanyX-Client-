import axios from "axios";
import { useEffect, useState } from "react";

const Banner = () => {
    const [images, setBanner] = useState([])
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const getBanner = async () => {
        await axios.get("https://companyx.cyclic.app/admin/getBanner")
            .then((data) => {
                setBanner(data.data)
            }).catch(err=>console.log(err))
    }
    useEffect(()=>{
        getBanner()
    }, [])
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(
                currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
            );
        }, 5000);
        return () => clearInterval(intervalId);
    }, [currentImageIndex, images.length]);

    function handlePreviousClick() {
        setCurrentImageIndex(
            currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
        );
    }

    function handleNextClick() {
        setCurrentImageIndex(
            currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
        );
    }

    return (
        <div className="relative w-full h-96 overflow-hidden bg-gray-900">
            <img
                src={`https://companyx.cyclic.app/admin/image?q=${images[currentImageIndex]?.image}`}
                // alt={`Image ${currentImageIndex + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <button
                className="absolute bottom-0 left-0 m-7 bg-white text-gray-900 p-3 rounded-full hover:bg-gray-900 hover:text-white focus:outline-none focus:shadow-outline"
                onClick={handlePreviousClick}
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M12.707 5. 293l-5 5a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                    <path
                        fillRule="evenodd"
                        d="M7 14a1 1 0 012 0v-2.5a.5.5 0 001 0V14a1 1 0 01-2 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <button
                className="absolute bottom-0 right-0 m-6 bg-white text-gray-900 p-3  rounded-full hover:bg-gray-900 hover:text-white focus:outline-none focus:shadow-outline"
                onClick={handleNextClick}
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M7.293 5. 293a1 1 0 011.414 0L10 7.586l2. 293-2. 293a1 1 0 111. 414 1.414L11.414 10l2. 293 2. 293a1 1 0 01-1.414 1.414L10 11.414 7. 707 14.707a1 1 0 01-1.414-1.414L8.586 10 6. 293 7.707a1 1 0 010-1. 414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    )
}

export default Banner