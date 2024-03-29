import { Button, Card, DatePicker, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { getShowsByMovieId } from "../../services/apicalls/shows";
import { getMovieById } from "../../services/apicalls/movie";
import moment from "moment";
import { useDispatch } from "react-redux";

const TheatresForMovie = () => {
  const params = useParams();
  // console.log(params);

  const queryDate = new URLSearchParams(window.location.search).get("date");
  const [date, setDate] = useState(queryDate || moment().format("YYYY-MM-DD"));
  const [theatres, setTheatres] = useState([]);

  const dispatch = useDispatch();

  const [movie, setMovie] = useState({});

  const navigate = useNavigate();

  const handleGetShows = async () => {
    dispatch(ShowLoading());
    try {
      console.log(date);
      const response = await getShowsByMovieId({
        movie: params.id,
        date: date,
      });
      if (response.success) {
        setTheatres(response.data);
        console.log(theatres);
      } else {
        message.error(response.message);
        setTheatres([]);
      }
    } catch (error) {
      console.log(error.message);
      setTheatres([]);
    }
    dispatch(HideLoading());
  };

  const handleGetMovieById = async () => {
    dispatch(ShowLoading());
    try {
      const response = await getMovieById(params.id);
      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    dispatch(HideLoading());
  };

  useEffect(() => {
    handleGetMovieById();
  }, []);

  useEffect(() => {
    handleGetShows();
  }, [date]);

  return (
    <>
      {movie.length !== 0 && (
        <div className="flex flex-col justify-start items-center h-full w-full gap-10">
          <div className="flex flex-col md:flex-row justify-evenly items-center md:items-start w-full md:w-[95%] gap-10 h-fit-content mt-6 md:mt-8 p-10 box-border border rounded-lg">
            <img
              src={movie.poster}
              alt="poster"
              className="h-[270px] w-[85%] sm:w-[270px] rounded-xl"
            />

            <div className="flex flex-col justify-center items-start md:items-center gap-6 h-full md:w-[60%] text-lg">
              <h1 className="text-[30px] font-[550] font-serif">
                {/* <span className=" font-bold"> Movie Name : </span> */}
                {movie.name}
              </h1>
              <h2>
                <span className=" font-semibold"> Language : </span>
                {movie.language}
              </h2>
              <h2>
                <span className=" font-semibold"> Release Date : </span>
                {movie.releaseDate?.slice(0, 10)}
              </h2>
              <h2>
                <span className=" font-semibold"> Genre : </span>
                {movie.genre}
              </h2>
            </div>
            <div className="flex justify-start md:justify-end items-center md:w-[20%] h-full">
              <input
                type="date"
                min={moment().format("YYYY-MM-DD")}
                className=" text-lg h-[3.5rem] w-[12rem] border rounded-xl p-4 "
                value={date}
                onChange={(e) => {
                  if (e.target.value >= moment().format("YYYY-MM-DD")) {
                    setDate(e.target.value);
                    navigate(`/movie/${params.id}?date=${e.target.value}`);
                  }
                }}
              />
            </div>
          </div>
          {theatres.length !== 0 && (
            <div className="w-[80%] md:w-[95%] h-auto mt-10 md:mt-0">
              <Card title="Running Shows">
                {theatres.map((theatre) => {
                  return (
                    <Card
                      type="inner"
                      style={{
                        marginTop: 8,
                        marginBottom: 16,
                      }}
                      title={theatre?.name.toUpperCase()}
                      className="flex flex-col font-semibold"
                      key={theatre._id}
                    >
                      <div className="flex justify-between items-center gap-4">
                        {" "}
                        <h2 className="text-sm">
                          {theatre?.address.toUpperCase()}
                        </h2>
                        <div className="flex flex-wrap justify-end w-[70%] ">
                          <span className="flex justify-end items-center gap-6">
                            {theatre.shows.map((show) => {
                              return (
                                <div className="flex justify-between w-full items-center gap-2">
                                  <Button
                                    key={show._id}
                                    className="bg-gray-700 text-white"
                                    onClick={() =>
                                      navigate(`/book-show/${show._id}`)
                                    }
                                  >
                                    {" "}
                                    {moment(show.time).format("HH:MM")}
                                  </Button>
                                  <span>
                                    {" "}
                                    {+moment(show.time)
                                      .format("HH:MM")
                                      .slice(0, 2) < 13
                                      ? "AM"
                                      : "PM"}
                                  </span>
                                </div>
                              );
                            })}
                          </span>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </Card>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TheatresForMovie;
