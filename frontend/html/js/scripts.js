const produtos = [
    {
        id: 1,
        name: "Café Moído Premium",
        description: "Café 100% arábica moído na hora.",
        price: 29.90,
        image: "imagens/moido.png",
        tags: ["Tradicional"]
    },
    {
        id: 2,
        name: "Cápsulas de Café Intenso",
        description: "Cápsulas compatíveis com máquinas Nespresso.",
        price: 35.90,
        image: "imagens/capsula.png",
        tags: ["Tradicional", "Forte"]
    },
    {
        id: 3,
        name: "Cafeteira Italiana",
        description: "Cafeteira estilo Moka para espresso encorpado.",
        price: 99.90,
        image: "imagens/cafeteira.png",
        tags: ["Especial"]
    }
];

function carregarProdutos() {
    const listaProdutos = document.getElementById("product-list");

    produtos.forEach(produto => {
        const tagsHTML = produto.tags.map(tag => `<span class="tag">${tag}</span>`).join("");
        listaProdutos.innerHTML += `
            <div class="product">
                <img src="${produto.image}" alt="${produto.name}">
                <div class="product-tags">${tagsHTML}</div>
                <h3>${produto.name}</h3>
                <p>${produto.description}</p>
                <div class="product-footer">
                    <span class="price">R$ ${produto.price.toFixed(2)}</span>
                    <input type="number" value="1" min="1" class="quantity">
                    <button class="buy-button">🛒</button>
                </div>
            </div>
        `;
    });
}

window.onload = carregarProdutos;
