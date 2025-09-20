# 🧪 Testes da API - E-commerce

Este documento contém todos os testes para validar as rotas da API utilizando **curl** no **CMD do Windows**.


# Guia de Testes para a API de Produtos, Usuários e Pedidos (com cURL)

Este guia fornece instruções detalhadas para testar as rotas da sua API utilizando ferramentas como Postman, Insomnia ou o `curl` no terminal do Windows.

## Preparação Inicial

1.  **Reinicie o Servidor Node.js:**
    *   No seu terminal, pressione `Ctrl+C` para parar o servidor.
    *   Em seguida, execute `node app.js` para iniciá-lo novamente.

## 1. Testando a API de Produtos

### 1.1. Criar Produto (POST)

*   **URL:** `http://localhost:3000/api/products`
*   **Método:** `POST`
*   **Headers:**
    *   `Content-Type: application/json`
*   **Body (raw, JSON):**

    ```json
    {
        "name": "Smartphone X",
        "description": "Um smartphone de última geração com câmera de alta resolução.",
        "price": 1999.99,
        "category": "Eletrônicos",
        "stock": 50,
        "imageUrl": "https://example.com/smartphone-x.jpg"
    }
    ```
*   **Esperado:** Status `201 Created` e o objeto do produto criado. **Guarde o `_id` do produto criado para testes futuros.**

*   **Comando cURL (CMD):**

    ```cmd
    curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"Smartphone X\", \"description\": \"Um smartphone de última geração com câmera de alta resolução.\", \"price\": 1999.99, \"category\": \"Eletrônicos\", \"stock\": 50, \"imageUrl\": \"https://example.com/smartphone-x.jpg\"}" http://localhost:3000/api/products
    ```
    *   **Dica:** No CMD, as aspas duplas dentro do JSON precisam ser escapadas com uma barra invertida (`\"`).

### 1.2. Obter Todos os Produtos (GET)

*   **URL:** `http://localhost:3000/api/products`
*   **Método:** `GET`
*   **Esperado:** Status `200 OK` e um array de produtos.

*   **Comando cURL (CMD):**

    ```cmd
    curl http://localhost:3000/api/products
    ```

### 1.3. Obter Produto por ID (GET)

*   **URL:** `http://localhost:3000/api/products/ID_DO_PRODUTO` (Substitua `ID_DO_PRODUTO` pelo `_id` que você obteve ao criar o produto).
*   **Método:** `GET`
*   **Esperado:** Status `200 OK` e o objeto do produto específico.

*   **Comando cURL (CMD):**

    ```cmd
    curl http://localhost:3000/api/products/ID_DO_PRODUTO
    ```
    *   **Exemplo:** `curl http://localhost:3000/api/products/65d21e8e9c7b1a2f0a1b2c3d`

### 1.4. Atualizar Produto (PATCH)

*   **URL:** `http://localhost:3000/api/products/ID_DO_PRODUTO` (Use o `_id` de um produto existente).
*   **Método:** `PATCH`
*   **Headers:**
    *   `Content-Type: application/json`
*   **Body (raw, JSON):**

    ```json
    {
        "price": 1899.99,
        "stock": 45
    }
    ```
*   **Esperado:** Status `200 OK` e o objeto do produto atualizado.

*   **Comando cURL (CMD):**

    ```cmd
    curl -X PATCH -H "Content-Type: application/json" -d "{\"price\": 1899.99, \"stock\": 45}" http://localhost:3000/api/products/ID_DO_PRODUTO
    ```
    *   **Exemplo:** `curl -X PATCH -H "Content-Type: application/json" -d "{\"price\": 1899.99, \"stock\": 45}" http://localhost:3000/api/products/65d21e8e9c7b1a2f0a1b2c3d`

### 1.5. Deletar Produto (DELETE)

*   **URL:** `http://localhost:3000/api/products/ID_DO_PRODUTO` (Use o `_id` de um produto existente).
*   **Método:** `DELETE`
*   **Esperado:** Status `200 OK` e uma mensagem de sucesso.

