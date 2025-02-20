document.addEventListener("DOMContentLoaded", async function () {
  const detailsContainer = document.getElementById("item-details");

  if (!detailsContainer) {
    console.error("Error: Element with id 'item-details' not found in the HTML.");
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const itemId = params.get("id");

  console.log("Extracted itemId:", itemId);

  if (!itemId) {
    detailsContainer.innerHTML = "<p>Item not found.</p>";
    return;
  }

  try {
    const response = await fetch(`https://workercloudflare.cdent-989.workers.dev/items?id=${itemId}`);
    const items = await response.json();

    console.log("Fetched items:", items);
    console.log("Type of items:", typeof items);
    console.log("Is items an array?", Array.isArray(items));

    const item = Array.isArray(items) ? items[0] : items; // Fix for API response format

    if (!item || !item.name) {
      detailsContainer.innerHTML = "<p>Item not found.</p>";
      return;
    }

    detailsContainer.innerHTML = `
      <h2>${item.name}</h2>
      <img src="${item.image_url}" alt="${item.name}" width="200">
      <p><strong>Rarity:</strong> ${item.rarity}</p>
      <p><strong>Estimated Value:</strong> $${item.estimated_value.toLocaleString()}</p>
    `;

  } catch (error) {
    console.error("Error fetching item:", error);
    detailsContainer.innerHTML = "<p>Error loading item details.</p>";
  }
});
