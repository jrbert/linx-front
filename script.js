    
  let nextPage =
    "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?pages=1";

  function formatPrice(price) {
    return parseFloat(price).toFixed(2).replace(".", ",");
  }

  function parseProducts(product) {
    let productHtml = "";
    productHtml += `<li id="product_${product.id}">`;
    productHtml += `<img src="${product.image}" />`;
    productHtml += `<h2>${product.name}</h2>`;
    productHtml += `<p id ="description">${product.description}</p>`

    if (product.oldPrice)
      productHtml += `<p">De: R$ ${formatPrice(product.oldPrice)}</p>`;

      productHtml += `<p id="price">Por: R$ ${formatPrice(product.price)}</p>`;

    if (product.installments)
      productHtml += `<p>Parcelamento: ${
        product.installments.count
      }x de R$ ${formatPrice(product.installments.value)}</p>`;
      
    productHtml += `<button id="buy">Comprar</button>` 
    productHtml += `</li>`;
    
    $("#productContent").append(productHtml)
}

  function mapProducts(response) {
    const newProducts = response.products;

    if (newProducts && newProducts.length > 0) {
      newProducts.map(parseProducts);
    }
  }

  function getProducts() {
    $.get(nextPage, (response) => {
      if (!response.nextPage) {
        $("#button-more-products").fadeOut();
        return false;
      }
      
      nextPage = `https://${response.nextPage}`;
      mapProducts(response);
    });
  }