import React from "react";
import ReviewCard from "./ReviewCard";
import useFetch from "../../hooks/useFetch";
import Skeleton from "../shared/Skeleton";

const Reviews = ({ movieId }) => {
  const [reviews, isLoading, error] = useFetch(
    `/review/get-movie-reviews/${movieId}`
  );

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <h3 className="text-center text-2xl font-bold sm:text-3xl">
        User Reviews
      </h3>

      {reviews?.length > 0 ? (
        isLoading ? (
          <Skeleton />
        ) : (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
            {reviews.map((review) => (
              <div key={review._id} className="flex justify-center">
                <ReviewCard review={review} />
              </div>
            ))}
          </section>
        )
      ) : (
        <p className="text-center mt-4">No reviews yet.</p>
      )}
    </div>
  );
};

export default Reviews;
