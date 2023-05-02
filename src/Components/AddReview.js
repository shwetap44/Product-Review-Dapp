import {useState, useEffect} from "react";
import ViewReview from './ViewReview';

export default function AddReview({contract, account}) {

    const [productName, setProductName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [reviews, setReviews] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          if(productName && reviewText){
            await contract.addReview(productName, reviewText);
            // console.log("review has been added:", productName, reviewText);
            setReviews([...reviews, { productName, reviewText }]);
            setProductName('');
            setReviewText('');
          }
          else{
            alert("Please enter productname and review text");
          }
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(()=> {
        const fetchReviews = async () => {
          if(contract) {
            try {
              const response = await contract.getReviewsByUser(account);
              setReviews(response);
            } catch (error) {
              console.error(error);
            }
          }
        };
        contract && fetchReviews();
      })

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
      };
    
      const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
      };

  return (
    <div className="container mx-auto">
        <form onSubmit={handleSubmit} className="my-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="product-name">
            Product Name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product-name"
            type="text"
            value={productName}
            onChange={handleProductNameChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="review-text">
            Review
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="review-text"
            rows="4"
            value={reviewText}
            onChange={handleReviewTextChange}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Review
          </button>
        </div>
      </form>
      <ViewReview contract = {contract} reviews={reviews}></ViewReview>
    </div>
  )
}
