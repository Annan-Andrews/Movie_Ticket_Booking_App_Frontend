import React from "react";
import Carousel from "../../components/user/Carousel";
import Movies from "../../components/user/Movies";

const Home = () => {
  return (
    <>
      <section>
        <Carousel />
      </section>
      <section>
        <Movies />
      </section>
    </>
  );
};

export default Home;
