import axios from "axios";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { currentUser } from "../slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../slice/productSlice";

const CommentSection = ({ reviews, _id }) => {
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  const dispatch = useDispatch();

  const userData = useSelector(currentUser);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const parts = date.toString().split(" ");
    const month = parts[1];
    const day = parts[2];
    const year = parts[3];
    const time = parts[4];

    const formattedDate = `${month} ${day} ${year}, ${time}`;
    return formattedDate;
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString();
  };

  const reviewData = {
    date: getCurrentDate(),
    rating: newRating,
    comment: newComment,
    reviewerName: userData.username,
  };
  const handleAddReview = () => {
    axios
      .put(`http://localhost:8000/add-review/${_id}`, reviewData)
      .then((res) => {
        dispatch(addReview({ _id, reviewData }));
        console.log(res.data);
      })
      .catch((err) => {
        alert("Fail to add review");
        console.log(err);
      });
    setNewComment("");
    setNewRating(0);
  };

  const sortedReviews = reviews
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Ratings and Reviews</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Average Rating</h3>
        <div className="flex items-center">
          <span className="text-3xl font-bold">{averageRating}</span>
          <div className="flex ml-2">
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar
                key={index}
                className={`h-6 w-6 ${
                  index < Math.round(averageRating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-gray-600">({reviews.length} reviews)</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {sortedReviews.map((review, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar
                    key={index}
                    className={`h-5 w-5 ${
                      index < review.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="ml-2 text-sm text-gray-600">
                @{review.reviewerName}
              </p>
            </div>
            <p className="pb-3 text-sm text-gray-500">
              {formatDate(review.date)}
            </p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Add a Review</h3>
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }, (_, index) => (
            <FaStar
              key={index}
              onClick={() => setNewRating(index + 1)}
              className={`h-6 w-6 cursor-pointer ${
                index < newRating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <textarea
          required
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your review here"
          className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
        ></textarea>
        <button
          onClick={handleAddReview}
          disabled={!newComment || !newRating}
          className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2  disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Review
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
