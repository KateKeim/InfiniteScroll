const productsContainer = document.getElementById('products');
let start = 0;
const limit = 20;

async function fetchProducts(start, limit) {
  try {
    const response = await fetch(`https://api.sampleapis.com/codingresources/codingResources`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem fetching the data:', error);
    return [];
  }
}

function renderProductCard(product) {
  const productElement = document.createElement('div');
  productElement.classList.add('product');
  productElement.innerHTML = `
    <h3>${product.topics}</h3>
    <p>${product.levels}</p>
    <p>${product.description}</p>
  `;
  productsContainer.appendChild(productElement);
}

async function loadProducts() {
  const newProducts = await fetchProducts(start, limit);
  newProducts.forEach(product => {
    renderProductCard(product);
  });
  start += limit;
}

loadProducts();

let isLoading = false;

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    if (!isLoading) {
      isLoading = true;
      fetchProducts(start, limit)
        .then(newProducts => {
          isLoading = false;
          newProducts.forEach(product => {
            renderProductCard(product);
          });
          start += limit;
        });
    }
  }
});
