document.addEventListener("DOMContentLoaded", async function () {
  const itemContainer = document.getElementById("item-list");

  try {
    const response = await fetch("https://workercloudflare.cdent-989.workers.dev/items");
    const items = await response.json();

    console.log("Fetched items:", items); // Debugging log

    if (!Array.isArray(items) || items.length === 0) {
      console.error("No valid items returned from API");
      itemContainer.innerHTML = "<p>No items available.</p>";
      return;
    }

    itemContainer.innerHTML = ""; // Clear any placeholder text

    items.forEach(item => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("item");

      // Ensure each item is clickable and links to the details page
      itemElement.innerHTML = `
        <a href="item.html?id=${item.id}">
          <img src="${item.image_url}" alt="${item.name}" width="100">
          <h3>${item.name}</h3>
          <p>Estimated Value: $${item.estimated_value.toLocaleString()}</p>
        </a>
      `;

      itemContainer.appendChild(itemElement);
    });

  } catch (error) {
    console.error("Error fetching items:", error);
    itemContainer.innerHTML = "<p>Error loading items.</p>";
  }
});
