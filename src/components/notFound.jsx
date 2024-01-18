import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function NotFound() {
  // in case the user entered a wrong url
  return (
    <>
      <Helmet>
        <title>Movie Page Not Found</title>
        <meta
          name="description"
          content="Make sure you entered the right URL"
        />
      </Helmet>
      <div className="container mx-auto">
        <h1 className="text-7xl text-center text-white">404 Wrong Page</h1>
        <Link to={"/"}>
          <h2 className="text-5xl text-center text-white cursor-pointer mt-20 hover:text-red-200">
            Click here to return to Home Page
          </h2>
        </Link>
      </div>
    </>
  );
}
export default NotFound;