*   **Comando cURL (CMD):**

    ```cmd
    curl -X DELETE http://localhost:3000/api/products/ID_DO_PRODUTO
    ```
    *   **Exemplo:** `curl -X DELETE http://localhost:3000/api/products/65d21e8e9c7b1a2f0a1b2c3d`

## 2. Testando a API de Usuários

### 2.1. Registrar Usuário (POST)

*   **URL:** `http://localhost:3000/api/users/register`
*   **Método:** `POST`
*   **Headers:**
    *   `Content-Type: application/json`
*   **Body (raw, JSON):**

    ```json
    {
        "name": "João da Silva",
        "email": "joao@example.com",
        "password": "minhasenha123"
    }
    ```
*   **Esperado:** Status `201 Created` e um objeto de usuário (sem senha) com um token JWT. **Guarde este token para as próximas requisições!**

*   **Comando cURL (CMD):**

    ```cmd
    curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"João da Silva\", \"email\": \"joao@example.com\", \"password\": \"minhasenha123\"}" http://localhost:3000/api/users/register
    ```

### 2.2. Login de Usuário (POST)

*   **URL:** `http://localhost:3000/api/users/login`
*   **Método:** `POST`
*   **Headers:**
    *   `Content-Type: application/json`
*   **Body (raw, JSON):**

    ```json
    {
        "email": "joao@example.com",
        "password": "minhasenha123"
    }
    ```
*   **Esperado:** Status `200 OK` e um objeto de usuário com um novo token JWT. **Guarde este token!**

*   **Comando cURL (CMD):**

    ```cmd
    curl -X POST -H "Content-Type: application/json" -d "{\"email\": \"joao@example.com\", \"password\": \"minhasenha123\"}" http://localhost:3000/api/users/login
    ```

### 2.3. Obter Perfil do Usuário (GET)

*   **URL:** `http://localhost:3000/api/users/me`
*   **Método:** `GET`
*   **Headers:**
    *   `Authorization: Bearer SEU_TOKEN_JWT` (Substitua `SEU_TOKEN_JWT` pelo token obtido no registro ou login).
*   **Esperado:** Status `200 OK` e o perfil do usuário logado.

*   **Comando cURL (CMD):**

    ```cmd
    curl -H "Authorization: Bearer SEU_TOKEN_JWT" http://localhost:3000/api/users/me
    ```
    *   **Exemplo:** `curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." http://localhost:3000/api/users/me`

### 2.4. Atualizar Perfil do Usuário (PATCH)

*   **URL:** `http://localhost:3000/api/users/me`
*   **Método:** `PATCH`
*   **Headers:**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer SEU_TOKEN_JWT`
*   **Body (raw, JSON):**

    ```json
    {
        "name": "João Silva Junior"
    }
    ```
*   **Esperado:** Status `200 OK` e o perfil do usuário atualizado.

*   **Comando cURL (CMD):**

    ```cmd
    curl -X PATCH -H "Content-Type: application/json" -H "Authorization: Bearer SEU_TOKEN_JWT" -d "{\"name\": \"João Silva Junior\"}" http://localhost:3000/api/users/me
    ```
    *   **Exemplo:** `curl -X PATCH -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -d "{\"name\": \"João Silva Junior\"}" http://localhost:3000/api/users/me`

## 3. Testando a API de Pedidos

**Antes de testar pedidos, certifique-se de ter:**

*   Um usuário registrado e logado (para ter um token JWT válido).
*   Pelo menos um ou dois produtos criados (para ter IDs de produtos). Se não tiver, volte à seção "1.1. Criar Produto (POST)".

### 3.1. Criar Pedido (POST)

