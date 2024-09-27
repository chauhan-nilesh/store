import React, { useEffect, useState } from 'react';
import Quicktable from '../../components/Seller/Quicktable';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useStoreData from '../../Hooks/useStoreData';
import isTokenExpired from '../../Hooks/verifyJwtToken';
import { useAuth } from '../../store/auth';

function Dashboard() {

  const { user, loading } = useStoreData();
  const { setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (isTokenExpired(token)) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setToken(localStorage.getItem('token'));
      }
    } else {
      navigate('/login');
    }
  }, []);

  if (loading) {
    return <div className='flex h-dvh w-full justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>
  }

  return (
    <>
      <section className='bg-white flex-grow h-full pb-14 lg:pb-8'>
        <div className='lg:my-5 my-5 mx-3'>
          <h2 className='lg:text-3xl text-xl text-zinc-900 font-extrabold tracking-tight'>Dashboard</h2>
          {/* alert to verify email */}
          <div role="alert" className="alert mt-3 hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Your email verification is pending. Verify to open your own store</span>
            <div>
              <button className="btn btn-sm btn-primary">Verify</button>
            </div>
          </div>
          <div className='grid grid-cols-2 mt-7 gap-5 lg:grid-cols-4 '>
            <div className='bg-white shadow-md lg:shadow-sm w-auto rounded-xl p-4'>
              <div className='flex justify-between'>
                <h3 className='lg:text-xl text-xl font-bold overflow-hidden tracking-tighter'>Total Revenue</h3>
              </div>
              {/* <p className='text-sm text-gray-500 tracking-tighter'>Last 30 days</p> */}
              <h2 className='overflow-hidden text-2xl mt-4 lg:text-4xl font-extrabold'>&#8377;{user?.store?.revenue}</h2>
            </div>
            <div className='bg-white shadow-md lg:shadow-sm w-auto rounded-xl p-4'>
              <div className='flex justify-between'>
                <h3 className='lg:text-xl text-xl font-bold overflow-hidden tracking-tighter'>Total Orders</h3>
                </div>
              {/* <p className='text-sm text-gray-500 tracking-tighter'>Last 30 days</p> */}
              <h2 className='overflow-hidden text-2xl mt-4 lg:text-4xl font-extrabold'>{user?.store?.orders?.length}</h2>
            </div>
            <div className='bg-white shadow-md lg:shadow-sm w-auto rounded-xl p-4'>
              <div className='flex justify-between'>
                <h3 className='lg:text-xl text-xl font-bold overflow-hidden tracking-tighter'>Total Customer</h3>
              </div>
              {/* <p className='text-sm text-gray-500 tracking-tighter'>Last 30 days</p> */}
              <h2 className='overflow-hidden text-2xl mt-4 lg:text-4xl font-extrabold'>{user?.store?.customers?.length}</h2>
            </div>
            <div className='bg-white shadow-md lg:shadow-sm w-auto rounded-xl p-4'>
              <div className='flex justify-between'>
                <h3 className='lg:text-xl text-xl font-bold overflow-hidden tracking-tighter'>Total Products</h3>
              </div>
              {/* <p className='text-sm text-gray-500 tracking-tighter'>Last 30 days</p> */}
              <h2 className='overflow-hidden text-2xl mt-4 lg:text-4xl font-extrabold'>{user?.store?.products?.length}</h2>
            </div>
          </div>
          {/* <div className='grid grid-rows-2 grid-cols-none lg:grid-rows-none lg:grid-cols-2 gap-5 mt-8'> */}
          <div className='mt-8 gap-4 lg:flex'>
            <div className='bg-white shadow-md lg:shadow-sm lg:w-full h-fit p-5 rounded-xl'>
              <h2 className='lg:text-3xl text-xl font-bold tracking-tighter'>Store</h2>
              {user.store.logo ? <div className='flex flex-wrap justify-center mt-5'>
                <img className='h-20' src={user?.store?.logo} alt="store logo" />
              </div> : ""
              }
              <h2 className='text-center text-xl font-bold tracking-tighter'>{user?.store?.name}</h2>
              <p className='text-center'>{user?.store?.products?.length} Products</p>
              <Link to="../edit-store">
                <h2 className='text-center mt-7 font-bold bg-transparent py-4 rounded-xl hover:bg-orange-100'>
                  Edit Store
                </h2>
              </Link>
              <a href={`https://${user?.store?.subdomain}.${import.meta.env.VITE_HOSTNAME}`}>
                <h2 className='text-center mt-2 text-bold bg-orange-600 py-4 rounded-xl font-bold text-white hover:bg-orange-500'>
                  View Store
                </h2>
              </a>
            </div>
            <div className='bg-white shadow-md lg:shadow-sm w-full h-90 mt-4 lg:mt-0 p-5 rounded-xl'>
              <h2 className='text-xl lg:text-3xl font-bold mb-3 tracking-tighter'>Recent Orders</h2>
              {user?.store?.orders?.length === 0 ?
                <div className='w-full h-full flex justify-center'>
                  <div className='mt-5 lg:mt-10'>
                    <img className='h-20 w-20 ml-2' src="/order.png" alt="" />
                    <p className='font-bold'>No orders yet</p>
                  </div>
                </div>
                :
                <Quicktable />
              }
            </div>
          </div>
        </div>
      </section >
    </>
  )
}

export default Dashboard