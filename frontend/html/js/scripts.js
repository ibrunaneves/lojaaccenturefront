document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:8080/produtos")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let listaProdutos = document.querySelector("#lista-produtos");
            listaProdutos.innerHTML = ""; // Limpa a lista antes de adicionar novos produtos

            data.forEach(produto => {
                let item = document.createElement("tr");
                item.innerHTML = `
                    <td>${produto.id}</td>
                    <td>${produto.descricao}</td>
                    <td>R$ ${produto.valor.toFixed(2)}</td>
                    <td>${produto.quantidade}</td>
                `;
                listaProdutos.appendChild(item);
            });
        })
        .catch(error => {
            console.error("Erro ao carregar produtos:", error);
            document.querySelector("#erro").innerText = "Falha ao carregar os produtos.";
        });
});
