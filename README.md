# Desafio BRAVI


## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org) 
- [Angular CLI](https://angular.io/cli) 
- [PHP](https://php.net) 
- [Composer](https://getcomposer.org) 
- [Laravel](https://laravel.com) 
- [Git](https://git-scm.com)

## Configuração do ambiente

Siga as instruções abaixo para configurar o ambiente de desenvolvimento:

### Backend (API)

1. Navegue até a pasta `api`:
   ```bash
   cd api

2. Instale as dependências do Laravel:
    ```bash
    composer install

3. Execute as migrations para criar as tabelas do banco de dados:
    ```bash
    php artisan migrate

4. Inicie o servidor do Laravel
    ```bash
    php artisan serve


### Frontend (Agenda)

1. Navegue até a pasta `agenda`:
    ```bash
    cd agenda

2. Instale as dependências do Angular:
    ```bash
    npm install

3. Inicie o servidor de desenvolvimento do Angular:
    ```bash
    ng serve

Agora você pode acessar o aplicativo em [http://localhost:4200].


