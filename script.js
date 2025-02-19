const apiUrl = 'https://228363d1-ce75-4d23-af8b-73b1ddefc072-00-izqgoetu11vd.picard.replit.dev/items'; // Replace with your actual Replit URL

let itemsData = []; // To store the fetched data

// Fetch items from the backend and display them
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    itemsData = data;
    displayItems(data);
  })
  .catch(error => {
    console.error('Error fetching items:', error);
  });

// Function to display the items
function displayItems(items) {
  const itemsList = document.getElementById('items-list');
  itemsList.innerHTML = ''; // Clear the list before displaying the new items

  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item-card', item.rarity.toLowerCase());  // Add class based on rarity

    itemDiv.innerHTML = `
      <img src="${item.image_url}" alt="${item.name}" width="100" height="100" />
      <h3>${item.name}</h3>
      <p class="item-rarity">${item.rarity}</p>
      <p class="item-price">$${item.estimated_value}</p>
    `;
    itemsList.appendChild(itemDiv);
  });
}

// Function to filter items based on search input
function filterItems() {
  const searchValue = document.getElementById('search-bar').value.toLowerCase();
  const filteredItems = itemsData.filter(item =>
    item.name.toLowerCase().includes(searchValue)
  );
  displayItems(filteredItems);
}
