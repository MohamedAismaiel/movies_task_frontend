import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
function MovieCard({ movie }) {
  return (
    <Link
      // to navigate to the detailed page of the movie
      to={`/movies/${movie.id}`}
      className="group md:hover:-translate-y-6 ease-in-out duration-300 md:h-100 h-80 sm:w-full w-full mx-auto rounded-2xl  relative "
    >
      <LazyLoadImage
        effect="blur"
        width={"100%"}
        height={"100%"}
        alt={`${movie.title} movie`}
        className="  w-full h-full aspect-square  cursor-pointer duration-300 rounded-2xl "
        src={
          movie.backdrop_path === null
            ? `https://i.postimg.cc/x8nmXF22/image-Placeholder.png`
            : `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
        }
      />
      <div className="bg-black-backdrop w-full absolute bottom-0 left-0 right-0 m-auto py-5 block sm:hidden">
        <p className=" text-white text-center text-4xl">{movie.title}</p>
      </div>
      <div className=" hidden opacity-0 hover:opacity-70  w-full h-full bg-black inset-y-0 inset-x-0 m-auto  absolute md:flex justify-center items-center cursor-pointer duration-500 rounded-2xl  ">
        <p className=" text-white text-center text-4xl">{movie.title}</p>
      </div>
    </Link>
  );
}
export default MovieCard;
