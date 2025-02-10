import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{review.userId.name}</h2>
        <p className="text-yellow-500">⭐ {review.rating}/5</p>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          {review.comment}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
