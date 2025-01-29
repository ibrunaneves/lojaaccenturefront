package com.academia.loja_accenture.modulos.pedido.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record PedidoDTO(
    Long id,
    String descricao,
    BigDecimal valor,
    int quantidade,
    Long clienteId,
    Long vendedorId,
    List<ProdutoDTO> produtos,
    LocalDateTime createdAt
) {
}
