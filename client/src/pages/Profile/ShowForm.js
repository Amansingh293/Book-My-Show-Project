import React, { useRef } from "react";

import {
  Form,
  Modal,
  Input,
  message,
  Button,
  Row,
  Col,
  Popconfirm,
  DatePicker,
  TimePicker,
} from "antd";

import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { addShow } from "../../services/apicalls/shows";
import moment from "moment";
import { current } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const ShowForm = ({
  formType,
  showFormVisible,
  setShowFormVisible,
  allMovies,
  theatres,
}) => {

  const dispatch = useDispatch();
  const handleAddShow = async (payload) => {
    dispatch(ShowLoading);
    let dateObj = moment(payload.date);
    const formattedDate = dateObj.format("YYYY-MM-DD");

    try {
      payload = { ...payload, date: formattedDate };
      console.log(payload, formattedDate);
      const selectedMovie = allMovies.find(
        (movie) => movie.name === movieIdRef.current.value
      );
      const selectedTheatre = theatres.find(
        (theatre) => theatre.name === theatreIdRef.current.value
      );

      payload = {
        ...payload,
        movie: selectedMovie._id,
        theatre: selectedTheatre._id,
      };

      const response = await addShow(payload);

      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      console.log(error.message);
      message.error(error.message);
    }
    dispatch(HideLoading());
    setShowFormVisible(!showFormVisible);
  };

  const movieIdRef = useRef(null);
  const theatreIdRef = useRef(null);

  return (
    <div className="flex justify-center items-center h-fit w-full">
      <Modal
        title="Add Show"
        open={showFormVisible}
        footer={null}
        onCancel={() => setShowFormVisible(!showFormVisible)}
        className=" flex justify-center items-center md:w-[30rem]"
      >
        <Form
          onFinish={handleAddShow}
          //   initialValues={editMovieData}
          className=" md:w-[30rem] flex flex-col gap-1 md:gap-2 flex-nowrap justify-evenly p-7 box-border "
        >
          <Form.Item
            name="name"
            label="Show Name"
            className="w-[15rem] md:w-auto"
            rules={[
              {
                required: true,
                message: "Enter Show Name!",
              },
            ]}
          >
            <Input placeholder="Show Name" type="text" className="w-[60%]" />
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            className="w-[18rem] md:w-auto"
            rules={[
              {
                required: true,
                message: "Enter Show Date!",
              },
            ]}
          >
            <DatePicker
              disabledDate={(current) =>
                current && current < moment().startOf("day")
              }
            />
          </Form.Item>

          <Form.Item
            name="time"
            label="Time"
            rules={[
              {
                required: true,
                message: "Enter Show Time!",
              },
            ]}
          >
            <TimePicker format={"HH:mm"} />
            {/* <Input placeholder="Time" type="time" className="w-[30%]" /> */}
          </Form.Item>

          <Form.Item
            label="Ticket Price"
            name="ticketPrice"
            rules={[
              {
                required: true,
                message: "Enter Ticket Price!",
              },
            ]}
          >
            <Input placeholder="Price" type="text" className="w-[30%]" />
          </Form.Item>

          <Form.Item
            label="Total Seats"
            name="totalSeats"
            rules={[
              {
                required: true,
                message: "Enter Total Seats!",
              },
            ]}
          >
            <input
              type="number"
              className=" border rounded-lg p-[2%] md:p-1 w-[30%]"
            />
          </Form.Item>

          <Form.Item
            label="Movie"
            name="movie"
            className="w-[18rem] md:w-auto"
            rules={[
              {
                required: true,
                message: "Select Movie !",
              },
            ]}
          >
            <select
              name=""
              id=""
              className=" border rounded-lg p-[2%] md:p-1 w-[40%]"
              ref={movieIdRef}
            >
              <option value="">Select Movie</option>
              {allMovies.length !== 0 &&
                allMovies.map(({ name, _id }) => {
                  return (
                    <option key={_id} value={name}>
                      {name}
                    </option>
                  );
                })}
            </select>
          </Form.Item>

          <Form.Item
            label="Theatre"
            name="theatre"
            className="w-[18rem] md:w-auto"
            rules={[
              {
                required: true,
                message: "Select Theatre !",
              },
            ]}
          >
            <select
              name=""
              id=""
              className=" border rounded-lg p-[2%] md:p-1 w-[40%]"
              ref={theatreIdRef}
            >
              <option value="">Select Theatre</option>
              {theatres.length !== 0 &&
                theatres.map(({ name, _id, isBlocked }) => {
                  return (
                    !isBlocked && <option key={_id} value={name}>
                      {name}
                    </option>
                  );
                })}
            </select>
          </Form.Item>

          <div className="flex items-center justify-end gap-4">
            <Button
              className="flex justify-center items-center bg-[#474b48] rounded-xl text-white p-4"
              htmlType="submit"
            >
              Submit
            </Button>
            <Button
              className="flex justify-center items-center bg-red-300 rounded-xl  p-4"
              onClick={() => {
                setShowFormVisible(!showFormVisible);
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ShowForm;
//   const handleEditMovie = async (payload) => {
//     dispatch(ShowLoading);
//     try {
//       payload = { ...payload, _id: editMovieData._id };
//       const response = await editMovie(payload);

//       if (response.success) {
//         message.success(response.message);
//       } else {
//         message.error(response.error);
//       }
//     } catch (error) {
//       message.error(error.message);
//     }
//     dispatch(HideLoading());
//     setShowFormModal(!showFormModal);
//     setTriggerRender(!triggerRender);
//   };

//   const handelDeleteMovie = async (payload) => {
//     try {
//       const response = await deleteMovie(payload);

//       if (response.success) {
//         message.success(response.message);
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       message.error(error.message);
//     }
//     dispatch(HideLoading());
//     setTriggerRender(!triggerRender);
//     setShowFormModal(!showFormModal);
//   };
