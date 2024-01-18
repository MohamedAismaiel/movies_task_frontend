import { useEffect, useState } from "react";
import MovieCard from "./movieCard";
import { useSelector, useDispatch } from "react-redux";
import { Pagination, Spin } from "antd";
import { useSearchParams, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
function SearchResults() {
  const { keyword } = useParams();
  const movies = useSelector((state) => state.movies);
  const url = useSelector((state) => state.url);
  const sameSearchKey = useSelector((state) => state.sameSearchKey);
  const totalResults = useSelector((state) => state.totalResults);
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrenctPage] = useState(
    searchParams.get("page") === null ? 1 : searchParams.get("page")
  );
  const pageSize = useSelector((state) => state.pageSize);

  const [loadingContent, setLoadingContent] = useState(true);
  const [errors, setErrors] = useState([]);
  const handleError = (res) => {
    setErrors((prev) => {
      setLoadingContent(false);
      setCurrenctPage(1);
      return [...prev, { message: res.message }];
    });
  };

  useEffect(() => {
    setLoadingContent(true);
    fetch(`${url}/movies/keyword?name=${keyword}&page=${currentPage}`)
      .then((res) => res.json())
      .then((res) => {
        setErrors([]);
        if (res.status === 429 && res.limiter) {
          handleError(res);
          return;
        }
        if (res.movies.errors || res?.movies?.success === false) {
          handleError(res);
          return;
        }
        dispatch({ type: "filter", payload: res });
        setLoadingContent(false);
      });
  }, [keyword]);

  useEffect(() => {
    if (sameSearchKey) {
      handlePagination(1);
      setCurrenctPage(1);
    }
  }, [searchParams.get("page")]);

  const handlePagination = (page) => {
    setLoadingContent(true);
    setSearchParams({ page });
    dispatch({ type: "differentSearchKey" });
    fetch(`${url}/movies/keyword?name=${keyword}&page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setErrors([]);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setLoadingContent(false);
        if (res.status === 429 && res.limiter) {
          handleError(res);
          return;
        }
        if (res.movies.errors) {
          handleError(res);
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
        <title>Movies Search</title>
        <meta name="description" content="Search for the movies you like" />
      </Helmet>
      <div className="mt-20 flex flex-col container mx-auto gap-20 items-center">
        <Spin spinning={loadingContent} fullscreen={true} />
        {errors.length > 0 && (
          <div className="flex flex-col container mx-auto gap-10">
            <p className="text-4xl text-center text-white ">
              Error: {errors[0].message}
            </p>
            <p className="text-4xl text-center text-white ">No Results Found</p>
          </div>
        )}
        {!loadingContent && movies.length === 0 && errors.length === 0 && (
          <p className="mx-auto w-full text-4xl text-center text-white ">
            No Results Found
          </p>
        )}
        <div className=" lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 grid gap-10 h-max sm:px-0 px-10 w-full ">
          {movies.map((movie) => {
            return <MovieCard movie={movie} key={movie.id} />;
          })}
        </div>
        {totalResults && (
          <Pagination
            className="mb-20 bg-white-backdrop w-95% sm:w-full sm:p-5 px-3 py-4 rounded-2xl text-center"
            style={{
              color: "white !important",
            }}
            showSizeChanger={false}
            defaultCurrent={currentPage}
            pageSize={pageSize}
            total={totalResults}
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
export default SearchResults;
