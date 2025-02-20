document.addEventListener("DOMContentLoaded", async function () {
  const itemsContainer = document.getElementById("items-list");

  try {
    const response = await fetch("https://workercloudflare.cdent-989.workers.dev/items");
    const items = await response.json();
    console.log("Fetched items:", items);

    itemsContainer.innerHTML = ""; // Clear previous content

    items.forEach(item => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("item");

      // Create the clickable link
      itemElement.innerHTML = `
        <a href="item.html?id=${item.id}">
          <div class="item-box" style="border-color: ${getRarityColor(item.rarity)};">
            <img src="${item.image_url}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.rarity}</p>
            <p>Value: $${item.estimated_value.toLocaleString()}</p>
          </div>
        </a>
      `;

      itemsContainer.appendChild(itemElement);
    });

  } catch (error) {
    console.error("Error fetching items:", error);
    itemsContainer.innerHTML = "<p>Failed to load items.</p>";
  }
});

// Function to return color based on rarity
function getRarityColor(rarity) {
  const colors = {
    "Common": "gray",
    "Uncommon": "lightgreen",
    "Rare": "blue",
    "Epic": "purple",
    "Legendary": "gold",
    "Special": "red"
  };
  return colors[rarity] || "white";
}
