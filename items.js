const apiUrl = 'https://workercloudflare.cdent-989.workers.dev/items'; // Your API URL

// Function to get query parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get item ID from URL
const itemId = getQueryParam('id');

if (itemId) {
    fetch(`${apiUrl}?id=${itemId}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                displayItemDetails(data[0]); // Assuming only one result
            } else {
                document.getElementById('item-details').innerHTML = "<p>Item not found.</p>";
            }
        })
        .catch(error => console.error('Error fetching item details:', error));
} else {
    document.getElementById('item-details').innerHTML = "<p>Invalid item.</p>";
}

// Function to display item details
function displayItemDetails(item) {
    const itemDetails = document.getElementById('item-details');
    itemDetails.innerHTML = `
        <h2>${item.name}</h2>
        <img src="${item.image_url}" alt="${item.name}" width="200" height="200" />
        <p><strong>Rarity:</strong> ${item.rarity}</p>
        <p><strong>Estimated Value:</strong> $${item.estimated_value.toLocaleString()}</p>
        <p><strong>Description:</strong> ${item.description || "No description available."}</p>
        <a href="index.html">Back to Items</a>
    `;
}
