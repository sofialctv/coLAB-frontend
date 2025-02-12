
# coLAB: Módulo Frontend

Esse repositório armazena o módulo frontend da aplicação coLAB, que pode ser vista com mais detalhes [aqui](https://github.com/sofialctv/coLAB/tree/main).

## Instalação
Siga os passos abaixo para configurar e executar o projeto localmente:

### 1. Clonar o repositório

Abra o terminal e execute o seguinte comando para clonar o repositório do projeto:

```bash
git clone https://github.com/sofialctv/coLAB-frontend.git
```

### 2. Acessar o diretório do projeto

Entre no diretório recém-clonado:

```bash
cd coLAB-frontend
```

### 3. Instalar dependências
Instale as dependências do projeto utilizando o comando:
```bash
npm install
```

### 4. Acessar a aplicação

Após a execução bem-sucedida do comando acima, a aplicação estará com suas dependências devidamente instaladas. Para acessá-la e utilizá-la de modo funcional, é necessário que o [módulo backend](https://github.com/sofialctv/coLAB/tree/main) esteja rodando localmente.

Verifique em qual porta o backend está rodando. Vá até o arquivo `coLAB-frontend/src/api/api.ts` e altere para a porta adequada em baseURL:

```
import axios, { type AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:SUA-PORTA-BACKEND/api/'
})

export default api
```
