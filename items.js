document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get("id"); // Get the item ID from the URL

  console.log("Extracted itemId:", itemId); // Debugging step

  if (!itemId) {
    document.getElementById("item-details").innerHTML = "<p>Item not found.</p>";
    return;
  }

  try {
    // Make sure this matches your actual API endpoint
    const response = await fetch(`https://workercloudflare.cdent-989.workers.dev/items?id=${itemId}`);

    console.log("Fetch response status:", response.status); // Debugging step

    if (!response.ok) {
      throw new Error("Failed to fetch item");
    }

    const items = await response.json();
    console.log("Fetched items:", items); // Debugging step

    if (!items.length) {
      document.getElementById("item-details").innerHTML = "<p>Item not found.</p>";
      return;
    }

    const item = items[0]; // Assuming only one item is returned
    document.getElementById("item-details").innerHTML = `
      <h2>${item.name}</h2>
      <img src="${item.image_url}" alt="${item.name}" width="200">
      <p>Rarity: ${item.rarity}</p>
      <p>Estimated Value: $${item.estimated_value.toLocaleString()}</p>
    `;

  } catch (error) {
    console.error("Error fetching item:", error);
    document.getElementById("item-details").innerHTML = "<p>Error loading item details.</p>";
  }
});
