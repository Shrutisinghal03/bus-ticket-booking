// List of cities (you can replace this with your own list)
const cities = ["Chennai","Bangalore","Hyderabad","Mumbai","Coimbatore","Bangalore","Vijayawada","Kochi", "Pune","Delhi","Ahmedabad", "Jaipur","Lucknow","Kolkata","Bhubaneswar","Guwahati","Imphal","Agartala",];

function showSuggestions() {
  const input = document.getElementById('fname');
  console.log(input.value); 
  const typedText = input.value.toLowerCase();
  const suggestionsDiv = document.getElementById('suggestions');
  suggestionsDiv.innerHTML = '';

  if (typedText.length === 0) {
    suggestionsDiv.style.display = 'none';
    return;s
  }

  const matchedCities = cities.filter(city => city.toLowerCase().startsWith(typedText));
  if (matchedCities.length === 0) {
    suggestionsDiv.style.display = 'none';
    return;
  }

  matchedCities.forEach(city => {
    const suggestion = document.createElement('div');
    suggestion.textContent = city;
    suggestion.onclick = () => {
      input.value = city;
      suggestionsDiv.style.display = 'none';
    };
    suggestionsDiv.appendChild(suggestion);
  });

  suggestionsDiv.style.display = 'block';
}

// Close suggestions when clicking outside the input field
document.addEventListener('click', function(event) {
  const suggestionsDiv = document.getElementByClassName('suggestions');
  const input = document.getElementByClassName('place');
  if (!input.contains(event.target) && !suggestionsDiv.contains(event.target)) {
    suggestionsDiv.style.display = 'none';
  }
});
function showSuggestions2() {
  const input = document.getElementById('lname');
  console.log(input.value); 
  const typedText = input.value.toLowerCase();
  const suggestionsDiv = document.getElementById('suggestions');
  suggestionsDiv.innerHTML = '';

  if (typedText.length === 0) {
    suggestionsDiv.style.display = 'none';
    return;s
  }

  const matchedCities = cities.filter(city => city.toLowerCase().startsWith(typedText));
  if (matchedCities.length === 0) {
    suggestionsDiv.style.display = 'none';
    return;
  }

  matchedCities.forEach(city => {
    const suggestion = document.createElement('div');
    suggestion.textContent = city;
    suggestion.onclick = () => {
      input.value = city;
      suggestionsDiv.style.display = 'none';
    };
    suggestionsDiv.appendChild(suggestion);
  });

  suggestionsDiv.style.display = 'block';
}

// Close suggestions when clicking outside the input field
document.addEventListener('click', function(event) {
  const suggestionsDiv = document.getElementByClassName('suggestions');
  const input = document.getElementByClassName('place');
  if (!input.contains(event.target) && !suggestionsDiv.contains(event.target)) {
    suggestionsDiv.style.display = 'none';
  }
});

