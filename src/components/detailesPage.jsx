import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function DetailesPage() {
  const { id } = useParams(); // movie id
  const details = useSelector((state) => state.detailedMovie);
  const url = useSelector((state) => state.url);
  const dispatch = useDispatch();
  const [error, setError] = useState([]);

  useEffect(() => {
    fetch(`${url}/movies/details?id=${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res?.movie?.success === false) {
          //check if id does not exist
          setError((prev) => {
            return [...prev, { message: res.movie.status_message }];
          });
          dispatch({ type: "detailedMovie", payload: res });
          return;
        }
        dispatch({ type: "detailedMovie", payload: res });
      });
  }, [id]);

  return details === null ? (
    <>
      <Helmet>
        <title>Details Page</title>
        <meta name="description" content="Check your favorite movie details" />
      </Helmet>
    </>
  ) : error.length > 0 ? (
    <>
      <Helmet>
        <title>Details Page</title>
        <meta name="description" content="Check your favorite movie details" />
      </Helmet>
      <div className="p-10  mt-0 w-screen h-screen   relative">
        <Link
          to={"/"}
          onClick={(e) => {
            dispatch({ type: "resetMovies", payload: [] });
          }}
          className="w-full text-5xl text-white   z-20 cursor-pointer "
        >
          Movies List
        </Link>
        <p className="text-4xl mt-44 text-center text-white ">
          Error: {error[0].message}
        </p>
      </div>
    </>
  ) : (
    <>
      <Helmet>
        <title>Details Page</title>
        <meta name="description" content="Check your favorite movie details" />
      </Helmet>
      <div className="mt-0 w-screen  h-full relative">
        <Link
          to={"/"}
          onClick={(e) => {
            dispatch({ type: "resetMovies", payload: [] });
          }}
          className="text-5xl text-white  absolute top-0 left-10 mt-10 z-20 cursor-pointer"
        >
          Movies List
        </Link>

        <div
          className=" relative bg-cover lg:bg-repeat lg:bg-contain bg-no-repeat bg-top w-full"
          style={
            details
              ? details.poster_path === null
                ? {
                    backgroundImage: `url(https://i.postimg.cc/x8nmXF22/image-Placeholder.png)`,
                    height: "50vh",
                  }
                : {
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${details.poster_path})`,
                    height: "50vh",
                  }
              : {}
          }
        >
          <div
            className="absolute bg-black-backdrop top-0 right-0 z-10 w-full flex items-center justify-center"
            style={{
              height: "50vh",
            }}
          ></div>
        </div>
        <div className="flex container lg:flex-row flex-col mx-auto z-30 gap-10 h-full lg:-translate-y-20 relative">
          <div className=" lg:order-1 order-2 lg:w-3/12 w-full flex  flex-col h-128 lg:px-0 px-10 ">
            <LazyLoadImage
              effect="blur"
              className="lg:block hidden w-full lg:h-96 h-full aspect-ratio  cursor-pointer duration-300 rounded-xl "
              alt={`${details.title} movie picture`}
              src={
                details.backdrop_path === null
                  ? "https://i.postimg.cc/x8nmXF22/image-Placeholder.png"
                  : `https://image.tmdb.org/t/p/w500/${details.backdrop_path}`
              }
            />
            <div className="lg:block hidden mt-8 h-px w-full bg-white-backdrop" />
            <p className="text-3xl tracking-wide leading-relaxed text-white mt-8 border-b-2 w-max pr-8">
              Rating
            </p>
            <p className="text-2xl tracking-wide leading-relaxed text-white mt-5">
              {((details.vote_average / 10) * 100).toFixed(1)}% (
              {`${details.vote_count}`.length <= 6
                ? `${(details.vote_count / 1000).toFixed(2)}k `
                : `${(details.vote_count / 1000000).toFixed(2)}M `}
              votes)
            </p>
            <div className="mt-8 h-px w-full bg-white-backdrop" />
            <p className="text-3xl tracking-wide leading-relaxed text-white mt-8 border-b-2 w-max pr-8">
              Genres
            </p>
            <div className="flex gap-1">
              <div className="flex flex-wrap gap-2">
                {details?.genres?.map((item, i) => (
                  <p
                    key={i}
                    className="text-2xl tracking-wide leading-relaxed w-max text-white mt-5"
                  >
                    {item.name} {details.genres.length !== i + 1 && "/"}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-8 h-px w-full bg-white-backdrop" />
          </div>
          <div className=" lg:order-2 order-1 flex flex-col lg:w-9/12 w-full lg:mt-0 mt-10 px-10 ">
            <div className=" text-5xl flex items-center gap-5 text-white">
              <p>{details.title}</p>
              <p>({dayjs(details.release_date).format("DD/MM/YYYY")})</p>
            </div>
            <div className=" flex  justify-between">
              <h2 className="text-4xl  text-white mt-20">Overview</h2>
              <h2 className="text-4xl  text-white mt-20">
                Age: {details.adult ? "+18" : "+8"}
              </h2>
            </div>
            <div className="mt-8 h-px w-full bg-white-backdrop" />
            <p className="text-3xl tracking-wide leading-relaxed text-white mt-8">
              {details.overview}
            </p>
            <div className="mt-8 h-px w-2/4 mx-auto bg-white-backdrop" />
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailesPage;
