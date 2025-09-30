import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavigationComponent from "../components/NavigationComponent";
import LogoComponent from "../components/LogoComponent";
import Title from "../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { setStock } from "../utils/redux/stockSlice";
import { categoryData, stockData } from "../api/stockDetails";
import { setCategory } from "../utils/redux/categorySlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const getStocks = async () => {
    try {
      dispatch(setStock({ loading: true }));
      const res = await stockData();

      if (res.status === 200) {
        const { message, data, total } = res.data;

        if (Array.isArray(data)) {
          dispatch(setStock({ items: data, total, loading: false }));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStocks();
  }, []);

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
      {/* Mobile Hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 p-2 bg-indigo-600 text-white z-[1100] rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-40 z-[900] md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`top-0 left-0 w-[220px] min-w-[200px] h-screen border border-[#ddd] flex flex-col items-center pt-5 pb-5 shadow-md z-[1000] transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 `}
      >
        <LogoComponent />

        <NavigationComponent />

        <div className={`mt-auto text-sm `}>Made with ❤️ in India</div>
      </div>
    </>
  );
};

export default Header;
