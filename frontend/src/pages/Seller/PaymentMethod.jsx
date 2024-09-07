import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';

function PaymentMethod() {
    const { token } = useAuth()
    const [store, setStore] = useState({})
    const [loading, setLoading] = useState(true);
    const [codStatus, setCodStatus] = useState(true)

    const getStoreData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/current-user`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                setStore(responseData.data.store);
            }

            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getStoreData()
    }, [codStatus])

    const handleCodStatus = async (e) => {
        setCodStatus(!codStatus)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/store/cod/change-status/${store._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: !codStatus
                })
            })

            const responseData = await response.json()
            if (response.ok) {
                toast.success(responseData.message)
                getStoreData()
            } else {
                toast.error(responseData.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return <div className='flex h-screen w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
    }


    return (
        <section className='bg-white flex-grow h-dvh min-w-80 lg:h-dvh lg:pb-0 pb-20'>
            <div className='lg:my-7 lg:mx-7 my-5 mx-3'>
                <h2 className='text-xl lg:text-3xl text-zinc-900 font-extrabold tracking-tight'>Set payment method</h2>
            </div>
            <div className="overflow-x-auto mt-7 mx-4 lg:mx-7">
                <table className="min-w-full text-xs">
                    <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                    </colgroup>
                    <thead className="bg-gray-100">
                        <tr className="text-left">
                            <th className="p-3 text-base tracking-tighter">Name</th>
                            <th className="p-3 text-base tracking-tighter">Provider</th>
                            <th className="p-3 text-base tracking-tighter">Status</th>
                            <th className="p-3 text-base tracking-tighter">Modify</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-opacity-20 border-gray-300 bg-white">
                            <td className="p-3 text-base tracking-tight">
                                <p>Cash on delivery (COD)</p>
                            </td>
                            <td className="p-3 text-base tracking-tight">
                                <p>{store.name}</p>
                            </td>
                            <td className="p-3 text-base tracking-tight">
                                {store.cod ?
                                    <p className='text-green-800 font-bold'>Active</p>
                                    :
                                    <p className='text-red-800 font-bold'>Inactive</p>
                                }
                            </td>
                            <td className="p-3 text-base tracking-tight">
                                {store.cod ?
                                    <button type='button' onClick={handleCodStatus} className="px-3 py-1 font-semibold rounded-md bg-red-600 text-gray-50">
                                        Deactivate
                                    </button>
                                    : <button type='button' onClick={handleCodStatus} className="px-3 py-1 font-semibold rounded-md bg-green-700 text-gray-50">
                                        Activate
                                    </button>
                                }
                            </td>
                        </tr>
                        {/* <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                            <td className="p-3 text-base tracking-tight">
                                <p>Paytm payment gateway</p>
                            </td>
                            <td className="p-3 text-base tracking-tight">
                                <p>Paytm</p>
                            </td>
                            <td className="p-3 text-base tracking-tight">
                                {false ?
                                    <p className='text-green-800 font-bold'>Active</p>
                                    :
                                    <p className='text-red-800 font-bold'>Inactive</p>
                                }
                            </td>
                            <td className="p-3 text-base tracking-tight">
                                {false ?
                                    <button type='button' onClick={handleCodStatus} className="px-3 py-1 font-semibold rounded-md bg-red-600 text-gray-50">
                                        Deactivate
                                    </button>
                                    : <button type='button' onClick={handleCodStatus} className="px-3 py-1 font-semibold rounded-md bg-green-700 text-gray-50">
                                        Activate
                                    </button>
                                }
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default PaymentMethod