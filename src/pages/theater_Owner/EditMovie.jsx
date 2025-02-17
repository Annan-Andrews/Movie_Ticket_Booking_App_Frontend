import React from "react";
import { useParams } from "react-router-dom";
import EditMovieForm from "../../components/theater_Owner/EditMovieForm";

const EditMovie = () => {
  const { movieId } = useParams();

  return (
    <main className="container mx-auto px-2">
      <section className="my-8 lg:w-3/4 mx-auto px-1">
        <h2 className="text-center text-2xl font-bold text-slate-100 sm:text-3xl">
          Edit Movie
        </h2>
        <EditMovieForm movieId={movieId} />
      </section>
    </main>
  );
};

export default EditMovie;
