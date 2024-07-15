import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const CommentSection = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      username: "JohnDoe",
      rating: 4,
      text: "Great app, really useful!",
    },
    {
      id: 2,
      username: "JaneSmith",
      rating: 5,
      text: "Excellent app with lots of features.",
    },
    {
      id: 3,
      username: "Alex123",
      rating: 3,
      text: "Good, but could use some improvements.",
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [username, setUsername] = useState("");

  const handleAddReview = () => {
    if (newComment && newRating && username) {
      const newReview = {
        id: Date.now(),
        username,
        rating: newRating,
        text: newComment,
      };
      setReviews([...reviews, newReview]);
      setNewComment("");
      setNewRating(0);
      setUsername("");
    }
  };

  const averageRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  ).toFixed(1);

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
        {reviews.map((review) => (
          <div key={review.id} className="border p-4 rounded-lg shadow-sm">
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
              <p className="ml-2 text-sm text-gray-600">@{review.username}</p>
            </div>
            <p>{review.text}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Add a Review</h3>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your review here"
          className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
        ></textarea>
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
        <button
          onClick={handleAddReview}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Review
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