*   **URL:** `http://localhost:3000/api/orders`
*   **Método:** `POST`
*   **Headers:**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer SEU_TOKEN_JWT` (Token do usuário que está fazendo o pedido).
*   **Body (raw, JSON):**

    ```json
    {
        "products": [
            {
                "product": "ID_DO_SEU_PRODUTO_1", 
                "quantity": 1
            },
            {
                "product": "ID_DO_SEU_PRODUTO_2",
                "quantity": 2
            }
        ],
        "shippingAddress": {
            "street": "Rua Exemplo, 123",
            "city": "São Paulo",
            "state": "SP",
            "zipCode": "01000-000",
            "country": "Brasil"
        }
    }
    ```
    *   **Importante:** Substitua `ID_DO_SEU_PRODUTO_1` e `ID_DO_SEU_PRODUTO_2` pelos `_id` de produtos reais que você criou.
*   **Esperado:** Status `201 Created` e o objeto do pedido criado, com `user` e `products` populados. **Guarde o `_id` do pedido criado para testes futuros.**

*   **Comando cURL (CMD):**

    ```cmd
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer SEU_TOKEN_JWT" -d "{\"products\": [{\"product\": \"ID_DO_SEU_PRODUTO_1\", \"quantity\": 1}, {\"product\": \"ID_DO_SEU_PRODUTO_2\", \"quantity\": 2}], \"shippingAddress\": {\"street\": \"Rua Exemplo, 123\", \"city\": \"São Paulo\", \"state\": \"SP\", \"zipCode\": \"01000-000\", \"country\": \"Brasil\"}}" http://localhost:3000/api/orders
    ```
    *   **Exemplo:**
        ```cmd
        curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -d "{\"products\": [{\"product\": \"65d21e8e9c7b1a2f0a1b2c3d\", \"quantity\": 1}, {\"product\": \"65d21e8e9c7b1a2f0a1b2c3e\", \"quantity\": 2}], \"shippingAddress\": {\"street\": \"Rua Exemplo, 123\", \"city\": \"São Paulo\", \"state\": \"SP\", \"zipCode\": \"01000-000\", \"country\": \"Brasil\"}}" http://localhost:3000/api/orders
        ```

### 3.2. Obter Pedidos do Usuário (GET)

*   **URL:** `http://localhost:3000/api/orders/me`
*   **Método:** `GET`
*   **Headers:**
    *   `Authorization: Bearer SEU_TOKEN_JWT`
*   **Esperado:** Status `200 OK` e um array de pedidos feitos pelo usuário logado.

*   **Comando cURL (CMD):**

    ```cmd
    curl -H "Authorization: Bearer SEU_TOKEN_JWT" http://localhost:3000/api/orders/me
    ```
    *   **Exemplo:** `curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." http://localhost:3000/api/orders/me`

### 3.3. Obter Pedido por ID (GET)

*   **URL:** `http://localhost:3000/api/orders/ID_DO_SEU_PEDIDO` (Substitua `ID_DO_SEU_PEDIDO` pelo `_id` de um pedido que você criou).
*   **Método:** `GET`
*   **Headers:**
    *   `Authorization: Bearer SEU_TOKEN_JWT`
*   **Esperado:** Status `200 OK` e o objeto do pedido específico.

*   **Comando cURL (CMD):**

    ```cmd
    curl -H "Authorization: Bearer SEU_TOKEN_JWT" http://localhost:3000/api/orders/ID_DO_SEU_PEDIDO
    ```
    *   **Exemplo:** `curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." http://localhost:3000/api/orders/65d21e8e9c7b1a2f0a1b2c3f`

### 3.4. Atualizar Status do Pedido (PATCH)

*   **URL:** `http://localhost:3000/api/orders/ID_DO_SEU_PEDIDO/status` (Use o `_id` de um pedido existente).
*   **Método:** `PATCH`
*   **Headers:**
    *   `Content-Type: application/json`
    *   `Authorization: Bearer SEU_TOKEN_JWT`
*   **Body (raw, JSON):**

    ```json
    {
        "status": "shipped" 
    }
    ```
    *   Você pode usar outros status válidos definidos na sua API (e.g., "pending", "processing", "delivered", "cancelled").
*   **Esperado:** Status `200 OK` e o objeto do pedido com o status atualizado.

*   **Comando cURL (CMD):**

    ```cmd
    curl -X PATCH -H "Content-Type: application/json" -H "Authorization: Bearer SEU_TOKEN_JWT" -d "{\"status\": \"shipped\"}" http://localhost:3000/api/orders/ID_DO_SEU_PEDIDO/status
    ```
    *   **Exemplo:** `curl -X PATCH -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." -d "{\"status\": \"shipped\"}" http://localhost:3000/api/orders/65d21e8e9c7b1a2f0a1b2c3f/status`

---
