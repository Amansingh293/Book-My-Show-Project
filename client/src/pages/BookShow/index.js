import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getShowById } from "../../services/apicalls/shows";
import { Button, message } from "antd";
import moment from "moment";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { BookShowTickets, MakePayment } from "../../services/apicalls/booking";

const BookShow = () => {
  const params = useParams();
  const user = useSelector((state) => state?.users?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripe_Key =
    "pk_test_51OPotsSF5s0jfRCdjrxBr1daTCzGa5KLipnW4A57lUYk9Zic5QYdVGx5JNkLTAylfcVtXxV90RdWTERg1Z9p9uYG00TJKawvKp";

  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const getShow = async () => {
    dispatch(ShowLoading());
    try {
      const response = await getShowById(params.id);

      if (response.success) {
        setShow(response.data);
      } else {
        message.error(response.message);
      }
      console.log(response.data);
    } catch (error) {
      message.error(error.message);
    }
    dispatch(HideLoading());
  };

  const book = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await BookShowTickets({
        show: params.id,
        seats: selectedSeats,
        transactionId,
        user: user.id,
      });
      console.log(response.data);
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await MakePayment(
        token,
        selectedSeats.length * show.ticketPrice * 100
      );
      if (response.success) {
        message.success(response.message);
        book(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getShow();
  }, []);

  const getSeats = () => {
    const columns = 12;
    const totalSeats = show.totalSeats; // 120
    const rows = Math.ceil(totalSeats / columns); // 10

    return (
      <div className="overflow-auto">
        <div className="line"></div>
        <p className="screen">Screen This Side</p>
        <hr />
        <div className="seatsContainer">
          <hr />
          {Array.from(Array(rows).keys()).map((seat, index) => {
            return (
              <div className="flex gap-1 justify-center">
                {Array.from(Array(columns).keys()).map((column, index) => {
                  const seatNumber = seat * columns + column + 1;
                  let seatClass = "seats";

                  if (selectedSeats.includes(seatNumber)) {
                    seatClass = seatClass + " selected-seat";
                  }

                  if (show.bookedSeats.includes(seatNumber)) {
                    seatClass = seatClass + " booked-seat";
                  }

                  return (
                    seatNumber <= totalSeats && (
                      <div
                        className={seatClass}
                        onClick={(e) => {
                          if (e.target.classList.contains("booked-seat")) {
                            return;
                          }
                          if (selectedSeats.includes(seatNumber)) {
                            setSelectedSeats(
                              selectedSeats.filter(
                                (item) => item !== seatNumber
                              )
                            );
                          } else {
                            setSelectedSeats([...selectedSeats, seatNumber]);
                          }
                        }}
                      >
                        <h1 className="text-sm">{seatNumber}</h1>
                      </div>
                    )
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <>
      {show && (
        <>
          <div className="flex flex-row justify-evenly items-center h-[8em] w-[47rem] md:w-[98vw] p-6 gap-8 border m-4 box-border rounded-lg">
            <div className="flex flex-col justify-evenly items-start w-full gap-5">
              <h1 className="font-medium text-xl"> {show?.theatre?.name}</h1>
              <h1 className="font- text-lg"> {show?.theatre?.address}</h1>
            </div>
            <div className="flex justify-center items-center font-semibold text-[30px] w-full">
              {show?.movie?.name}({show?.movie?.language})
            </div>
            <div className="flex flex-col justify-evenly items-end gap-7 w-full font-semibold text-lg">
              <span>
                {moment(show.date).format("DD-MM-YYYY")} __{" "}
                {moment(show.time).format("HH:MM")}{" "}
                {+moment(show.time).format("HH:MM").slice(0, 2) < 13
                  ? "AM"
                  : "PM"}
              </span>
            </div>
            <div className="flex justify-end items-center w-full">
              {" "}
              <StripeCheckout
                token={onToken}
                stripeKey={stripe_Key}
                currency="INR"
                amount={selectedSeats.length * show.ticketPrice * 100}
              >
                <Button className=" bg-gray-700 text-white text-lg h-[3rem] rounded-lg">
                  Pay To Book
                </Button>
              </StripeCheckout>
            </div>
          </div>

          <div className="flex justify-center items-center w-[50rem] md:w-full h-fit  md:h-fit  p-8 mt-[8rem] md:mt-0 ">
            {getSeats()}
          </div>

          {selectedSeats.length !== 0 && (
            <>
              {" "}
              <div className="flex justify-center items-center h-10 gap-10 p-10">
                <span className="text-lg font-semibold">
                  SelectedSeats : {selectedSeats.join(" , ")}{" "}
                </span>
                <span className="text-xl font-semibold">
                  {" "}
                  Rs : {selectedSeats.length * show.ticketPrice}
                </span>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default BookShow;
