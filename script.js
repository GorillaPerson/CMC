const apiUrl = 'https://228363d1-ce75-4d23-af8b-73b1ddefc072-00-izqgoetu11vd.picard.replit.dev/items';  // Use your Replit backend URL

fetch(apiUrl)
  .then(response => response.json())  // Parse the JSON response
  .then(data => {
    const itemsList = document.getElementById('items-list');
    data.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.innerHTML = `
        <h3>${item.name}</h3>
        <p>Rarity: ${item.rarity}</p>
        <p>Estimated Price: $${item.price}</p>
      `;
      itemsList.appendChild(itemDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching items:', error);
  });
