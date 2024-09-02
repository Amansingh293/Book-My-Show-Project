import React, { useEffect, useState } from "react";
import { getAllMovies, getMovieBySearch } from "../../services/apicalls/movie";
import { Button, Card, message } from "antd";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const Home = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [filterMovies, setFilterMovies] = useState([]);

  const dispatch = useDispatch();
  const getMovies = async () => {
    dispatch(ShowLoading());
    try {
      const response = await getAllMovies();

      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.timeLog(error.message);
    }

    dispatch(HideLoading());
  };

  const movieBySearch = async () => {
    try {
      const response = await getMovieBySearch(searchText);

      if (response.success) {
        setFilterMovies(response.data);
      } else {
        message.error("No movie found!!");
        setFilterMovies([]);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const debounce = useDebounce(movieBySearch, 700);

  useEffect(() => {
    if (searchText == "") {
      getMovies();
    } else {
      debounce();
    }
  }, [searchText]);

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <div className="pt-8 flex flex-col justify-evenly items-center gap-10">
        <div className="flex h-10 w-full justify-center md:justify-end p-2 md:p-4 gap-10 items-center">
          <input
            type="text"
            className="border border-gray-400 rounded-lg w-[80%] md:w-[40%] h-full p-4"
            value={searchText}
            onChange={(e) => {
              console.log(e.target.value);
              setSearchText(e.target.value);
            }}
          />
        </div>
        <div className="p-2 flex justify-center md:justify-evenly items-start gap-5 flex-wrap">
          {(searchText !== "" && filterMovies.length !== 0
            ? filterMovies
            : movies
          ).map((movie) => {
            const {
              name,
              description,
              duration,
              poster,
              language,
              genre,
              _id,
            } = movie;
            return (
              <Card
                key={poster}
                hoverable
                style={{
                  width: 240,
                }}
                className="text-[15px]"
                cover={<img alt="example" src={poster} className="h-[290px]" />}
                onClick={() => navigate(`/movie/${_id}`)}
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
      </div>
    </>
  );
};

export default Home;
