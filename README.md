# ParkingLot API
###### Desafio DrConsulta

##### API de gerenciamento de estacionamento usando o framework NestJS com TypeORM o banco de dados relacional MySQL e documentado via Swagger.

#Introdução

Utilizando ao máximo a documentação do [NestJS](https://docs.nestjs.com/), este projeto foi totalmente constrúido usando os comandos e configurações recomendadas pelo próprio _framework_ e tambem pelo **TypeORM**

A arquitetura sugerida pelo NestJS e aplicada no projeto é uma _Organização Baseada em Features_ para criar aplicativos eficientes e escaláveis ​​do lado do servidor. Ele usa JavaScript progressivo, é construído com e totalmente compatível com TypeScript (mas ainda permite que os desenvolvedores codifiquem em JavaScript puro) e combina elementos de OOP (Programação Orientada a Objetos), FP (Programação Funcional) e FRP (Programação Reativa Funcional).

Todas as entidades e CRUDs do projeto foram criados via comandos `nest g` adotando uma projeção modular e escalável totalmente organizada.

Foram criado os dois CRUD e o controle de acesso é realizado via data e horário de entrada e saída dos veículos e verificado se foi pago ou não.

# Inicialização do Projeto

### Instalando dependências

`npm install -g @nestjs/cli`
`npm install @nestjs/typeorm typeorm mysql2 @nestjs/swagger`
`npm install --save @nestjs/jwt`

####S cripts adicionais

    "typeorm": "npm run build && npx typeorm-d dist/db/data-source.js",
    "migration:generate": "npm run typeorm -- migration:generate",
    "migration:run": "npm run typeorm -- migration:run",
    "migration:revert": "npm run typeorm -- migration:revert"

### Rodando API

A API roda ao utilizar o comando

`npm run start:dev`

### Banco de Dados

Banco de dados relacional **MySQL** foi feito via imagem docker e o deploy feito na Google Cloud Platform. 
URL: <gcr.io/drconsulta-challenge/parkinglot@sha256:1bb5fe9b5984f6427ea83e967d4a20fcf9055a93d1388611a4a3dc3702e0a006> [atualmente em revisão]

| PORT | 3306 |
|--|--|
| MYSQL_ROOT_PASSWORD | dev123 |
| MYSQL_USER | root |
| MYSQL_PASSWORD | dev123 |
| MYSQL_DATABASE | parkinglotapi |

###Autenticação JwT

Como a grande maioria dos endpoints deve ser protegida por padrão, foi registrado um _auth.guard_ como uma guard global e usando o decorator `@Public()` é possível sinalizar qual controller não precisará de autenticação.

A única rota não-protegida é a de login, necessitando um dos dois logins padrões do código para obter acesso às requisições restantes via Token.

```
{
  "username": "adm",
  "password": "admin"
}
```

ou

```
{
  "username": "dev",
  "password": "drconsulta"
}
```

retorno similar à:

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbSIsInN1YiI6MSwiaWF0IjoxNjgyMzI2ODQ5LCJleHAiOjE2ODIzMjY5MDl9.4e6-BbYlDTQz2NWnhDRN09CF3RhSXgC336-WPltHybQ"
}
```

### Requisições HTTP:

#### Establishments:

A tabela abaixo descreve as rotas do controlador de estabelecimentos:

Método	| Rota	| Descrição |	Autenticação
--------|-------|-----------|------------
POST	| /establishments	| Cria um novo estabelecimento |	Bearer Token
GET	| /establishments| Retorna todos os estabelecimentos	|Bearer Token
GET	| /establishments/:id	| Retorna um estabelecimento pelo ID	|Bearer Token
PATCH	| /establishments/:id	| Atualiza um estabelecimento pelo ID |	Bearer Token
DELETE |	/establishments/:id	|Deleta um estabelecimento pelo ID	|Bearer Token

###### Parâmetros de entrada (exemplo)
```
{
  "id": 1,
  "name": "Estacionamento A",
  "cnpj": "12.345.678/0001-90",
  "address": "Rua A, 123",
  "phone": "(00) 1111-1111",
  "motorcycleSpots": 10,
  "carSpots": 20
}
```

#### Vehicles:


Método|	Rota|	Descrição|	Autenticação
------|----|---------|-----------
POST|	/vehicles|	Cria um novo veículo	|Bearer Token
GET|	/vehicles|	Retorna todos os veículos	|Bearer Token
GET|	/vehicles/:id	|Retorna um veículo pelo ID|	Bearer Token
GET|	/vehicles/establishments/:establishmentId	|Retorna todos os veículos de um estabelecimento	|Bearer Token
POST|	/vehicles/entry|	Registra a entrada de um veículo em um estabelecimento|	Bearer Token
POST|	/vehicles/:vehicleId/exit	|Registra a saída de um veículo em um estabelecimento|	Bearer Token
PATCH|	/vehicles/:id	|Atualiza um veículo pelo ID|	Bearer Token
DELETE|	/vehicles/:id	|Deleta um veículo pelo ID	|Bearer Token

###### Parâmetros de entrada (exemplo)
```
[
  {
    "id": 1,
    "brand": "Toyota",
    "model": "Corolla",
    "color": "Preto",
    "plate": "ABC-1234",
    "type": "car",
    "entryTime": "2022-05-01T13:00:00.000Z",
    "exitTime": "2022-05-01T22:00:00.000Z",
    "paid": true
  },
  {
    "id": 5,
    "brand": "Yamaha",
    "model": "R1",
    "color": "Azul",
    "plate": "MNO-7890",
    "type": "motorcycle",
    "entryTime": "2022-05-03T17:30:00.000Z",
    "exitTime": null,
    "paid": false
  }
]
```

#### Authentication

Método |	Rota |	Parâmetros |	Descrição
-------|-------|------------|-------------
POST |	/auth/login |	username e password no corpo da requisição |	Realiza login de um administrador
GET |	/auth/profile |	Nenhum parâmetro |	Retorna o perfil do administrador autenticado. A requisição deve ser autenticada com um token JWT no cabeçalho "Authorization: Bearer <token>".

A anotação @ApiTags('establishments') especifica que o grupo de tags é "establishments", o que significa que todas as rotas no controller de estabelecimentos terão essa tag.

A anotação @ApiBearerAuth() indica que as rotas requerem um token JWT de autenticação no cabeçalho da solicitação.


##### Todas as requisições podem ser testadas via Swagger, Postman ou Terminal


#### Conclusão
Apesar de trabalhar com Node, nunca tinha tido experiência ao criar uma API do zero utilizando as ferramentas NestJs e TypeORM nas quais aprendi a usar durante essa semana de desafio. Entrando a fundo na documentação das mesmas é possível encontrar um mar de possibilidades, praticidade e produtividade na qual me identifiquei muito em trabalhar, a aplicação não está completa como gostaria porém fico contente com o resultado de poucas horas de experiência. 

Me desafiei a tentar realizar a parte de DevOps onde nunca tive contato, o deploy foi feito porém ainda há ajustes à serem feitos para funcionalidade completa, mesmo assim o aprendizado valeu a pena.
