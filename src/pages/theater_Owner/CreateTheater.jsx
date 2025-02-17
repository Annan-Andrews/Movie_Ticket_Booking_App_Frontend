import React from "react";
import CreateTheaterForm from "../../components/theater_Owner/CreateTheaterForm";

const CreateTheater = () => {
  return (
    <main className="container mx-auto px-2">
      <section className="my-8 lg:w-3/4 mx-auto px-1">
        <h2 className="text-center text-2xl font-bold text-slate-100 sm:text-3xl">
          Create New Theater
        </h2>
        <CreateTheaterForm />
      </section>
    </main>
  );
};

export default CreateTheater;
