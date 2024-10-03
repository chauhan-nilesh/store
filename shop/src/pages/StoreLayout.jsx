import React, { useEffect, useState } from 'react';
import { Footer, Header } from '../components'
import { Outlet } from 'react-router-dom';  // Import Outlet from react-router-dom

export default function StoreLayout() {
  const [store, setStore] = useState({});
  const [color1, setColor1] = useState("#000000");
  const [color2, setColor2] = useState("#f2f2f2");
  const [loading, setLoading] = useState(true);

  const subdomain = window.location.hostname;

  const getThemeColor = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/store/subdomain/${subdomain}`);
      if (!response.ok) throw new Error('Failed to fetch store data');
      const data = await response.json();
      setStore(data?.data);
      setColor1(data?.data?.themeColorOne || "#000000");
      setColor2(data?.data?.themeColorTwo || "#f7f7f7");
    } catch (error) {
      console.error('Error fetching store data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getThemeColor();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header store={store} color1={color1} color2={color2} />
      
      {/* Instead of {children}, use <Outlet /> to render nested routes */}
      <main>
        <Outlet />  
      </main>
      
      <Footer store={store} color1={color1} color2={color2} />
    </div>
  );
}
