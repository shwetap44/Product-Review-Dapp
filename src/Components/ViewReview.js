import {useState} from "react";

export default function ViewReview({contract, reviews}) {


    const [filteredReviews, setFilteredReviws] = useState([]);

    const handleSearch = async(event) => {
        event.preventDefault();
        const productName = document.querySelector("#productName").value;
        const response = await contract.getReviewsByProduct(productName);
        // console.log("search successful:", response);
        setFilteredReviws(response);
      }


  return (
    <div className="container mx-auto">
        <div className="my-4">
        <h2 className="text-xl font-bold mb-2">Your Reviews</h2>

          <form className="flex flex-row items-center" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a product name"
            id="productName"
            className="border rounded-l-md px-2 py-1 w-80"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-r-md">
            Search
          </button>
        </form>

        {filteredReviews.length === 0 && reviews.length > 0 &&
          reviews.map((review, index) => (
            <div key={index} className="border p-4 my-2">
              <h3 className="text-lg font-bold mb-2">{review.productName}</h3>
              <p className="text-gray-700">{review.reviewText}</p>
            </div>
          ))
        }
        {filteredReviews.length > 0 &&
          filteredReviews.map((filteredReview, index) => (
            <div key={index} className="border p-4 my-2">
              <h3 className="text-lg font-bold mb-2">{filteredReview.productName}</h3>
              <p className="text-gray-700">{filteredReview.reviewText}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
