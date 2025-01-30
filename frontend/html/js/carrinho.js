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

        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="imagens/${produto.image}" alt="${produto.name}">
                <div class="cart-details">
                    <h3>${produto.name}</h3>
                    <p>R$ ${produto.price.toFixed(2)}</p>
                    <div class="cart-actions">
                        <input type="number" min="1" value="${produto.quantidade}" onchange="atualizarQuantidade(${index}, this.value)">
                        <button class="remove-btn" onclick="removerDoCarrinho(${index})">🗑️ REMOVER</button>
                    </div>
                </div>
            </div>
        `;
    });

    subtotalContainer.textContent = `R$ ${subtotal.toFixed(2)}`;
    totalContainer.textContent = `R$ ${(subtotal + 3.50).toFixed(2)}`;
}

// Atualizar quantidade de um produto
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
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();
}

// Carregar os produtos ao abrir a página
window.onload = carregarCarrinho;
