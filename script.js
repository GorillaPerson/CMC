const apiUrl = 'https://workercloudflare.cdent-989.workers.dev/items'; // Replace with your actual Replit URL

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

// Function to format number with commas
function formatNumberWithCommas(number) {
  return number.toLocaleString(); // Formats number with commas
}

// Function to display the items
function displayItems(items) {
  const itemsList = document.getElementById("items-list");
  itemsList.innerHTML = ''; 

  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item-card');
    itemDiv.dataset.id = item.id; // Store item ID
    
    // Set the outline color based on the rarity
    const rarityColor = rarityColors[item.rarity] || '#000000'; // Default to black if no match

    itemDiv.style.borderColor = rarityColor; // Set the border color (outline)
    itemDiv.style.cursor = 'pointer'; // Make the div clickable

    // Add click event to redirect to the item details page
    itemDiv.onclick = () => {
      window.location.href = `https://gorillaperson.github.io/McCraftWeb/item.html?id=${item.id}`;
    };

    itemDiv.innerHTML = `
      <img src="${item.image_url}" alt="${item.name}" width="100" height="100" />
      <h3>${item.name}</h3>
      <p class="item-rarity" style="color: ${rarityColor};">${item.rarity}</p> <!-- Rarity text color -->
      <p class="item-price">$${item.estimated_value.toLocaleString()}</p>
    `;

    itemsList.appendChild(itemDiv);  // Append the item div to the items list
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

// Function to handle sorting
function sortItems() {
  const sortOption = document.getElementById('sort-dropdown').value;
  let sortedItems = [...itemsData]; // Create a copy of the items array to sort

  switch (sortOption) {
    case 'price-asc':
      sortedItems.sort((a, b) => a.estimated_value - b.estimated_value);
      break;
    case 'price-desc':
      sortedItems.sort((a, b) => b.estimated_value - a.estimated_value);
      break;
    case 'az':
      sortedItems.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'za':
      sortedItems.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'legendary-to-common':
      const rarityOrder = ['Legendary', 'Epic', 'Rare', 'Uncommon', 'Common'];
      sortedItems.sort((a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity));
      break;
    case 'common-to-legendary':
      sortedItems.sort((a, b) => rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity));
      break;
    default:
      break;
  }

  displayItems(sortedItems);
}
