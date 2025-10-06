import { useEffect, useState } from "react";
import NavigationComponent from "../components/NavigationComponent";
import LogoComponent from "../components/LogoComponent";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setStock } from "../utils/redux/stockSlice";
import { categoryData, stockData } from "../api/stockDetails";
import { setCategory } from "../utils/redux/categorySlice";
import useStock from "../utils/hooks/useStock";
import useCategory from "../utils/hooks/useCategory";
import useProfile from "../utils/hooks/useProfile";

const Header = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { getStocksfromCustomHook } = useStock();
  const { getCategoriesFromCustomHook } = useCategory();
  const products = useSelector((store) => store.product.products);
  const loggedInUser = useSelector((store) => store.user.user);

  const { getUserProfileData } = useProfile();

  useEffect(() => {
    if (!loggedInUser) {
      getUserProfileData();
    }
  }, []);

  useEffect(() => {
    const limit = 10;
    const page = 1;
    getStocksfromCustomHook(page, limit);
  }, [products]);

  const dispatch = useDispatch();

  // const getStocks = async () => {
  //   dispatch(setLoading(true));
  //   try {
  //     const res = await stockData();

  //     if (res.status === 200) {
  //       const { message, data, total } = res.data;

  //       if (Array.isArray(data)) {
  //         dispatch(
  //           setStock({
  //             items: data,
  //             total,
  //           })
  //         );
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     dispatch(setLoading(false));
  //   }
  // };

  // const getCategories = async () => {
  //   try {
  //     dispatch(setStock({ loading: true }));
  //     const res = await categoryData();

  //     if (res.status === 200) {
  //       const { message, data, total } = res.data;

  //       if (Array.isArray(data)) {
  //         dispatch(setCategory({ items: data, total, loading: false }));
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    const limit = 10;
    const page = 1;
    getCategoriesFromCustomHook(page, limit);
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
