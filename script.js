function calculateTip() {
  // Get the bill amount from the input
  var billAmount = parseFloat(document.getElementById('amount').value);

  // Check if the bill amount is valid
  if (isNaN(billAmount) || billAmount <= 0) {
      document.getElementById('result').innerHTML = "Please enter a valid bill amount.";
      return;
  }

  // Get the type of restaurant
  var restaurantType = document.getElementById('restaurantType').value;

  // Function to get the selected rating from a group of radio buttons
  function getRating(ratingGroup) {
      var ratings = document.getElementsByName(ratingGroup);
      for (var i = 0; i < ratings.length; i++) {
          if (ratings[i].checked) {
              return parseInt(ratings[i].value);
          }
      }
      return null; // Return null if no rating is selected
  }

  // Get the ratings for service, cleanliness, taste, and value for money
  var serviceRating = getRating('service');
  var cleanlinessRating = getRating('cleanliness');
  var tasteRating = getRating('taste');
  var valueRating = getRating('valueformoney');

  // Check if all ratings are selected
  if (serviceRating === null || cleanlinessRating === null || tasteRating === null || valueRating === null) {
      document.getElementById('result').innerHTML = "Please rate all categories.";
      return;
  }

  // Calculate the average rating
  var averageRating = (serviceRating + cleanlinessRating + tasteRating + valueRating) / 4;

  // Calculate the tip percentage based on the restaurant type
  var tipPercentage;
  if (restaurantType === 'regular') {
      // For regular restaurants, scale average rating from 0% (bad) to 20% (excellent)
      if (averageRating === 1) {
          tipPercentage = 0; // Set tip to 0% for the lowest possible rating
      } else {
          tipPercentage = (averageRating / 5) * 20; // Scale for other ratings
      }
  } else if (restaurantType === 'fancy') {
      // For fancy restaurants, scale average rating from 5% (bad) to 25% (excellent)
      tipPercentage = 5 + ((averageRating - 1) / 4) * 20;
  }

  // Calculate tip and final total
  var tipAmount = (billAmount * tipPercentage / 100).toFixed(2);
  var totalAmount = (billAmount + parseFloat(tipAmount)).toFixed(2);

  // Display the results
  document.getElementById('result').innerHTML =
      "Recommended Tip: " + tipPercentage.toFixed(1) + "%<br>" +
      "Tip Amount: $" + tipAmount + "<br>" +
      "Final Total: $" + totalAmount;
}
