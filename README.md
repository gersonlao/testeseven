
# Teste da Clínica Seven

## Projeto de Agendamentos

Este projeto é uma **API de agendamentos**, desenvolvida para permitir o gerenciamento de agendamentos entre **clientes** e **especialistas**. Ele inclui funcionalidades como:

- Autenticação e autorização via JWT  
- Cadastro de usuários (clientes e especialistas)  
- Verificação de disponibilidade  
- Criação e gerenciamento de agendamentos  
- Documentação interativa com Swagger  
- Ambiente com Docker  

---

## 📁 Estrutura do Projeto

```
.
├── .env                  # Arquivo de configuração de ambiente
├── .gitignore            # Arquivos a serem ignorados pelo Git
├── docker-compose.yml    # Configuração para Docker
├── Dockerfile            # Criação da imagem Docker
├── prisma/               # Prisma ORM
│   └── schema.prisma     # Definição do banco de dados
├── src/                  
│   ├── config/           # Configurações (Prisma, Redis, etc.)
│   ├── docs/             # Documentação Swagger (YAML/JS)
│   ├── routes/           # Rotas da API
│   └── swagger.js        # Configuração Swagger
├── index.js              # Inicialização da aplicação
├── package.json          # Dependências do projeto
└── README.md             # Documentação
```

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Prisma ORM**
- **Swagger**
- **Docker**
- **JWT (JSON Web Token)**

---

## 🔧 Instalação

```bash
git clone https://github.com/gersonlao/testeseven.git
cd testeseven
```

---

## 📡 Endpoints Principais

### 🔐 Login

**POST** `/auth/login`

**Request:**

```json
{
  "email": "joao@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "message": "Login bem-sucedido",
  "token": "JWT_TOKEN_AQUI",
  "userId": "3de61b5d-0e0d-4946-a394-9afa77e52054",
  "role": "cliente"
}
```

---

### 🧾 Registro

**POST** `/auth/register`

**Request:**

```json
{
  "nome": "Gerson",
  "email": "gerson@gmail.com",
  "senha": "123456",
  "role": "administrador"
}
```

**Response:**

```json
{
  "message": "Usuário criado com sucesso",
  "userId": "22fc9f2f-1df0-4a1e-ae3b-5da3b2aaf522"
}
```

---

### 📅 Verificar Disponibilidade

**GET** `/disponibilidade?especialidade=gastro&data=2025-04-20`

**Response:**

```json
[
  {
    "especialistaId": "c7d46ec7-0118-49c1-8135-c1dfa0c835e1",
    "nomeEspecialista": "Ayrton Senna",
    "especialidade": "gastro",
    "horariosDisponiveis": [
      "08:00", "09:00", "10:00", "11:00", "12:00",
      "13:00", "14:00", "15:00", "16:00", "17:00",
      "18:00", "19:00", "20:00", "21:00"
    ]
  }
]
```

---

## 📌 Regras de Negócio

- Usuários podem se cadastrar como **clientes** ou **especialistas**, diferenciando seus papéis.
- Especialistas podem definir suas **especialidades** e **horários de atendimento disponíveis**.
- Clientes podem consultar a **disponibilidade de horários** e agendar uma consulta.
- O sistema **impede a duplicação de agendamentos**.
- Ao ser criado, um agendamento é salvo com status **pendente**.
- Apenas **especialistas ou administradores** podem **alterar o status** de um agendamento.
