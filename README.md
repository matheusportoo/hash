## Hash

Para rodar o projeto é necessário que você tenha o docker e docker compose instalado na máquina. Caso não tenha é só acessar os links abaixo para realizar a instalação:

- [docker](https://docs.docker.com/get-docker/) -[docker-compose](https://docs.docker.com/compose/install/)

Agora vamos levantar nossos containers para executar o projeto, para isso basta executar o comando na raiz do projeto:

```sh
docker-compose up --build
```

Após ter subido os containers podemos já realizar chamadas http para o nosso endpoint:

```
endpoint: http://localhost:3000/checkout
method: POST
body: {
	"products": [
		{
			"id": 1,
			"quantity": 2
		},
		{
			"id": 2,
			"quantity": 1
		}
	]
}
```

Se preferir, pode executar diretamente no terminal via curl:

```
curl --request POST \
  --url http://localhost:3000/checkout \
  --header 'Content-Type: application/json' \
  --data '{
	"products": [
		{
			"id": 1,
			"quantity": 2
		},
		{
			"id": 2,
			"quantity": 1
		}
	]
}'
```

Ah também tem o como testar via swagger, é só accesar:
http://localhost:3000/swagger-ui.html/#/api/CheckoutController_createCart

Tecnologia:
Javascript utilizando o [nestjs](https://github.com/nestjs/nest) :D

## .Env

- host do serviço de descontos:
  DISCOUNT_SERVICE_HOST=discount_service.host:50051

- Data da black friday, formato (YYYY-mm-dd)
  BLACK_FRIDAY_DATE=2021-09-29

- Formatação dos valores monetários, opções: 'cents' ou 'normal'
  VALUE_MONETARY_IN=cents
