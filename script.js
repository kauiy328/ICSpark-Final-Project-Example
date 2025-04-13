// Function to calculate the tip amount based on user inputs
function calculateTip() {
    // Get the bill amount from the input field with ID "amount"
    var billAmount = parseFloat(document.getElementById('amount').value);
  
    // Check if the bill amount is valid (not empty, not NaN, and greater than zero)
    if (isNaN(billAmount) || billAmount <= 0) {
        // Display an error message in the result section if the input is invalid
        document.getElementById('result').innerHTML = "Please enter a valid bill amount.";
        return; // Stop further execution of the function
    }
  
    // Get the selected restaurant type from the dropdown menu with ID "restaurantType"
    var restaurantType = document.getElementById('restaurantType').value;
  
    // Nested function to fetch the rating value from a group of radio buttons
    function getRating(ratingGroup) {
        // Find all radio button elements belonging to the specified group
        var ratings = document.getElementsByName(ratingGroup);
        for (var i = 0; i < ratings.length; i++) {
            // Check if the current radio button is checked
            if (ratings[i].checked) {
                // Return the value of the selected radio button as a number
                return parseInt(ratings[i].value);
            }
        }
        // Return null if no button in the group is selected
        return null;
    }
  
    // Fetch ratings for service, cleanliness, taste, and value for money
    var serviceRating = getRating('service'); // User rating for service
    var cleanlinessRating = getRating('cleanliness'); // User rating for cleanliness
    var tasteRating = getRating('taste'); // User rating for taste of food
    var valueRating = getRating('valueformoney'); // User rating for value for money
  
    // Validate that all ratings are selected before proceeding
    if (serviceRating === null || cleanlinessRating === null || tasteRating === null || valueRating === null) {
        // Display an error message if any rating is missing
        document.getElementById('result').innerHTML = "Please rate all categories.";
        return; // Stop further execution
    }
  
    // Calculate the average rating from all four categories
    var averageRating = (serviceRating + cleanlinessRating + tasteRating + valueRating) / 4;
  
    // Declare a variable to store the calculated tip percentage
    var tipPercentage;
  
    // Logic for "Regular" restaurant type
    if (restaurantType === 'regular') {
        // Scale the average rating to a percentage range of 0% (poor) to 20% (excellent)
        if (averageRating === 1) {
            tipPercentage = 0; // No tip for the lowest rating
        } else {
            tipPercentage = (averageRating / 5) * 20; // Scale ratings proportionally
        }
    } 
    // Logic for "Fancy" restaurant type
    else if (restaurantType === 'fancy') {
        // Scale the average rating to a percentage range of 5% (poor) to 25% (excellent)
        tipPercentage = 5 + ((averageRating - 1) / 4) * 20; // Fancy restaurants start with a baseline of 5%
    }
  
    // Calculate the tip amount in dollars
    var tipAmount = (billAmount * tipPercentage / 100).toFixed(2); // Tip amount, rounded to two decimal places
  
    // Calculate the final total (bill amount + tip amount)
    var totalAmount = (billAmount + parseFloat(tipAmount)).toFixed(2); // Final total bill, rounded to two decimal places
  
    // Display the calculated tip and total in the result section
    document.getElementById('result').innerHTML =
        "Recommended Tip: " + tipPercentage.toFixed(1) + "%<br>" + // Display the tip percentage
        "Tip Amount: $" + tipAmount + "<br>" + // Display the tip amount in dollars
        "Final Total: $" + totalAmount; // Display the final total bill (including tip)
  }
  