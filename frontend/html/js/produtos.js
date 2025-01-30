// Lista de produtos disponíveis
const produtos = [
    { id: 1, name: "Café Moído", price: 18.00, image: "moido.png", description: "Grãos frescos e moídos na hora, para um café com sabor intenso." },
    { id: 2, name: "Cápsulas de Café", price: 25.00, image: "capsula.png", description: "Praticidade e sabor em cada cápsula, ideal para quem ama um café rápido." },
    { id: 3, name: "Cafeteira Elétrica", price: 150.00, image: "cafeteira.png", description: "Com design moderno, essa cafeteira vai facilitar seu dia a dia." }
];

// Carregar os produtos na página
function carregarProdutos() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Limpa antes de carregar

    produtos.forEach(produto => {
        const productHTML = `
            <div class="product">
                <img src="imagens/${produto.image}" alt="${produto.name}">
                <h3>${produto.name}</h3>
                <p>${produto.description}</p>
                <div class="product-footer">
                    <span class="price">R$ ${produto.price.toFixed(2)}</span>
                    <button class="buy-button" onclick="adicionarAoCarrinho(${produto.id}, '${produto.name}', ${produto.price}, '${produto.image}')">Adicionar ao Carrinho</button>
                </div>
            </div>
        `;
        productList.innerHTML += productHTML;
    });
}

// Adicionar um produto ao carrinho
function adicionarAoCarrinho(id, name, price, image) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ id, name, price, image, quantidade: 1 });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`${name} foi adicionado ao carrinho! 🛒`);
}

// Carregar os produtos ao abrir a página
document.addEventListener("DOMContentLoaded", carregarProdutos);
