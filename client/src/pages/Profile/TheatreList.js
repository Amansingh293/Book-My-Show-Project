import React, { useEffect, useState } from "react";
import { Table, message, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import TheatreForm from "./TheatreForm";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import {
  deleteTheatre,
  getTheatresByOwnerId,
} from "../../services/apicalls/theatre";
import ShowForm from "./ShowForm";
import { FaCheck, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { getAllMovies } from "../../services/apicalls/movie";

const TheatreList = () => {
  const user = useSelector((state) => state.users?.user);

  const dispatch = useDispatch();

  const [theatres, setTheatres] = useState([]);

  const [formType, setFormType] = useState("Add Details");

  const [showTheatreForm, setShowTheatreForm] = useState(false);

  const [showFormVisible, setShowFormVisible] = useState(false);

  const [editModalData, setEditModalData] = useState({});

  const [allMovies, setAllMovies] = useState([]);

  //below state is to reduce api calls and only triggers when required

  const [triggerRender, setTriggerRender] = useState(false);

  const getTheatresByOwner = async () => {
    dispatch(ShowLoading());
    try {
      const response = await getTheatresByOwnerId(user.id);

      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    dispatch(HideLoading());
  };

  const handleGetAllMovies = async () => {
    dispatch(ShowLoading());
    try {
      const response = await getAllMovies();

      if (response.success) {
        setAllMovies(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    dispatch(HideLoading());
  };

  const handelDeleteTheatre = async (payload) => {
    dispatch(ShowLoading());
    try {
      const response = await deleteTheatre(payload);

      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }

      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
    setTriggerRender(!triggerRender);
  };

  useEffect(() => {
    getTheatresByOwner();
    handleGetAllMovies();
  }, [triggerRender]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "isActive",
      render: (_, rowData) =>
        rowData.isBlocked ? (
          <div className="text-red-700 flex justify-start items-center gap-2">
            Blocked <ImBlocked />
          </div>
        ) : rowData.isActive ? (
          <div className="text-green-600 flex justify-start items-center gap-2">
            Approved <FaCheck />
          </div>
        ) : (
          <div className="text-yellow-500">Pending....</div>
        ),
    },
    {
      title: "Edit Theatre",
      key: "editTheatre",
      render: (_, rowData) => (
        <div className="flex justify-start items-center ml-2.5">
          <FaEdit
            className=" cursor-pointer text-lg"
            onClick={() => {
              console.log(rowData._id);
              setEditModalData(rowData);
              setShowTheatreForm(!showTheatreForm);
              setFormType("Edit Details");
            }}
          />
        </div>
      ),
    },
    {
      title: "Delete Theatre",
      key: "deleteTheatre",
      render: (_, rowData) => (
        <div className="flex justify-start items-center ml-2">
          <Popconfirm
            title="Delete the Theatre"
            description="Are you sure to delete this Theatre?"
            onConfirm={() => handelDeleteTheatre(rowData._id)}
            okType="danger"
          >
            <FaTrash className="text-lg text-red-700 cursor-pointer" />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      {showFormVisible && (
        <ShowForm
          showFormVisible={showFormVisible}
          setShowFormVisible={setShowFormVisible}
          formType={formType}
          allMovies={allMovies}
          theatres={theatres}
        />
      )}

      <div className="flex flex-col items-center h-full gap-5">
        <div className="flex justify-end w-full gap-2">
          {" "}
          <button
            className="w-[10rem] self-end bg-[#3e413e] text-white rounded-xl text-center p-1.5 hover:cursor-pointer text-sm  md:text-base mr-1.5 md:mr-4"
            onClick={() => {
              setEditModalData({});
              setFormType("Add Details");
              setShowTheatreForm(!showTheatreForm);
            }}
          >
            Add Theatre
          </button>
          <button
            className="w-[10rem] self-end bg-[#3e413e] text-white rounded-xl text-center p-1.5 hover:cursor-pointer text-sm  md:text-base mr-1.5 md:mr-4"
            onClick={() => {
              setShowFormVisible(!showTheatreForm);
            }}
          >
            Add Show
          </button>
        </div>

        <Table
          className=" overflow-auto w-[98%]"
          columns={columns}
          dataSource={theatres}
        />
      </div>

      {showTheatreForm && (
        <TheatreForm
          userId={user._id}
          showTheatreForm={showTheatreForm}
          setShowTheatreForm={setShowTheatreForm}
          formType={formType}
          setTriggerRender={setTriggerRender}
          editModalData={editModalData}
          triggerRender={triggerRender}
        />
      )}
    </>
  );
};

export default TheatreList;
