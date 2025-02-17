import React from "react";
import { useParams } from "react-router-dom";
import EditTheaterForm from "../../components/theater_Owner/EditTheaterForm";


const EditTheater = () => {
  const { theaterId } = useParams();

  return (
    <main className="container mx-auto px-2">
      <section className="my-8 lg:w-3/4 mx-auto px-1">
        <h2 className="text-center text-2xl font-bold text-slate-100 sm:text-3xl">
          Edit Theater
        </h2>
        <EditTheaterForm theaterId={theaterId} />
      </section>
    </main>
  );
};

export default EditTheater;
