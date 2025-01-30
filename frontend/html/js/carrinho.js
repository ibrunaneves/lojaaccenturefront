function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const cartContainer = document.getElementById("cart-items");
    const subtotalContainer = document.getElementById("subtotal");
    const totalContainer = document.getElementById("total-price");

    cartContainer.innerHTML = "";

    if (carrinho.length === 0) {
        cartContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
        subtotalContainer.textContent = "R$ 0,00";
        totalContainer.textContent = "R$ 3,50";
        return;
    }

    let subtotal = 0;

    carrinho.forEach((produto, index) => {
        produto.price = parseFloat(produto.price);
        subtotal += produto.price * produto.quantidade;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${produto.image}" alt="${produto.name}" onerror="this.src='imagens/default.png'">
            <div class="cart-details">
                <h3>${produto.name}</h3>
                <p>R$ ${produto.price.toFixed(2).replace(".", ",")}</p>
                <div class="cart-actions">
                    <button class="quantity-btn" onclick="alterarQuantidade(${index}, -1)">➖</button>
                    <input type="number" class="quantity-input" min="1" value="${produto.quantidade}" onchange="atualizarQuantidade(${index}, this.value)">
                    <button class="quantity-btn" onclick="alterarQuantidade(${index}, 1)">➕</button>
                    <button class="remove-btn" onclick="removerDoCarrinho(${index})">🗑️</button>
                </div>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    subtotalContainer.textContent = `R$ ${subtotal.toFixed(2).replace(".", ",")}`;
    totalContainer.textContent = `R$ ${(subtotal + 3.50).toFixed(2).replace(".", ",")}`;
}

function alterarQuantidade(index, delta) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho[index]) {
        carrinho[index].quantidade += delta;

        // Impede que a quantidade seja menor que 1
        if (carrinho[index].quantidade < 1) {
            carrinho[index].quantidade = 1;
        }

        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        carregarCarrinho();
    }
}

function atualizarQuantidade(index, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    quantidade = parseInt(quantidade);

    if (quantidade < 1) {
        return;
    }

    carrinho[index].quantidade = quantidade;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();
}

function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho[index]) {
        carrinho.splice(index, 1);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        carregarCarrinho();
    }
}

window.onload = carregarCarrinho;
