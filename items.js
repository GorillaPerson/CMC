document.addEventListener("DOMContentLoaded", async function () {
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get("id");

  if (!itemId) {
    document.getElementById("item-details").innerHTML = "<p>Item not found.</p>";
    return;
  }

  try {
    const response = await fetch(`https://workercloudflare.cdent-989.workers.dev/items?id=${itemId}`);
    if (!response.ok) throw new Error("Failed to fetch item");

    const items = await response.json();
    const item = items.length ? items[0] : null;

    if (!item) {
      document.getElementById("item-details").innerHTML = "<p>Item not found.</p>";
      return;
    }

    document.getElementById("item-details").innerHTML = `
      <h2>${item.name}</h2>
      <img src="${item.image_url}" alt="${item.name}" width="200">
      <p>Rarity: ${item.rarity}</p>
      <p>Estimated Value: $${item.estimated_value.toLocaleString()}</p>
    `;
  } catch (error) {
    console.error(error);
    document.getElementById("item-details").innerHTML = "<p>Error loading item details.</p>";
  }
});
