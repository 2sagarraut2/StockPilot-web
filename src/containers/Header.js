import { useEffect, useState } from "react";
import NavigationComponent from "../components/NavigationComponent";
import LogoComponent from "../components/LogoComponent";
import { useDispatch, useSelector } from "react-redux";
import { setStock } from "../utils/redux/stockSlice";
import { setCategory } from "../utils/redux/categorySlice";
import useStock from "../utils/hooks/stock/useStock";
import useCategory from "../utils/hooks/category/useCategory";
import useProfile from "../utils/hooks/user/useProfile";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getStocksfromCustomHook } = useStock();
  const { getCategoriesFromCustomHook } = useCategory();
  const { getUserProfileData } = useProfile();

  const loggedInUser = useSelector((store) => store.user.user);
  const dispatch = useDispatch();

  // Parallel data fetching on mount
  useEffect(() => {
    if (!loggedInUser) {
      getUserProfileData();
    }

    const limit = 10;
    const page = 1;

    // Fetch stock and category in parallel
    (async () => {
      try {
        await Promise.all([
          getStocksfromCustomHook(page, limit),
          getCategoriesFromCustomHook(page, limit),
        ]);
      } catch (err) {
        console.error("Error fetching header data:", err);
      }
    })();
  }, []);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className={`
          md:hidden fixed top-4 left-4 p-2 bg-indigo-600 text-white z-[1100] rounded
          transition-all duration-300 ease-in-out
          ${isOpen ? "left-[230px]" : "left-4"}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[900] md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 w-[220px] min-w-[200px] h-screen border border-[#ddd]
          flex flex-col items-center pb-5 shadow-md z-[1000] 
          transition-transform duration-300 ease-in-out bg-white
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:relative md:translate-x-0 md:shadow-md
        `}
      >
        <LogoComponent isOpen={isOpen} setIsOpen={setIsOpen} />

        <NavigationComponent isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="mt-auto text-sm">Made with ❤️ in India</div>
      </div>
    </>
  );
};

export default Header;
