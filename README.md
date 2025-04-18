# testeseven
Teste da Clinica Seven

- Projeto de Agendamentos

  Este projeto é uma API de agendamentos, desenvolvida para permitir o gerenciamento de agendamentos entre clientes e especialistas. Ele inclui funcionalidades como autenticação, cadastro de clientes,usuários, especialistas e agendamento verificação de disponibilidade de especialistas e a criação de agendamentos.

- Estrutura
  .
  ├── .env                  # Arquivo de configuração de ambiente
  ├── .gitignore            # Arquivos a serem ignorados pelo Git
  ├── docker-compose.yml    # Configuração para Docker
  ├── Dockerfile            # Arquivo para criação da imagem Docker
  ├── prisma/               # Contém o schema do Prisma e migrações
  │   └── schema.prisma     # Definição do banco de dados
  ├── src/                  # Código-fonte da aplicação
  │   ├── config/           # Arquivos de configuração (ex: Prisma, Redis)
  │   ├── docs/             # Documentação da API
  │   ├── routes/           # Definição das rotas da API
  │   └── swagger.js        # Configuração do Swagger para a documentação
  ├── index.js              # Arquivo principal da aplicação
  ├── package.json          # Configurações do projeto e dependências
  └── README.md             # Este arquivo de documentação

  Utilizado 
    - Nodes
    - Esxpress
    - Prisma
    - Swagger
    - Docker
    - JWT

- Clone Repositório 
  git clone https://github.com/gersonlao/testeseven.git
  cd testeseven

- requisiçoes 

  endpoint POST /auth/login
  body {
    "email": "joao@example.com",
    "password": "123456"
  }
  response
  {
      "message": "Login bem-sucedido",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzZGU2MWI1ZC0wZTBkLTQ5NDYtYTM5NC05YWZhNzdlNTIwNTQiLCJyb2xlIjoiY2xpZW50ZSIsImlhdCI6MTc0NDk4OTM3MywiZXhwIjoxNzQ0OTkyOTczfQ.R40hmIbwxufehTJVHo4Yxob_WLxA5hQEow_8ylhZxH8",
      "userId": "3de61b5d-0e0d-4946-a394-9afa77e52054",
      "role": "cliente"
  }


  endpoit post /auth/register
  body {
    "nome": "Gerson",
    "email": "gerson@gmail.com",
    "senha": "123456",
    "role": "administrador"
  }
  response
  {
      "message": "Usuário criado com sucesso",
      "userId": "22fc9f2f-1df0-4a1e-ae3b-5da3b2aaf522"
  }
    
  endpoint get /disponibilidade?especialidade=especialidade&data=date
  response
  [
      {
          "especialistaId": "c7d46ec7-0118-49c1-8135-c1dfa0c835e1",
          "nomeEspecialista": "Ayrton Senna",
          "especialidade": "gastro",
          "horariosDisponiveis": [
              "08:00",
              "09:00",
              "10:00",
              "11:00",
              "12:00",
              "13:00",
              "14:00",
              "15:00",
              "16:00",
              "17:00",
              "18:00",
              "19:00",
              "20:00",
              "21:00"
          ]
      }
  ]

- Decisões técnicas

  As técnicas utilizadas foram as solicitadas no projeto, criação da base com docker e utilização.
  do JWT e documentação com Swagger.


- Regras de negócios

  Usuários podem se cadastrar como clientes ou especialistas e diferenciar seus papéis.

  Agendamentos podem ser feitos conforme disponibilidade do especialista, o especialista pode se cadastrar
  Com sua especialidade e disponibilizar seu horário de atendimento. O cliente pode fazer uma consulta 
  dos horários disponíveis e agendar um horário. O sistema não permite duplicar um agendamento.

  O agendamento é cadastrado como pendente e só pode ser alterado por usuários especialistas/admin.