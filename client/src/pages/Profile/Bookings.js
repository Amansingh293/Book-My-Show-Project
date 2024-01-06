import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetBookingsOfUser } from "../../services/apicalls/booking";
import { Col, Row, message } from "antd";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { Space, Table, Tag } from "antd";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const dispatch = useDispatch();
  
  const getBookingsData = async () => {
    dispatch(ShowLoading());
    try {
      const response = await GetBookingsOfUser();

      if (response.success) {
        setBookings(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      // message.error(error);
    }
    dispatch(HideLoading());
  };

  console.log(bookings);

  const columns = [
    {
      title: "Poster",
      key: "name",
      render: (_, rowData) => (
        <img
          className="w-[10rem] h-[10rem] rounded-lg"
          src={rowData?.show?.movie?.poster}
        />
      ),
    },
    {
      title: "Movie",
      key: "address",
      render: (_, rowData) => <div className="">{rowData.show.movie.name}</div>,
    },
    {
      title: "Theatre",
      key: "theatre",
      render: (_, rowData) => <div>{rowData.show.theatre.name}</div>,
    },
    {
      title: "Address",
      key: "address",
      render: (_, rowData) => (
        <div>{rowData.show.theatre.address.toLowerCase()}</div>
      ),
    },
    {
      title: "Amount",
      key: "amount",
      render: (_, rowData) => (
        <div>
          Rs : {Math.ceil(+rowData.show.ticketPrice * +rowData.seats.length)}
        </div>
      ),
    },
    {
      title: "Seats",
      key: "seats",
      render: (_, rowData) => (
        <div className="w-[10rem]"> {rowData.seats.join(" , ")}</div>
      ),
    },
    {
      title: "BookingId",
      key: "booking",
      render: (_, rowData) => <div className="w-[10rem]"> {rowData._id}</div>,
    },
  ];

  useEffect(() => {
    getBookingsData();
  }, []);

  return (
    <>
      {bookings && (
        <Table
          columns={columns}
          dataSource={bookings}
          className="font-semibold overflow-auto text-lg"
        />
      )}
    </>
  );
};

export default Bookings;
