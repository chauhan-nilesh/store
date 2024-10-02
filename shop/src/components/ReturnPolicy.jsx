import React, { useEffect, useState } from 'react'

function ReturnPolicy() {
    const [store, setStore] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const subdomain = window.location.hostname;

    async function getStoreData() {
        try {
            setIsLoading(true)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/store/subdomain/${subdomain}`)
            const responseData = await response.json()
            if (response.ok) {
                setStore(responseData.data)
            }
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getStoreData()
    }, [])

    if (isLoading) {
        return <div className='flex h-screen w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
    }

    return (
        <div className="container lg:mx-auto px-2 py-10">
            <header className="text-center">
                <h1 className="text-3xl lg:text-4xl font-bold text-black">Return & Replacement Policy</h1>
            </header>
            <section className="bg-white px-4 py-8 rounded-lg lg:mx-28">
                <div className="mb-8">
                    <p className="text-lg"  dangerouslySetInnerHTML={{ __html: store.returnPolicy }} />
                </div>
            </section>
        </div>
    );
}

export default ReturnPolicy