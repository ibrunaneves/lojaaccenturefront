function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const cartContainer = document.getElementById("cart-items");
    const subtotalContainer = document.getElementById("subtotal");
    const totalContainer = document.getElementById("total-price");

    cartContainer.innerHTML = ""; // Limpa antes de renderizar

    if (carrinho.length === 0) {
        cartContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
        subtotalContainer.textContent = "R$ 0,00";
        totalContainer.textContent = "R$ 3,50"; // Apenas a taxa de entrega
        return;
    }

    let subtotal = 0;

    carrinho.forEach((produto, index) => {
        subtotal += produto.price * produto.quantidade;

        // Criando o elemento do item no carrinho
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${produto.image}" alt="${produto.name}">
            <div class="cart-details">
                <h3>${produto.name}</h3>
                <p>${produto.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <div class="cart-actions">
                    <input type="number" min="1" value="${produto.quantidade}" onchange="atualizarQuantidade(${index}, this.value)">
                    <button class="remove-btn" onclick="removerDoCarrinho(${index})">🗑️ REMOVER</button>
                </div>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    // Atualiza os valores totais
    subtotalContainer.textContent = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    totalContainer.textContent = (subtotal + 3.50).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Atualizar quantidade de um produto no carrinho
function atualizarQuantidade(index, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (quantidade <= 0) {
        removerDoCarrinho(index);
        return;
    }

    carrinho[index].quantidade = parseInt(quantidade);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();
}

// Remover um item do carrinho
function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho[index]) {
        carrinho.splice(index, 1);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        carregarCarrinho();
    }
}

// Carregar os produtos ao abrir a página
window.onload = carregarCarrinho;
