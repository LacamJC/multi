# API de Estatísticas Financeiras para Gestão de Projetos

[![Status do Projeto](https://img.shields.io/badge/status-em_desenvolvimento-yellow)](https://github.com/seu-usuario/seu-repositorio)
## Descrição

Esta API tem como objetivo fornecer dados estatísticos cruciais para a gestão financeira da empresa. Ela consulta um banco de dados Microsoft SQL Server e disponibiliza informações essenciais sobre os custos com desenvolvedores e os valores a serem cobrados dos clientes, além de detalhes sobre as horas trabalhadas pelos desenvolvedores em diversos projetos. Os dados são estruturados em formato JSON para fácil manipulação e consumo por um frontend dedicado.

## Público-Alvo

Esta API é de uso interno e destinada à gestão da empresa para um melhor controle e análise de informações financeiras relacionadas aos projetos e equipe de desenvolvimento.

## Funcionalidades Principais

* **Consulta de Dados Financeiros:** Obtém informações detalhadas sobre pagamentos a desenvolvedores e valores a serem cobrados dos clientes.
* **Estatísticas de Horas Trabalhadas:** Fornece dados sobre as horas apontadas por cada desenvolvedor em diferentes projetos.
* **Filtragem de Dados:** Permite a aplicação de filtros nos dados JSON retornados, possibilitando a manipulação e análise específica para atender a diferentes objetivos de gestão.
* **Comunicação com Frontend:** Envia dados em formato JSON para um frontend React com Bootstrap, onde as informações são apresentadas à gestão.

## Arquitetura

Este é um projeto de backend construído com Node.js e o framework Express. A arquitetura segue um padrão de separação de responsabilidades, com:

* **Rotas:** Definem os endpoints da API e direcionam as requisições para os controladores.
* **Controladores:** Recebem as requisições, interagem com os serviços e enviam as respostas.
* **Serviços:** Contêm a lógica de negócios da aplicação, incluindo a consulta ao banco de dados MSSQL e a manipulação dos dados.
* **Dados:** Os dados são consultados em um banco de dados Microsoft SQL Server e formatados como JSON para comunicação com o frontend.

## Pré-requisitos

* [Node.js](https://nodejs.org/) (versão mínima recomendada)
* [npm](https://www.npmjs.com/) (geralmente instalado com Node.js)
* Acesso a um banco de dados Microsoft SQL Server contendo os dados relevantes.

## Instalação

1.  Clone o repositório:
    ```bash
    git clone [[https://github.com/seu-usuario/seu-repositorio](https://github.com/seu-usuario/seu-repositorio)]
    cd [nome do seu projeto]
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Configure as variáveis de ambiente:
    * Crie um arquivo `.env` na raiz do projeto (se ainda não existir).
    * Defina as seguintes variáveis de ambiente:
        ```
        API_KEY=sua_chave_de_api_secreta
        PORT=3000
        DATABASE_HOST=seu_host_do_banco
        DATABASE_NAME=nome_do_banco
        DATABASE_USER=usuario_do_banco
        DATABASE_PASSWORD=senha_do_banco
        # Adicione outras variáveis de ambiente necessárias para a conexão com o banco
        ```
    * Se houver um arquivo `.env.example`, você pode copiá-lo para `.env` e preencher com os valores corretos.

## Execução

Para executar a API em modo de desenvolvimento (com hot-reloading):

```bash
npm run dev
