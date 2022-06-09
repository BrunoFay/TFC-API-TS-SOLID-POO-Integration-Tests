
  O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

  No time de desenvolvimento do `TFC`, seu *squad* ficou responsável por desenvolver uma API (utilizando o método `TDD`) e também integrar *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de dados.

  Nesse projeto, você vai construir **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. Seu desenvolvimento deve **respeitar regras de negócio** providas no projeto e **sua API deve ser capaz de ser consumida por um front-end já provido nesse projeto**.

  Para adicionar uma partida é necessário pessoa usuária e senha, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas `teams` e `matches` para fazermos as atualizações das partidas.

  O seu back-end deverá implementar regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

## Rota Login

- Na (`/login`);

- A rota deve receber os campos `email` e `password`:
  - O campo `email` deve receber um email válido;
  - O Campo `password` deve ter mais de 6 caracteres.

- Sua chave `JWT` do back-end, utilizada para assinatura do token, pode ser salva no arquivo `app/backend/jwt.evaluation.key` ou deve ser refatorada a logica de como se acessa a assinatura. 
- exemplo body da requisição :
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
  Se o login foi feito com sucesso o resultado retornado sera um status http `200` e:
  ```json
  {
    "user": {
      "id": 1,
      "username": "userlogin",
      "role": "userRole",
      "email": "userEmail"
    },
    "token": "token JWT" 
  }
  ```
## Rota Matches e Teams


  - Rota `GET` `/teams` com status `200` e com um `json`:

```json
[
	{
		"id": 1,
		"teamName": "teamName1"
	},
	{
		"id": 2,
		"teamName": "teamName2"
	},
	{
		"id": 3,
		"teamName": "teamName3"
	},
	...
]
```
  - Rota `GET` `/matches/:id` com resposta com status `200` e com um `json`:

```json
{
	"id": 5,
	"teamName": "teamName1"
}
```

  - Rota `GET` `/matches` retorna uma lista de partidas:
    ```json
    [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "teamName1"
        },
        "teamAway": {
          "teamName": "teamName2"
        }
      },
      ...
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "teamName1"
        },
        "teamAway": {
          "teamName": "teamName3"
        }
      }
    ]
    ```

  - Rota `GET` e retornar uma lista de partidas filtradas de acordo com o status da partida;
  - Essa requisição deverá usar `query string` para definir o parâmetro.
    ex: `matches?inProgress=true`

  Exemplo de retorno da requisição:
  ```json
  [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": true,
        "teamHome": {
          "teamName": "teamName1"
        },
        "teamAway": {
          "teamName": "teamName2"
        }
      },
      ...
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "teamName1"
        },
        "teamAway": {
          "teamName": "teamName3"
        }
      }
    ]
  ```


  - A rota`POST` `/matches`, para cadastrar uma nova partida e retornara a partida inserida no banco de dados e o status `201`;
  - A partida só pode ser criada por um usuario logado;

  - Formato da requisição:
  ```json
  {
    "homeTeam": 16, 
    "awayTeam": 8, 
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true  
     }
  ```

  ```json
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 8,
    "awayTeamGoals": 2,
    "inProgress": true,
  }
  ```


  -  Rota `PATCH` `/matches/:id/finish`;
  - Serve para finalizar uma partida.
	
  - Retornara um status `200`, e um JSON:

  ```json
  { "message": "Finished" }
  ```

  - Rota `PATCH` `/matches/:id`;
- Formato da requisição:
  ```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  ```


## Rota Leaderboards

  - Rota `GET` `/leaderboard/home` retornara uma lista da classificação dos times mandantes.
  - Rota `GET` `/leaderboard/away` retornara uma lista da classificação dos times visitantes.
  - Rota `GET` `/leaderboard` retornara uma lista da classificação geral dos times.
 - Exemplo de retorno da requisição:

  ```json
  [
    {
      "name": "teamName1",
      "totalPoints": 13,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 17,
      "goalsOwn": 5,
      "goalsBalance": 12,
      "efficiency": 86.67
    },
    {
      "name": "teamName2",
      "totalPoints": 12,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 0,
      "totalLosses": 1,
      "goalsFavor": 12,
      "goalsOwn": 3,
      "goalsBalance": 9,
      "efficiency": 80
    },
    {
      "name": "teamName3",
      "totalPoints": 11,
      "totalGames": 5,
      "totalVictories": 3,
      "totalDraws": 2,
      "totalLosses": 0,
      "goalsFavor": 12,
      "goalsOwn": 6,
      "goalsBalance": 6,
      "efficiency": 73.33
    },
    ...
  ]
  ```

