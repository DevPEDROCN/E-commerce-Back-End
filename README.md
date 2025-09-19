# E-commerce Back-End

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4.x-blue?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen?logo=mongodb)
![Mongoose](https://img.shields.io/badge/Mongoose-7.x-red?logo=mongoose)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange?logo=json-web-tokens)
![Winston](https://img.shields.io/badge/Winston-Logging-lightgrey?logo=winston)
![GitHub](https://img.shields.io/badge/GitHub-Repository-black?logo=github)

<br>

Um robusto backend para um sistema de e-commerce, desenvolvido com Node.js, Express, MongoDB e Mongoose. Este projeto visa fornecer uma API RESTful completa para gerenciamento de produtos, usuários (com autenticação JWT) e pedidos, focando na performance, escalabilidade e manutenibilidade.

## 🌟 Funcionalidades Implementadas

Este backend oferece as seguintes funcionalidades principais, cobrindo os requisitos da proposta do projeto:

### 📦 Produtos
*   **Criação de Produtos:** Adiciona novos produtos ao catálogo com detalhes como nome, descrição, preço, categoria, estoque e imagem.
*   **Listagem de Produtos:** Retorna uma lista de todos os produtos disponíveis.
*   **Detalhes do Produto:** Consulta um produto específico pelo seu ID.
*   **Atualização de Produtos:** Modifica informações de um produto existente.
*   **Remoção de Produtos:** Exclui um produto do catálogo.

### 👤 Usuários
*   **Registro de Usuários:** Permite que novos usuários criem contas com email e senha. As senhas são armazenadas de forma segura com hash (`bcryptjs`).
*   **Login de Usuários:** Autentica usuários e retorna um JSON Web Token (JWT) para acesso seguro a rotas protegidas.
*   **Perfil do Usuário:** Permite que usuários autenticados visualizem suas informações de perfil.
*   **Atualização do Perfil:** Permite que usuários autenticados atualizem suas informações de perfil (nome, email, senha).

### 🛒 Pedidos
*   **Criação de Pedidos:** Usuários autenticados podem criar novos pedidos, especificando os produtos e quantidades. O sistema valida o estoque e calcula o valor total.
*   **Listagem de Pedidos:** Usuários podem visualizar todos os seus pedidos anteriores.
*   **Detalhes do Pedido:** Consulta um pedido específico pelo seu ID (apenas pedidos do usuário autenticado).
*   **Atualização do Status do Pedido:** (⚠️ **Para Admins - Implementação futura para proteção total**) Permite alterar o status de um pedido (ex: `pending`, `processing`, `shipped`, `delivered`, `cancelled`).
*   **Listagem de Todos os Pedidos:** (⚠️ **Para Admins - Implementação futura para proteção total**) Retorna todos os pedidos registrados no sistema.

### 🛡️ Segurança e Robustez
*   **Autenticação JWT:** Proteção de rotas com tokens JWT para garantir que apenas usuários autorizados possam acessá-las.
*   **Hash de Senhas:** Utilização de `bcryptjs` para armazenamento seguro de senhas.
*   **Validação de Dados:** Mongoose schemas com validações integradas para garantir a integridade dos dados.
*   **Tratamento de Erros Centralizado:** Middleware global para capturar e lidar com erros não tratados, prevenindo falhas inesperadas.
*   **Sistema de Logging:** Implementação do `Winston` para registrar informações importantes e erros em arquivos de log (`error.log`, `combined.log`), facilitando a depuração e monitoramento.

## 🚀 Tecnologias Utilizadas

*   **Node.js**: Runtime JavaScript.
*   **Express.js**: Framework web para Node.js.
*   **MongoDB**: Banco de dados NoSQL baseado em documentos.
*   **Mongoose**: ODM (Object Data Modeling) para MongoDB.
*   **Dotenv**: Para gerenciamento de variáveis de ambiente.
*   **Bcryptjs**: Para hash de senhas.
*   **JSON Web Token (JWT)**: Para autenticação e autorização.
*   **Winston**: Para logging robusto.

## ⚙️ Configuração do Ambiente

Para rodar este projeto localmente, siga os passos abaixo:

### Autor

*  Pedro Henrique Silva Oliveira

### RA

*  a2312344



