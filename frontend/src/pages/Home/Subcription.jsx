import React, { useState } from "react";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import useStoreData from "../../Hooks/useStoreData";
import dateFormat from "dateformat";

const Subcription = () => {
    const [upiId, setUpiId] = useState("");
    const [selectedPlan, setSelectedPlan] = useState({
        period: null,
        price: null
    });
    const [isQrVisible, setIsQrVisible] = useState(false);
    const [selectOption, setSelectOption] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false)
    const navigate = useNavigate()
    const { user, loading } = useStoreData();
    const [tId, setTId] = useState("")

    const handlePay = async (e) => {
        e.preventDefault()
        if (upiId.trim() === "") {
            toast.error("Please enter a valid UPI ID.");
            return;
        }
        if (!selectedPlan) {
            toast.error("Please select a subscription plan.");
            return;
        }
        setLoadingBtn(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/subscription/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user?._id,
                    ...selectedPlan
                })
            })

            const responseData = await response.json()
            if (response.ok) {
                setTId(responseData.data._id)
            } else {
                toast.error("Something went wrong. Try again after 15 minutes")
                navigate("/subcription")
            }
            setLoadingBtn(false)
        } catch (error) {
            console.log(error)
        }
        setIsQrVisible(true); // Show the QR Code and hide the form
    };

    const handleDone = async (e) => {
        e.preventDefault()
        setLoadingBtn(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/subscription-payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user?._id,
                    tId: tId,
                    subcription: true,
                    upiId: upiId
                })
            })

            const responseData = await response.json()
            if (response.ok) {
                toast.success("Your is Payment currently in review. It will take 1 to 4 hours to be verified.");
                setUpiId("");
                setSelectedPlan("");
                setIsQrVisible(false); // Reset the form
                navigate("/seller/dashboard")
            } else {
                toast.error("Something went wrong. Try again after 15 minutes")
                navigate("/subcription")
            }
            setLoadingBtn(false)
        } catch (error) {
            console.log(error)
        }

    };

    if (loading) {
        return <div className='flex h-dvh w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
    }

    if (loadingBtn) {
        return <div className='flex h-dvh w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
    }

    return (
        <>
            <div className="max-w-2xl mx-auto text-center mt-10">
                <span className="font-bold tracking-wider uppercase text-orange-600">Startup Plan</span>
                <h2 className="text-2xl font-bold lg:text-5xl">Perfect for creators,startup and influencers</h2>
            </div>
            {user.subcription ?
                <div className="flex flex-wrap justify-center items-stretch mx-4 my-10">
                    <div className="flex justify-center w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
                        <div className="">
                            <div className="bg-orange-600 py-2 flex rounded-t justify-center items-center">
                                <h4 className="text-white font-bold">Current Plan</h4>
                            </div>
                            <div className="pt-1 flex justify-center items-center">
                                <b className="font-bold">TID: {user?.transactionId?._id}</b>
                            </div>
                            <div className="pt-1 flex justify-center items-center">
                                <b className="font-bold">Status: {user?.transactionId?.status ? <b className="text-green-600">Verfied</b> : <b className="text-yellow-500">In Review</b>}</b>
                            </div>
                            {user?.transactionId?.status ?
                                <>
                                    <div className="pt-1 flex justify-center items-center">
                                        <b className="font-bold">UPI Reference: {user?.transactionId?.upiReferenceNo}</b>
                                    </div>
                                    <div className="pt-1 flex justify-center items-center">
                                        <b className="font-bold">Paid: ₹{user?.transactionId?.price}</b>
                                    </div>
                                    <div className="pt-1 flex justify-center items-center">
                                        <b className="font-bold">Purchased on: {dateFormat(user?.transactionId?.createdAt, "mediumDate")}</b>
                                    </div>
                                    <div className="pt-1 flex justify-center items-center">
                                        <b className="font-bold">Expires on: {dateFormat(user?.transactionId?.expiresOn, "mediumDate")}</b>
                                    </div>
                                </>
                                :
                                ""
                            }
                            <div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow-lg">
                                <div className="space-y-2">
                                    <h4 className="text-2xl font-bold">Startup</h4>
                                    <h2 className="text-6xl font-bold">₹199 <span className='text-3xl text-gray-600 line-through'>₹999</span></h2>
                                </div>
                                <p className="mt-3 leading-relaxed text-gray-600">Perfect for creators,startup and influencers</p>
                                <ul className="flex-1 mb-6 text-gray-600">
                                    <li className="flex mb-2 space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 text-orange-600">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Online Store</span>
                                    </li>
                                    <li className="flex mb-2 space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 text-orange-600">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Unlimited products</span>
                                    </li>
                                    <li className="flex mb-2 space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 text-orange-600">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Unlimited orders & sales</span>
                                    </li>
                                    <li className="flex mb-2 space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 text-orange-600">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Create unlimited coupons</span>
                                    </li>
                                    <li className="flex mb-2 space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 text-orange-600">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Own subdomain</span>
                                    </li>
                                    <li className="flex mb-2 space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 text-orange-600">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Custom Domain</span>
                                    </li>
                                    <li className="flex mb-2 space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 text-orange-600">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>No transaction fees</span>
                                    </li>
                                    <li className="flex mb-2 space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 text-orange-600">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>COD Option</span>
                                    </li>
                                    <li className="flex mb-2 space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0 w-6 h-6 text-orange-600">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span>Basic support</span>
                                    </li>
                                </ul>
                                <div className='inline-block px-5 py-3 font-semibold tracking-wider text-center rounded bg-zinc-600 text-gray-50'>
                                    <button type="button">Already Selected</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <main data-theme="light" className="mx-3 lg:mx-10 flex flex-wrap my-10 justify-center items-center">
                    <div className="bg-gray-100 rounded-xl h-auto w-full md:w-[400px] px-3 lg:px-8 py-6">
                        {/* Conditional Rendering: Show Form or QR Code */}
                        {!isQrVisible ? (
                            // Form Section
                            <>
                                <h1 className="flex flex-wrap justify-center font-bold text-2xl mb-6">Subscribe Now</h1>
                                <form>

                                    {/* Subscription Plan Selection */}
                                    <div className="mt-5">
                                        <h2 className="text-lg font-semibold mb-2">Choose a Plan:</h2>
                                        <div className="space-y-3">
                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="plan"
                                                    value="1"
                                                    className="form-radio h-5 w-5 text-indigo-600"
                                                    onChange={(e) => setSelectedPlan({ period: e.target.value, price: 199 })}
                                                />
                                                <span>1 Month - &#8377;199</span>
                                            </label>
                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="plan"
                                                    value="3"
                                                    className="form-radio h-5 w-5 text-indigo-600"
                                                    onChange={(e) => setSelectedPlan({ period: e.target.value, price: 499 })}
                                                />
                                                <span>3 Months - &#8377;499</span>
                                            </label>
                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="plan"
                                                    value="6"
                                                    className="form-radio h-5 w-5 text-indigo-600"
                                                    onChange={(e) => setSelectedPlan({ period: e.target.value, price: 999 })}
                                                />
                                                <span>6 Months - &#8377;999</span>
                                            </label>
                                        </div>
                                    </div>

                                    <h4 className="mt-5 text-lg font-semibold">Payment Methods:</h4>
                                    <div className="relative mt-2">
                                        <input
                                            className="peer hidden"
                                            id="radio_1"
                                            type="radio"
                                            name="paymentMethod"
                                            value="COD"
                                            onChange={(e) => setSelectOption(true)}
                                        />
                                        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                                            <img className="w-14 object-contain" src="./cashless-payment.png" alt="" />
                                            <div className="ml-5">
                                                <span className="mt-2 font-semibold">UPI</span>
                                                <p className="text-slate-500 text-base leading-6">Pay through any UPI App</p>
                                            </div>
                                        </label>
                                    </div>
                                    {/* UPI ID Input */}
                                    {(selectOption && <input
                                        className="mt-5 px-4 py-3 bg-gray-200 rounded-lg outline-none w-full"
                                        type="text"
                                        placeholder="Enter UPI ID"
                                        value={upiId}
                                        onChange={(e) => setUpiId(e.target.value)}
                                    />)}
                                    <p className="text-zinc-700 text-xs ml-2">Eg: abc@bank</p>

                                    {/* Pay Button */}
                                    <input
                                        className="bg-zinc-900 text-white w-full rounded-lg px-4 py-3 mt-6 cursor-pointer"
                                        type="button"
                                        value="Pay"
                                        onClick={handlePay}
                                    />
                                </form>
                            </>
                        ) : (
                            // QR Code Section
                            <>
                                <h1 className="flex flex-wrap justify-center font-bold text-2xl mb-6">Pay via UPI</h1>
                                <div className="flex flex-wrap justify-center bg-white mt-4 h-auto py-4 px-3 rounded-lg">
                                    <img
                                        src={`/qr-price.png`} // Replace with your QR code image path
                                        alt="QR Code"
                                        className="w-48 h-48"
                                    />
                                </div>
                                <div className="flex flex-wrap justify-center mt-4">
                                    <img className="h-6" src="/upi.png" alt="UPI" />
                                    <img className="h-6 ml-3" src="/gpay.png" alt="GPay" />
                                    <img className="h-6 ml-3" src="/phonepe.png" alt="PhonePe" />
                                    <img className="h-6 ml-3" src="/paytm.png" alt="Paytm" />
                                </div>
                                <p className="text-xs mt-6 ml-2 font-bold">After making payment click on done.</p>
                                <button
                                    className="bg-zinc-900 text-white w-full rounded-lg px-4 py-3 mt-2"
                                    onClick={handleDone}
                                >
                                    Done
                                </button>
                            </>
                        )}
                    </div>
                </main>
            }
        </>
    );
};

export default Subcription;