import { useEffect, useRef, useState } from "react";
import MovieCard from "./movieCard";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, Spin } from "antd";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
function HomePage() {
  const movies = useSelector((state) => state.movies);

  const totalResults = useSelector((state) => state.totalResults);
  const url = useSelector((state) => state.url);
  const pageSize = useSelector((state) => state.pageSize);
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrenctPage] = useState(
    searchParams.get("page") === null ? 1 : searchParams.get("page")
  );
  const [errors, setErrors] = useState([]);
  const firstUpdate = useRef(true);
  const [loadingContent, setLoadingContent] = useState(true);

  const handleError = (res) => {
    setErrors((prev) => {
      setLoadingContent(false);
      setCurrenctPage(1);
      return [...prev, { message: res.message }];
    });
  };
  useEffect(() => {
    setErrors([]);

    if (!searchParams.get("page")) {
      //when the URL is changed from "?page=currentPage" to "/"" we set the current page to the first one  in order to change the pagination back to first page

      setCurrenctPage(1);
    }
    //we only want to render this fetch in two cases, only if it is first time to render it or the page value is null (url changed from '?page=...' to /) , we do this to avoid the render of this function when pagination happens because pagination changes the URL query (page)
    (firstUpdate.current || !searchParams.get("page")) &&
      fetch(`${url}/movies?page=${!searchParams.get("page") ? 1 : currentPage}`)
        .then((res) => res.json())
        .then((res) => {
          firstUpdate.current = false;
          if (res.status === 429 && res.limiter) {
            handleError(res);
            return;
          }
          if (res.movies.errors) {
            handleError(res);
            return;
          }
          setLoadingContent(false);
          dispatch({ type: "movies", payload: res });
        })
        .catch((err) => {
          setLoadingContent(false);
          console.log(err);
        });
  }, [searchParams.get("page")]);

  const handlePagination = (page) => {
    setErrors([]);
    setLoadingContent(true);
    setSearchParams({ page });
    fetch(`${url}/movies?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setLoadingContent(false);
        setErrors([]);
        if (res.status === 429 && res.limiter) {
          setErrors((prev) => {
            setLoadingContent(false);
            setCurrenctPage(1);
            return [...prev, { message: res.message }];
          });
          return;
        }
        if (res.movies.errors) {
          setLoadingContent(false);
          dispatch({ type: "resetMovies", payload: [] });
          setErrors((prev) => {
            setCurrenctPage(1);
            return [...prev, { message: res.movies.errors[0] }];
          });
          return;
        }
        dispatch({ type: "movies", payload: res });
      })
      .catch((err) => {
        setLoadingContent(false);
        console.log(err);
      });
  };

  return (
    <>
      <Helmet>
        <title>Movies </title>
        <meta name="description" content="Check a list of the best movies" />
      </Helmet>
      <div className="mt-20 flex flex-col container mx-auto gap-20 items-center">
        <Spin spinning={loadingContent} fullscreen={true} />
        {errors.length > 0 && (
          <div className="flex flex-col container mx-auto gap-10">
            <p className="text-4xl text-center text-white ">
              Error: {errors[0].message}
            </p>
            <p className="text-4xl text-center text-white ">No results found</p>
          </div>
        )}
        <div className=" lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 grid gap-10 h-max sm:px-0 px-10 w-full ">
          {movies.map((movie) => {
            return <MovieCard movie={movie} key={movie.id} />;
          })}
        </div>
        {totalResults && (
          <Pagination
            className="mb-20 bg-white-backdrop w-95% sm:w-full sm:p-5 px-3 py-4 rounded-2xl text-center
      "
            style={{
              color: "white !important",
            }}
            showSizeChanger={false}
            defaultCurrent={currentPage}
            total={totalResults}
            pageSize={pageSize}
            current={currentPage}
            onChange={(e) => {
              handlePagination(e);
              setCurrenctPage(e);
            }}
          />
        )}
      </div>
    </>
  );
}
export default HomePage;
