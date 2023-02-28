import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaWindowClose } from 'react-icons/fa';
import axios from "axios";
import { setBannerDeleteClose } from "../../../redux/reducer/BannerDelete";

const BannerDeleteModal = () => {
    const [images, setBanner] = useState([])
    const [deleteModal, setdelete] = useState(false)

    const getBanner = async () => {
        await axios.get(`${import.meta.env.VITE_IP_ADD}/admin/getBanner`)
            .then((data) => {
                setBanner(data.data)
            }).catch(err => console.log(err))
    }

    const dispatch = useDispatch()

    const opened = useSelector((state) => state.deleteBanner.show);

    const closeModal = () => {
        dispatch(setBannerDeleteClose())
    }

    const handleSubmit = (e, id) => {
        e.preventDefault();

        axios
            .post(`${import.meta.env.VITE_IP_ADD}/admin/deleteBanner`, { id })
            .then((res) => {
                dispatch(setBannerDeleteClose())
            }
            )
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getBanner()
    }, [handleSubmit])
    return (
        <div>
            {opened ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-screen my-6 h-screen mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg min-h-screen shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex w-full h-6 flex-row justify-end p-5">
                                    <button onClick={closeModal}><FaWindowClose className="text-sm text-blue-500 cursor-pointer" /></button>
                                </div>
                                <div className='flex flex-row w-full justify-center'>
                                    <h1 className='text-black mb-5 text-4xl font-bold'>Delete banner</h1>
                                </div>

                                <div className='flex overflow-y-auto flex-col w-full py-5 max-h-96'>
                                    {images.length > 0 ? images.map((x) => {
                                        return (
                                            <div className="w-full">
                                                <div className="w-full relative flex flex-row justify-start">
                                                    <div className="absolute m-5">
                                                        {/* <button onClick={(e)=>handleSubmit(e, x._id)} className="w-20 text-white font-bold bg-red-600">
                                                            Delete
                                                        </button> */}
                                                        <button onClick={() => setdelete(true)} className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" type="button">
                                                            Delete
                                                        </button>

                                                        {deleteModal && <div tabindex="-1" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                                                            <div className="relative w-full h-full max-w-md md:h-auto">
                                                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                                    <button type="button" onClick={() => setdelete(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                                        <span className="sr-only">Close modal</span>
                                                                    </button>
                                                                    <div className="p-6 text-center">
                                                                        <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this banner?</h3>
                                                                        <button data-modal-hide="popup-modal" onClick={(e) => handleSubmit(e, x._id)} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                                                            Yes, I'm sure
                                                                        </button>
                                                                        <button type="button" onClick={() => setdelete(false)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>}
                                                    </div>
                                                </div>
                                                <img src={`${import.meta.env.VITE_IP_ADD}/admin/image?q=${x.image}`} alt="" />
                                            </div>
                                        )
                                    }) : (
                                        <div className="h-96 flex flex-row justify-center align-middle items-center">
                                            <div className='flex flex-row w-full justify-center'>
                                                <h1 className='text-red-600 mb-5 text-4xl font-bold'>No data available at this moment</h1>
                                            </div>
                                        </div>
                                    )}
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    )
}

export default BannerDeleteModal