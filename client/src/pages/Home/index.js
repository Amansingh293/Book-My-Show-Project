import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../services/apicalls/movie";
import { Card, message } from "antd";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    ShowLoading();
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

    HideLoading();
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <div className="pt-8 flex justify-center items-center">
        <div className="p-2 flex justify-center md:justify-start items-start gap-5 flex-wrap">
          {movies.length !== 0 &&
            movies.map((movie) => {
              const { name, description, duration, poster, language, genre , _id } =
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
