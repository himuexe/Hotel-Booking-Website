import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";
const Header = () => {
  const { isLoggenIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Holidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggenIn ? (
            <>
              <Link className="flex items-center px-3 text-white font-bold hover:bg-blue-600" to="/my-bookings">My Bookings</Link>
              <Link className="flex items-center px-3 text-white font-bold hover:bg-blue-600" to="/my-hotels">My Hotels</Link>
              <SignOutButton/>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
