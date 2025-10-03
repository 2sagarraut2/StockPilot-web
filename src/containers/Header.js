import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavigationComponent from "../components/NavigationComponent";
import LogoComponent from "../components/LogoComponent";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setStock } from "../utils/redux/stockSlice";
import { categoryData, stockData } from "../api/stockDetails";
import { setCategory } from "../utils/redux/categorySlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch();

  const getStocks = async () => {
    dispatch(setLoading(true));
    try {
      const res = await stockData();

      if (res.status === 200) {
        const { message, data, total } = res.data;

        if (Array.isArray(data)) {
          dispatch(
            setStock({
              items: data,
              total,
            })
          );
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getStocks();
  }, []);

  // Define the width class once
  const sidebarWidthClass = "w-[220px] min-w-[200px]";
  const buttonOpenLeft = "left-[236px]"; // 220px + 16px (left-4) = 236px

  const getCategories = async () => {
    try {
      dispatch(setStock({ loading: true }));
      const res = await categoryData();

      if (res.status === 200) {
        const { message, data, total } = res.data;

        if (Array.isArray(data)) {
          dispatch(setCategory({ items: data, total, loading: false }));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {/* Mobile Hamburger Button (Adjusted position based on sidebar state) */}
      <button
        className={`
      md:hidden fixed top-20 p-2 bg-indigo-600 text-white z-[1100] rounded
      transition-all duration-300 ease-in-out
      ${isOpen ? "left-[500px]" : "left-4"}
    `}
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[900] md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar - **FIXED** and Responsive Positioning */}
      <div
        className={`top-0 left-0 w-[220px] min-w-[200px] h-screen border border-[#ddd]
      flex flex-col items-center pb-5 shadow-md z-[1000] 
      transition-transform duration-300 ease-in-out

      // Mobile: Slide in/out
      ${isOpen ? "translate-x-0" : "-translate-x-full"} 
      md:relative md:translate-x-0 md:shadow-md
    `}
      >
        <LogoComponent />

        <NavigationComponent />

        <div className={`mt-auto text-sm `}>Made with ❤️ in India</div>
      </div>
    </>
  );
};

export default Header;
