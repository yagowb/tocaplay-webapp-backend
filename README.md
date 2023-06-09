
##   TocaPlay Backend

Este é o código backend para o TocaPlay, um projeto de portal de música desenvolvido em Node.js para o curso de Desenvolvimento para Plataformas Web - UNIFOR 2023.1.

### Tecnologias Utilizadas

-   Node.js
-   Express.js
-   MongoDB

### Instalação

Para executar o backend do TocaPlay localmente, siga estas etapas:

1.  Clone este repositório em sua máquina local.
    

    
    `git clone https://github.com/seu-nome-de-usuario/tocaplay-backend` 
    
2.  Certifique-se de ter o Node.js instalado em sua máquina. Para obter mais informações sobre como instalar o Node.js, visite: [https://nodejs.org](https://nodejs.org/)
    
3.  Instale as dependências necessárias navegando até o diretório do projeto e executando o seguinte comando:
    

    
    `npm install` 
    
4.  Configure um banco de dados MongoDB e atualize a string de conexão no arquivo `db.js`, ou faça a inserção dos dados do mesmo.
    
5.  Inicie o servidor:
    

    
    `npm start` 
    
6.  O servidor backend deve estar em execução em `http://localhost:3001`.
    

### Rotas da API

-   `GET /`: Retorna uma mensagem simples indicando que o backend do TocaPlay está em execução.
    
-   `GET /usuarios/usuarios`: Recupera todos os usuários da coleção "usuarios".
    
-   `GET /playlists`: Recupera todas as playlists públicas da coleção "playlists".
    
-   `GET /musicas`: Recupera todas as músicas da coleção "musicas".
    
-   `GET /playlistsPrivadas/playlistsPrivadas`: Recupera todas as playlists privadas da coleção "playlistsPrivadas".
    
-   `GET /playlistsPrivadas/:id`: Recupera uma playlist privada pelo seu ID.
    
-   `GET /playlistsPrivadas`: Recupera playlists privadas pelo ID do usuário.
    
-   `GET /musicas/:id`: Recupera uma música pelo seu ID.
    
-   `GET /playlists/:id`: Recupera detalhes de uma playlist pelo seu ID.
    
-   `GET /musicas?nome=<nome>`: Pesquisa músicas pelo nome.
    
-   `POST /usuarios`: Cria um novo usuário.
    
-   `GET /usuarios?email=<email>`: Faz login de um usuário pelo e-mail.
    
-   `PATCH /usuarios/:id`: Atualiza o perfil de um usuário pelo ID.
    
-   `POST /usuarios/:id/playlistsPrivadas`: Cria uma nova playlist privada para um usuário.
    
-   `PATCH /playlistsPrivadas/:playlistId`: Atualiza uma playlist privada pelo seu ID.
    

### Contribuição

Contribuições são bem-vindas! Se você deseja melhorar o backend do TocaPlay, sinta-se à vontade para enviar pull requests. Certifique-se de discutir quaisquer alterações importantes antes de enviá-las.

### Licença

Este projeto está licenciado sob a [Licença MIT]. Sinta-se à vontade para usar, modificar e distribuir o TocaPlay de acordo com os termos da licença.

### Contato

Se você tiver alguma dúvida ou sugestão relacionada ao backend do TocaPlay, entre em contato conosco pelo email yagowb@gmail.com
