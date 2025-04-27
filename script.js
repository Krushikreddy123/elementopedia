// script.js

let elements = [];

// Fetch elements from JSON file
fetch('elements.json')
  .then(response => response.json())
  .then(data => {
    elements = data.elements;
  })
  .catch(error => {
    console.error('Error loading elements.json:', error);
  });

function setMode(mode) {
  document.body.classList.toggle('dark-mode', mode === 'dark');
  document.body.classList.toggle('light-mode', mode === 'light');
}

function displayResult(elem) {
  const container = document.getElementById('result-container');

  const reactionsList = elem.reactions?.map(r => `<li>${r}</li>`).join('') || "<li>No reactions available.</li>";
  const usesList = elem.industrialUses?.map(u => `<li>${u}</li>`).join('') || "<li>No industrial uses available.</li>";

  container.innerHTML = `
    <div class="element-card">
      <h2>${elem.name} (${elem.symbol})</h2>
      <p><strong>Atomic Number:</strong> ${elem.atomicNumber}</p>
      <p><strong>Atomic Mass:</strong> ${elem.atomicMass}</p>
      <p><strong>Category:</strong> ${elem.category}</p>
      <p><strong>State:</strong> ${elem.state}</p>
      <p><strong>Discovery Year:</strong> ${elem.discoveryYear}</p>
      <p><strong>Discoverer:</strong> ${elem.discoverer}</p>
      <p><strong>Electron Configuration:</strong> ${elem.electronConfiguration}</p>
      <p><strong>Electronegativity:</strong> ${elem.electronegativity ?? "N/A"}</p>
      <p><strong>Density:</strong> ${elem.density} g/cm³</p>
      <p><strong>Melting Point:</strong> ${elem.meltingPoint} °C</p>
      <p><strong>Boiling Point:</strong> ${elem.boilingPoint} °C</p>
      <p><strong>Color:</strong> ${elem.color}</p>

      <h3>Reactions:</h3>
      <ul>${reactionsList}</ul>

      <h3>Industrial Uses:</h3>
      <ul>${usesList}</ul>

      <div class="links" style="margin-top: 15px;">
        <a href="${elem.googleLink}" target="_blank" class="learn-link">🔎 Learn more on Google</a><br/>
        <a href="${elem.youtubeLink}" target="_blank" class="learn-link">🎥 Watch on YouTube</a>
      </div>
    </div>
  `;
}

function showNotFound(query) {
  const container = document.getElementById('result-container');
  container.innerHTML = `
    <p class="not-found">No element found for “${query}”.</p>
  `;
}

function performSearch() {
  const query = document.getElementById('search-input').value.trim().toLowerCase();
  if (!query) return;

  const found = elements.find(e =>
    e.name.toLowerCase() === query ||
    e.symbol.toLowerCase() === query ||
    e.atomicNumber.toString() === query ||
    e.atomicMass.toString() === query
  );

  found ? displayResult(found) : showNotFound(query);
}

document.getElementById('search-button').addEventListener('click', performSearch);
document.getElementById('search-input').addEventListener('keyup', e => {
  if (e.key === 'Enter') performSearch();
});
