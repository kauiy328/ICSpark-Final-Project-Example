
function calculateTip() {
    var amount = parseFloat(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0) {
      document.getElementById('result').innerHTML = "Please enter a valid bill amount.";
      return;
    }
  
    var restaurantType = document.getElementById('restaurantType').value;
  
    function getRating(groupName) {
      var radios = document.getElementsByName(groupName);
      for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          return Number(radios[i].value);
        }
      }
      return null;
    }
  
    var service = getRating('service');
    var cleanliness = getRating('cleanliness');
    var taste = getRating('taste');
  
    if (service === null || cleanliness === null || taste === null) {
      document.getElementById('result').innerHTML = "Please rate all categories.";
      return;
    }
  
    var avgRating = (service + cleanliness + taste) / 3;
    var tipPercent = 2.5 * avgRating + 7.5;
  
    if (restaurantType === 'fancy') {
      tipPercent *= 1.2; // Increase by 20% for fancy restaurants
    }
  
    var tipAmount = (amount * tipPercent / 100).toFixed(2);
    var finalTotal = (amount + parseFloat(tipAmount)).toFixed(2); // Calculate the final total
  
    document.getElementById('result').innerHTML =
      "Recommended Tip: " + tipPercent.toFixed(1) + "%<br>" +
      "Tip Amount: $" + tipAmount + "<br>" +
      "Final Total: $" + finalTotal;
  }
  
  
  
  