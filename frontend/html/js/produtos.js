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
        listaProdutos.innerHTML += `
            <div class="product">
                <img src="${produto.image}" alt="${produto.name}">
                <h3>${produto.name}</h3>
                <p>${produto.description}</p>
                <div class="product-footer">
                    <span class="price">R$ ${produto.price.toFixed(2).replace(".", ",")}</span>
                    <input type="number" id="quantidade-${produto.id}" value="1" min="1" class="quantity">
                    <button class="buy-button" onclick="adicionarAoCarrinho(${produto.id})">🛒 Adicionar</button>
                </div>
            </div>
        `;
    });
}

function adicionarAoCarrinho(id) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let produto = produtos.find(p => p.id === id);

    if (!produto) {
        console.error("Produto não encontrado!");
        return;
    }

    let quantidade = parseInt(document.getElementById(`quantidade-${id}`).value) || 1;

    let itemNoCarrinho = carrinho.find(item => item.id === id);

    if (itemNoCarrinho) {
        itemNoCarrinho.quantidade += quantidade;
    } else {
        carrinho.push({ id: produto.id, name: produto.name, price: produto.price, image: produto.image, quantidade });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    // Exibir o popup de sucesso
    mostrarPopup(`${quantidade}x ${produto.name} foi adicionado ao carrinho! 🛒`);
}

function mostrarPopup(mensagem) {
    // Criando o popup modal
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <div class="popup-content">
            <span class="close-btn" onclick="fecharPopup()">×</span>
            <p>${mensagem}</p>
        </div>
    `;
    document.body.appendChild(popup);

    // Fechar o popup após 3 segundos
    setTimeout(() => {
        fecharPopup();
    }, 3000);
}

function fecharPopup() {
    const popup = document.querySelector('.popup');
    if (popup) {
        popup.remove();
    }
}

document.addEventListener("DOMContentLoaded", carregarProdutos);
