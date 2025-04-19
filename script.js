function calculateTip() {
    // Get the bill amount entered by the user.
    // document.getElementById('amount') finds the input field with id "amount".
    // parseFloat converts the string value from the input into a floating-point number.
    var billAmount = parseFloat(document.getElementById('amount').value);
    
    // Check if the bill amount is not a number (NaN) or less than or equal to 0.
    // This validation ensures that the user enters a positive number.
    if (isNaN(billAmount) || billAmount <= 0) {
        // If the bill amount is invalid, display an error message in the element with id "result".
        document.getElementById('result').innerHTML = "Please enter a valid bill amount.";
        // Exit the function early since further calculations should not proceed.
        return;
    }

    // Define a helper function to retrieve the selected rating from a group of radio buttons.
    // The parameter "ratingGroup" is the name assigned to a set of radio buttons.
    function getRating(ratingGroup) {
        // Get all elements (radio buttons) with the specified name.
        var ratings = document.getElementsByName(ratingGroup);
        // Loop through each radio button in the group.
        for (var i = 0; i < ratings.length; i++) {
            // Check if this specific radio button is selected.
            if (ratings[i].checked) {
                // Return the selected rating as an integer.
                return parseInt(ratings[i].value);
            }
        }
        // If no radio button in the group is selected, return null.
        return null;
    }

    // Retrieve ratings for each category using the getRating function.
    // The parameters 'service', 'cleanliness', 'taste', and 'valueformoney'
    // correspond to the "name" attributes of the radio button groups.
    var serviceRating = getRating('service');         // Rating for service quality.
    var cleanlinessRating = getRating('cleanliness');   // Rating for how clean the restaurant is.
    var tasteRating = getRating('taste');               // Rating for the taste of the food.
    var valueRating = getRating('valueformoney');         // Rating for the value for money.

    // Check if the user has rated all the necessary categories.
    // If any of the ratings is null, prompt the user to rate all categories.
    if (serviceRating === null || cleanlinessRating === null || tasteRating === null || valueRating === null) {
        document.getElementById('result').innerHTML = "Please rate all categories.";
        return;
    }

    // Calculate the average rating from the four categories.
    var averageRating = (serviceRating + cleanlinessRating + tasteRating + valueRating) / 4;

    // Calculate the tip percentage based on the average rating.
    // For a regular restaurant, a perfect score (5) leads to a maximum tip of 20%.
    // The tip percentage is calculated by scaling the average rating to the 20% maximum.
    var tipPercentage = (averageRating / 5) * 20;
    
    // If the average rating is the lowest possible (1), set the tip percentage to 0%.
    if (averageRating === 1) {
        tipPercentage = 0;
    }
    
    // Calculate the tip amount by multiplying the bill amount by the tip percentage.
    // Divide the tipPercentage by 100 to convert the percentage to a decimal value.
    // .toFixed(2) formats the result to two decimal places.
    var tipAmount = (billAmount * tipPercentage / 100).toFixed(2);
    
    // Calculate the total amount by adding the tip amount to the original bill amount.
    // Number(tipAmount) ensures the tipAmount is treated as a number.
    var totalAmount = (billAmount + Number(tipAmount)).toFixed(2);

    // Display the calculated tip percentage, tip amount, and total amount on the webpage.
    // The innerHTML of the element with id "result" is updated with these values.
    document.getElementById('result').innerHTML =
        "Recommended Tip: " + tipPercentage.toFixed(1) + "%<br>" +
        "Tip Amount: $" + tipAmount + "<br>" +
        "Final Total: $" + totalAmount;
}
