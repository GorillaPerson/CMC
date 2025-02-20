document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get("id"); // Get the item ID from the URL

  console.log("Extracted itemId:", itemId); // Debugging step

  if (!itemId) {
    document.getElementById("item-details").innerHTML = "<p>Item not found.</p>";
    return;
  }

  try {
    // Fetch item data from the backend
    const response = await fetch(`https://workercloudflare.cdent-989.workers.dev/items?id=${itemId}`);

    console.log("Fetch response status:", response.status); // Debugging step

    if (!response.ok) {
      throw new Error("Failed to fetch item");
    }

    const items = await response.json();
    console.log("Fetched items:", items); // Debugging step

    if (!Array.isArray(items) || items.length === 0) {
      console.error("No valid items returned from API");
      document.getElementById("item-details").innerHTML = "<p>Item not found.</p>";
      return;
    }

    const item = items[0]; // Assuming only one item is returned
    console.log("Displaying item:", item);

    // Make sure all expected fields exist before displaying
    const itemDetailsContainer = document.getElementById("item-details");
    if (!itemDetailsContainer) {
      console.error("Error: #item-details element not found in HTML.");
      return;
    }

    itemDetailsContainer.innerHTML = `
      <h2>${item.name}</h2>
      <img src="${item.image_url}" alt="${item.name}" width="200">
      <p><strong>Rarity:</strong> ${item.rarity}</p>
      <p><strong>Estimated Value:</strong> $${item.estimated_value.toLocaleString()}</p>
    `;

  } catch (error) {
    console.error("Error fetching item:", error);
    document.getElementById("item-details").innerHTML = "<p>Error loading item details.</p>";
  }
});
