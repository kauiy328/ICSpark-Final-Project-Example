function calculateTip() {
  // Get the bill amount from the input field with ID "amount"
  var billAmount = parseFloat(document.getElementById('amount').value);

  // Check if the bill amount is valid (not empty, not NaN, and greater than zero)
  if (isNaN(billAmount) || billAmount <= 0) {
      // If invalid, display an error message in the result section
      document.getElementById('result').innerHTML = "Please enter a valid bill amount.";
      return; // Exit the function early to prevent further calculations
  }

  // Get the selected restaurant type from the dropdown menu with ID "restaurantType"
  var restaurantType = document.getElementById('restaurantType').value;

  // Function to fetch the rating value from a group of radio buttons
  function getRating(ratingGroup) {
      // Get all radio button elements that belong to the specified group
      var ratings = document.getElementsByName(ratingGroup);
      for (var i = 0; i < ratings.length; i++) {
          // Check if the current radio button is selected (checked)
          if (ratings[i].checked) {
              // Return the numeric value of the selected radio button
              return parseInt(ratings[i].value);
          }
      }
      // If no radio button is selected, return null
      return null;
  }

  // Fetch individual ratings for service, cleanliness, taste, and value for money
  var serviceRating = getRating('service'); // Service rating group
  var cleanlinessRating = getRating('cleanliness'); // Cleanliness rating group
  var tasteRating = getRating('taste'); // Taste rating group
  var valueRating = getRating('valueformoney'); // Value-for-money rating group

  // Ensure all categories are rated before calculating the tip
  if (serviceRating === null || cleanlinessRating === null || tasteRating === null || valueRating === null) {
      // Display an error message if any category is left unselected
      document.getElementById('result').innerHTML = "Please rate all categories.";
      return; // Exit the function early
  }

  // Calculate the average of the four ratings
  var averageRating = (serviceRating + cleanlinessRating + tasteRating + valueRating) / 4;

  // Declare the variable to store the tip percentage
  var tipPercentage;

  // Determine the tip percentage based on the restaurant type
  if (restaurantType === 'regular') {
      // For regular restaurants, scale the average rating to a range of 0% (bad) to 20% (excellent)
      if (averageRating === 1) {
          tipPercentage = 0; // Set tip percentage to 0% if the average rating is the lowest
      } else {
          tipPercentage = (averageRating / 5) * 20; // Scale average rating proportionally
      }
  } else if (restaurantType === 'fancy') {
      // For fancy restaurants, scale the average rating to a range of 5% (bad) to 25% (excellent)
      tipPercentage = 5 + ((averageRating - 1) / 4) * 20; // Apply scaling formula
  }

  // Calculate the tip amount in dollars
  var tipAmount = (billAmount * tipPercentage / 100).toFixed(2); // Round to two decimal places

  // Calculate the final total (bill amount + tip amount)
  var totalAmount = (billAmount + parseFloat(tipAmount)).toFixed(2); // Round to two decimal places

  // Display the calculated tip and total in the result section
  document.getElementById('result').innerHTML =
      "Recommended Tip: " + tipPercentage.toFixed(1) + "%<br>" + // Tip percentage
      "Tip Amount: $" + tipAmount + "<br>" + // Tip amount in dollars
      "Final Total: $" + totalAmount; // Final total bill (including tip)
}
