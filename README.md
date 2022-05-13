<h1 align="center" style="font-weight: bold;">Billing Helper 💰</h1>

<p align="center">
 <a href="#tech">Technologies</a> • 
 <a href="#started">Getting Started</a> • 
  <a href="#routes">APP Routes</a> •
 <a href="#colab">Collaborators</a> •
 <a href="#contribute">Contribute</a>
</p>

<p align="center">
    <b>uma API REST para te ajudar na validação dos seus boletos e contas a pagar.</b>
</p>

<h2 id="technologies">💻 Technologias</h2>

- Node
- Typescript
- Express
- Jest
- Docker

<h2 id="started">🚀 Rodando localmente</h2>

Clone o projeto
```
git clone https://github.com/abnerpersio/billing-helper.git
```

Instale as dependências
```
yarn install
```

### Configurando o .env:

Duplique o arquivo `.env.example` e altere as variáveis de ambiente

### Testes com jest:

Para rodar os testes:
```
yarn test
```

### Em localhost:

Para rodar a API em desenvolvimento:
```
yarn dev
```

### Em produção:

Faça o build do projeto:
```
yarn build
```

Inicie o servidor:
```
yarn start
```

### Usando docker:

Rode o projeto:
```
docker-compose up
```


Lembrando que também é válido usar o `npm`, não é obrigatório usar o `yarn` :)


<h2 id="routes">📍 Rotas da API</h2>

Rotas disponíveis:
​
| route               | request    | response                                        
|----------------------|-----------------------------------------------------|---------------------------
| <kbd>GET /health</kbd>     | - | `{ "message": "ok" }`
| <kbd>GET /boleto/:digitableLine</kbd> | - | `{ "barCode "barCode", "amount": "00.00", "expirationDate": "YYYY-MM-DD" }`
