// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract ProductReviews {
    
    struct Review {
        string productName;
        string reviewText;
    }
    
    mapping (address => Review[]) public reviewsByUser;
    
    function addReview(string memory _productName, string memory _reviewText) public {
        Review memory newReview = Review({
            productName: _productName,
            reviewText: _reviewText
        });
        reviewsByUser[msg.sender].push(newReview);
    }
    
    function getReviewsByUser(address user) public view returns (Review[] memory) {
        return reviewsByUser[user];
    }
    
    function getReviewsByProduct(string memory productName) public view returns (Review[] memory) {
        uint count = 0;
        for (uint i = 0; i < reviewsByUser[msg.sender].length; i++) {
            if (keccak256(bytes(reviewsByUser[msg.sender][i].productName)) == keccak256(bytes(productName))) {
                count++;
            }
        }
        Review[] memory reviews = new Review[](count);
        count = 0;
        for (uint i = 0; i < reviewsByUser[msg.sender].length; i++) {
            if (keccak256(bytes(reviewsByUser[msg.sender][i].productName)) == keccak256(bytes(productName))) {
                reviews[count] = reviewsByUser[msg.sender][i];
                count++;
            }
        }
        return reviews;
    }
}
//ProductReviews deployed to: 0x20389b2b2ac1517Bda44387210aFbFCf66644275