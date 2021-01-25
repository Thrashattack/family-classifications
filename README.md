# Serviço de Classificação de Famílias - Digix

 - Node v12.3.1
 - ```shell yarn``` Instale as dependencias
 - ```shell yarn dev``` Builda e inicia o projeto

 - ```shell docker-compose up --build -d``` Execute com docker 

# Env 

As configurações do ambiente estão em .env.sample, renomeie para .env antes de iniciar o projeto.

# Endpoints 

- `/auth`
    - POST
        - Body: ```{ "login": "admin", password: "123" }```
            - login: String
            - password: String
        - Response: ```{ "error": "User or Password is Incorrect" } ```
    - PUT
        - Body: ```{ "login": "admin", password: "123" }```
            - login: String
            - password: String
        - Response: ```{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjExNjA2NjIyLCJleHAiOjE2MTE2OTMwMjJ9.w6yHgRha7K6Dir4grCwmwxn5Yb02iDBRpgaQZWDvnOQ", "expires": "2021-01-26T20:30:22.949Z" }``` 

- `/classification`
    - POST
        - Header: ```["authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjExNjA2NjIyLCJleHAiOjE2MTE2OTMwMjJ9.w6yHgRha7K6Dir4grCwmwxn5Yb02iDBRpgaQZWDvnOQ"]```
        - Body: ``` "id": "3dac7da3-d742-4e51-95f9-bbb37f522413", "peoples": [ { "id": "5e65eea1-aa72-407e-9a67-88045c07b5de", "name": "João","type": 0, "birthDate": "1989-12-30" }, { "id": "d467781a-8f06-45ba-be6f-879cf32a9f7e", "name": "Maria", "type": 1, "birthDate": "1989-12-30" }, { "id": "79820382-a181-42d2-bfae-6c012489e65e", "name": "José", "type": 2, "birthDate": "2015-12-30" }, { "id":  80fa071e-17fb-4b87-99db-a7db0bfc23c2", "name": "Angela", "type": 2, "birthDate": "2015-12-30" } ], "inbounds": [ { "peopleId": "5e65eea1-aa72-407e-9a67-88045c07b5de", "value": 1000 }, { "peopleId": "d467781a-8f06-45ba-be6f-879cf32a9f7e", "value": 950 } ], "status": 0 }```
            - id: ```String```
            - peoples: ```[ { id: String, name: String, type: Integer in FamilyMemberType, birthDate: String } ]```
            - FamilyMemberType: ``` { 0: 'Proposer', 1: 'Conjugate', 2: 'Dependent' } ```
            - inbounds: ```[ { peopleId: String, value: Double } ]```
            - status: Integer in FamilyStatus
            - FamilyStatus: ```{ 0: 'Valid_Registration', 1: 'Already_have_a_house', 2: 'Already_contempled_in_another_selecion', 3: 'Incomplete_registration' }```
        - Response: ```{"criteriaAttended":3,"familyId":"3dac7da3-d742-4e51-95f9-bbb37f522413","selectionDate":"2021-01-25T20:33:35.831Z","totalScore":5}```


# Apresentação 

- Esta API foi implementada com base no padrão DDD. Tendo em vista a possibilidade de expansão dos serviços dessa API, o uso de micro-services pode vir a ser viável. Porém para os módulos existentes atualmente não julguei necessário.

# Descrição da Arquitetura 

- O código fonte encontra-se na pasta `src`.
- O diretório `@types` contem as definições de tipos e enumeradores utilizados em todos os módulos da API
- O diretório `config` contem as configurações genéricas da API.
- O diretório `modules` contem os domínios em si
- O diretório `shared` contém interfaces e implementações compartilhadas entre todos os módulos além do entrypoint da api `src/shared/infra/http/api/v1.ts`

# Authentication 

- A API implementa uma autenticação por Json Web Token porém sem efetividade pois o endpoint `/auth/signup` irá devolver um token para qualquer usuário e senha informados. Servindo apenas de demonstração.
- Todavia, os endpoints que usam o middleware de autenticação irão requerer um token valido no header authorization, gerado pela API_SECRET definido no .env.
- Domínio: `src/modules/authentication`
- Configurações: `src/config/auth.ts`
- Middleware: `src/shared/infra/http/middlewares/ensureAuthentication.ts`
- Endpoints: `/auth/signup` & `/auth/signin`

# Descrição do Serviço de Classificação 

- O serviço encontra-se em `src/modules/classification/`
- Está estruturado em: 
    - Infra: 
        - Route (`infra/http/routes/Route.ts`):
            - Usa o middleware compartilhado de autenticação e define o metodo POST para o path `/classify` atribuindo-o à controladora de classificação
        - Controller (`infra/http/controllers/ClassificationController.ts`)
            - Implementa a interface compartilhada `IController` e define o método `post` fazendo validação dos dados de entrada e então chamando o serviço de classificação
    - Core: 
        - Service (`services/ClassificationService.ts`)
            - Implementa a interface compartilhada `IService` e define o método `execute` fazendo validações dos dados e consumindo os providers à partir dos dados de entrada
        - Providers
            - Implementam a interface compartilhada `IProvider` definindo o método `provide` para cada tipo de provenção necessária.


# Regras 

- Foi definida uma arquitetura de regras de forma que haja possibilidade de separar a Gerência de Desenvolvimento de Software da Gerência de Configuração de Software. 
- No arquivo `.env` é possível encontrar as variáveis de ambiente que definem os parametros de cada regra, os critérios de regras e os níveis de aplicação de cada regra. 
- A partir disso a configuração de regras em `config/rules.ts` é capaz de gerar o vetor de críterios e de níveis e então aplicar os valores de cada criterio e nível respectivamente. 
- A regra de classificação ainda não foi modularizada mas poderia ter sido. No momento ela é uma regra do tipo between:
    - Se o valor de entrada estiver entre os dois parametros de classificação, retorne o parametro de pontuação.
- Ex: 
 ```javascript 
    // no arquivo .env 

    criterios = ['conjugateAge'];
    niveis = ['max', 'med', 'min', 'crit']

    // para cada nivel e cada criterio esperam-se 3 parametros no formato:

    CONJUGATEAGE_CRIT_RULE_A // começo inclusivo do intervalo de valores
    CONJUGATEAGE_CRIT_RULE_B // final exclusivo do intervalo de valores
    CONJUGATEAGE_CRIT_SCORE // valor da pontuação do intervalo de valores

 ```

 - Dessa forma valendo-se do CI/CD é possível definir novas configurações para as regras, como valores ou ate mesmo novas regras apenas definindo as variáveis de ambiente do ambiente de produção e demandando nada ou apenas a implementação sucinta de um novo provider para essa regra no que tange ao desenvolvimento.

# Detalhes da Futura Implementação do Serviço de Contemplados

- Com a definição das interfaces de repositório a comunicação com um micro-service ou módulo de persistência se torna bem prática independente da sua implementação.
- Foi definido como um módulo mas a medida que escalar, basta inverter a dependencia do atual entrypoint da API e torna-la interface para os módulos que se tornarão microservices através da implementação de um proxy reverso com Nginex ou Apache.
- No cenário ideal seria um container docker para o postgres e outro para o proxy reverso. Então cada microservice através do seu próprio dockerfile pode ser disponibilizado horizontalmente em containers

