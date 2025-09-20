
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

# Como Rodar o Projeto Localmente (Backend Node.js)

Este guia detalha os passos necessários para configurar e executar seu projeto backend Node.js em sua máquina local.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em seu sistema:

*   **Node.js e npm (Node Package Manager):**
    *   Verifique se estão instalados abrindo seu terminal/CMD e digitando:
        ```bash
        node -v
        npm -v
        ```
    *   Se não estiverem instalados, faça o download e instale a versão LTS (Long Term Support) em [nodejs.org](https://nodejs.org/).

*   **MongoDB:**
    *   Este projeto provavelmente usa MongoDB como banco de dados. Você precisará ter uma instância do MongoDB rodando.
    *   **Opção 1: MongoDB Local:**
        *   Baixe e instale o MongoDB Community Server em [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community).
        *   Siga as instruções para iniciar o serviço do MongoDB em seu sistema operacional (geralmente ele inicia automaticamente após a instalação ou pode ser iniciado via linha de comando ou serviços do sistema).
    *   **Opção 2: MongoDB Atlas (Cloud):**
        *   Você pode usar um banco de dados MongoDB hospedado na nuvem (MongoDB Atlas). Para isso, precisará criar uma conta, configurar um cluster e obter a string de conexão.

## 1. Clonar o Repositório (se aplicável)

Se o seu código estiver em um repositório Git (como GitHub, GitLab, Bitbucket), o primeiro passo é cloná-lo para sua máquina local.

Abra seu terminal ou Prompt de Comando (CMD) e execute:

```bash
git clone <URL_DO_SEU_REPOSITORIO>
```

Se você já tem os arquivos do projeto em uma pasta, pode pular este passo.

## 2. Navegar até o Diretório do Projeto
Após clonar (ou se já tiver os arquivos), navegue até a pasta raiz do seu projeto no terminal/CMD:
```bash
cd nome-da-sua-pasta-do-projeto
```
Substitua nome-da-sua-pasta-do-projeto pelo nome real da pasta onde seu projeto está localizado.

## 3. Instalar as Dependências
O projeto Node.js utiliza várias bibliotecas e pacotes. Você precisa instalá-los usando o npm.
No diretório raiz do projeto, execute:
```bash
npm install
```
Este comando lerá o arquivo package.json e instalará todas as dependências listadas.

## 4. Configurar Variáveis de Ambiente (.env)
Muitos projetos Node.js usam variáveis de ambiente para configurar chaves de API, strings de conexão com o banco de dados e outras configurações sensíveis. Geralmente, há um arquivo de exemplo chamado .env.example ou config.env.example na raiz do projeto.
Crie um arquivo .env: Copie o conteúdo do .env.example (ou crie um arquivo .env do zero) na raiz do seu projeto.
Edite o arquivo .env: Abra o arquivo .env e preencha as variáveis de ambiente com os valores corretos para o seu ambiente local.
Um exemplo comum para a string de conexão do MongoDB seria:
```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/seubanco
JWT_SECRET=suachavesecreta
JWT_EXPIRE=1h
```
# Outras variáveis como SERVICE_NAME, API_KEY, etc.

PORT: A porta em que seu servidor Node.js será executado (geralmente 3000 ou 5000).
MONGO_URI: A string de conexão para o seu banco de dados MongoDB.

Se estiver usando MongoDB local: mongodb://localhost:27017/seunomebanco (substitua seunomebanco pelo nome desejado para o seu banco de dados).

Se estiver usando MongoDB Atlas: cole a string de conexão fornecida pelo Atlas.
```bash
JWT_SECRET: Uma string aleatória e complexa usada para assinar tokens JWT.
JWT_EXPIRE: Tempo de expiração dos tokens JWT.
```
## 5. Iniciar o Servidor
Agora que as dependências estão instaladas e as variáveis de ambiente configuradas, você pode iniciar o servidor Node.js.
No diretório raiz do projeto, execute:
```bash
npm start
```
Ou, se o seu package.json tiver um script de inicialização diferente (como dev para desenvolvimento com nodemon):
```bash
npm run dev
```
(Verifique o arquivo package.json na seção "scripts" para saber qual comando usar para iniciar o servidor).
Após executar o comando, você deverá ver mensagens no terminal indicando que o servidor foi iniciado com sucesso e que a conexão com o banco de dados foi estabelecida.

## 6. Acessar a API
Seu servidor estará rodando localmente na porta que você configurou (por exemplo, 3000). Você pode testar suas rotas de API usando ferramentas como Postman, Insomnia ou até mesmo seu navegador (para rotas GET simples) em URLs como:

* http://localhost:3000/api/products

* http://localhost:3000/api/users/register

* http://localhost:3000/api/orders



### Autor

*  Pedro Henrique Silva Oliveira

### RA

*  a2312344




=======
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






