import React, { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';

function Transactions() {
    const { token } = useAuth();
    const [transactions, setTransactions] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    async function getTransactionsData() {
        try {
            setIsLoading(true)
            const user = await fetch(`${import.meta.env.VITE_API_URL}/api/user/current-user`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const userData = await user.json()

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/subscription/user-transaction/${userData.data._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },

            })

            if (response.ok) {
                const responseData = await response.json()
                setTransactions(responseData.data)
            }

            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getTransactionsData()
    }, [])

    if (isLoading) {
        return <div className='flex h-dvh w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
    }

    return (
        <>
            <section className='bg-white h-screen w-full lg:h-dvh lg:pb-0 pb-20'>
                <div className='lg:my-7 my-5 mx-3 lg:mx-5'>
                    <div className="container p-2 mx-auto sm:p-4 text-gray-800">
                        <div className='flex justify-between lg:justify-start lg:gap-5'>
                            <h2 className='text-xl lg:text-3xl text-zinc-900 font-extrabold tracking-tight'>Transactions</h2>
                        </div>

                        {transactions.length === 0 ?

                            <div className='w-full mt-20'>
                                <div className='flex justify-center items-center'>
                                    <img className='h-40 w-40' src="/category.png" alt="" />
                                </div>
                                <h1 className='text-center text-2xl font-semibold tracking-tighter text-gray-700'>Not added categories yet!</h1>
                            </div>
                            :
                            <div className="lg:overflow-auto overflow-scroll mt-7">
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
                                            <th className="p-3 text-base tracking-tighter">Transaction Id</th>
                                            <th className="p-3 text-base tracking-tighter">UPI ID</th>
                                            <th className="p-3 text-base tracking-tighter">Transaction Date</th>
                                            <th className="p-3 text-base tracking-tighter">UPI Reference No</th>
                                            <th className="p-3 text-base tracking-tighter">From User</th>
                                            <th className="p-3 text-base tracking-tighter">Status</th>
                                            <th className="p-3 text-base tracking-tighter">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions.map((transaction, index) =>
                                            <tr key={index} className="border-b border-opacity-20 border-gray-300 bg-white">
                                                <td className="p-3 text-base tracking-tight">
                                                    <p>{transaction._id}</p>
                                                </td>
                                                <td className="p-3 text-base tracking-tight">
                                                    <p>{transaction.upiId ? transaction.upiId : "-"}</p>
                                                </td>
                                                <td className="p-3 text-base tracking-tight">
                                                    <p>{transaction.createdAt.split("T")[0]+", "+transaction.expiresOn.split("T")[1].split(".")[0]}</p>
                                                </td>
                                                <td className="p-3 text-base tracking-tight">
                                                    <p>{transaction.upiReferenceNo}</p>
                                                </td>
                                                <td className="p-3 text-base tracking-tight">
                                                    <p>{transaction.failed ? <span className='text-red-600 font-semibold'>Failed</span> : <span className='text-green-600 font-semibold'>Success</span>}</p>
                                                </td>
                                                <td className="p-3 text-base tracking-tight">
                                                    <p>{transaction.status ? <span className='text-green-600 font-semibold'>Received</span> : <span className='text-yellow-500 font-semibold'>In Review</span>}</p>
                                                </td>
                                                <td className="p-3 text-base tracking-tight">
                                                    <p>Rs. {transaction.price}</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        }

                    </div>
                </div>
            </section>

        </>
    )
}

export default Transactions