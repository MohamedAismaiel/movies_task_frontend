import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function Header() {
  const { keyword } = useParams(); //searching keyword
  const [searchValue, setSearchValue] = useState(
    keyword === undefined ? "" : keyword
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({ type: "differentSearchKey" });
    if (searchValue.trim().length === 0 && location.pathname !== "/") {
      dispatch({ type: "resetMovies", payload: [] }); //reseting the movies list
      navigate(`/`);
      return;
    }
    if (searchValue.trim().length === 0 && location.pathname === "/") {
      return;
    }
    if (searchValue.trim() === keyword) {
      navigate(`/results/${searchValue}?page=1`); //changing the url to render the first page in case the user searched for same url
      dispatch({ type: "sameSearchKey" });
      return;
    }
    navigate(`/results/${searchValue}`);
  };

  return (
    <>
      <div className="mt-20 flex flex-col container mx-auto gap-20 items-center">
        <Link
          to={"/"}
          onClick={(e) => {
            setSearchValue("");
          }}
          className="text-7xl text-center bg-gradient-to-r from-blue-500 via-red-400 to-indigo-300 bg-clip-text text-transparent cursor-pointer"
        >
          Movies List
        </Link>
        <form className="lg:w-2/4 w-full sm:px-0 px-10" onSubmit={handleSearch}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="border-none block w-full p-4 ps-10  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:dark:focus:border-none focus:outline-none py-5 text-2xl"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                if (e.target.value.trim().length === 0) setSearchValue("");
              }}
              placeholder="Search for movies..."
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-3 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-md px-8 py-3"
            >
              Search
            </button>
          </div>
        </form>
        <h1 className="text-4xl text-white text-center  ">
          {keyword && keyword.length > 0 && `Results for: ${keyword}`}
        </h1>

        <div className="lg:block hidden mt-8 h-px w-full bg-white-backdrop" />
      </div>
      <Outlet />
    </>
  );
}

export default Header;
