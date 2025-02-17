import React from "react";
import CreateMovieForm from "../../components/theater_Owner/CreateMovieForm";

const CreateMovie = () => {
  return (
    <main className="container mx-auto px-2">
      <section className="my-8 lg:w-3/4 mx-auto px-1">
        <h2 className="text-center text-2xl font-bold text-slate-100 sm:text-3xl">
          Create New Movie
        </h2>
        <CreateMovieForm />
      </section>
    </main>
  );
};

export default CreateMovie;
