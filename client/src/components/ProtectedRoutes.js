import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentuser } from "../services/apicalls/user";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { SetUser } from "../redux/usersSlice";
import { CiLogout } from "react-icons/ci";

const ProtectedRoutes = ({ children }) => {
  const user = useSelector((state) => state?.users?.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await getCurrentuser();
      dispatch(ShowLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
        dispatch(HideLoading());
      } else {
        dispatch(SetUser(null));
        localStorage.removeItem("token");
        dispatch(HideLoading());
        message.error(response.message);
      }
    } catch (err) {
      dispatch(HideLoading());
      console.log(err );
    }
  };

  const logoutHandle = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const profileAdminRoute = () => {
    if (user.isAdmin) {
      navigate("/admin");
    } else {
      navigate("/profile");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {user === undefined ? (
        navigate("/login")
      ) : (
        <>
          <div className="flex items-center justify-between gap-8 h-[10vh] w-[100%] bg-[#474b48] text-gray-200">
            <Link to="/" className="ml-[2%] text-[18px] md:text-[25px] font-medium">
              BOOK MY SHOW {user?.isAdmin ? "(Admin)" : ""}
            </Link>

            <div className="flex justify-evenly items-center w-[50%] h-[70%] md:w-[30%] lg:w-[15%] text-[20px] text-black bg-slate-50 rounded-lg mr-[1%]">
              <div
                className=" box-border p-[1%] md:pl-[4%] md:pr-[4%] md:pt-1 md:pb-1 bg-gray-200 rounded-lg hover: cursor-pointer"
                onClick={profileAdminRoute}
              >
                {user?.name}
              </div>{" "}
              <CiLogout
                className="text-[30px] hover: cursor-pointer"
                onClick={logoutHandle}
              />
            </div>
          </div>
          <div className="h-[85vh]">{children}</div>
        </>
      )}
    </>
  );
};

export default ProtectedRoutes;
