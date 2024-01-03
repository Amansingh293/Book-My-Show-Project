import React, { useEffect, useState } from "react";
import MovieForm from "./MovieForm";
import { addMovie, getAllMovies } from "../../services/apicalls/movie";
import { Card, message } from "antd";
import Meta from "antd/es/card/Meta";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);

  const [showFormModal, setShowFormModal] = useState(false);

  const [editMovieData, setEditMovieData] = useState({});

  const [formType, setFormType] = useState("Add Movie");

  //below state is to reduce api calls and only triggers when required

  const [triggerRender, setTriggerRender] = useState(false);

  const dispatch = useDispatch();

  const handleGetAllMovies = async () => {
    dispatch(ShowLoading());
    try {
      const response = await getAllMovies();

      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log(error.message);
      message.error(error.message);
    }
    dispatch(HideLoading());
  };

  useEffect(() => {
    handleGetAllMovies();
  }, [triggerRender]);

  return (
    <div className="flex flex-col justify-evenly gap-5 p-4 ">
      <button
        className="w-[10rem] self-end bg-[#3e413e] text-white rounded-xl text-center p-1.5 hover:cursor-pointer text-sm  md:text-base mr-1.5 md:mr-4"
        onClick={() => {
          setFormType("Add Movie");
          setShowFormModal(!showFormModal);
          setEditMovieData({});
        }}
      >
        Add Movie
      </button>
      <div className="flex justify-center items-center">
        <div className="flex justify-center md:justify-start items-start gap-6 flex-wrap">
          {movies.length !== 0 &&
            movies.map((movie) => {
              const { name, description, duration, poster, language, genre } =
                movie;
              return (
                <Card
                  key={poster}
                  hoverable
                  style={{
                    width: 240,
                  }}
                  className="text-[15px]"
                  cover={
                    <img alt="example" src={poster} className="h-[290px]" />
                  }
                  onClick={() => {
                    setFormType("Edit Movie");
                    setEditMovieData(movie);
                    setShowFormModal(!showFormModal);
                  }}
                >
                  <Meta
                    title={name}
                    description={description}
                    className="pb-4 font-medium h-[100px] box-border overflow-auto"
                  />
                  <Meta
                    title="Duration"
                    description={`${duration} hrs `}
                    className="pb-4 font-medium h-[70px]"
                  />
                  <Meta
                    title="Genre"
                    description={genre}
                    className="pb-2 font-medium h-[70px]"
                  />
                  <Meta
                    title="Language"
                    description={language}
                    className="pb-2 font-medium h-[70px]"
                  />
                </Card>
              );
            })}
        </div>
            
        {showFormModal && (
          <MovieForm
            showFormModal={showFormModal}
            setShowFormModal={setShowFormModal}
            formType={formType}
            setFormType={setFormType}
            editMovieData={editMovieData}
            triggerRender={triggerRender}
            setTriggerRender={setTriggerRender}
          />
        )}
      </div>
    </div>
  );
};

export default MoviesList;
