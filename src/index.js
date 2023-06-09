const express = require('express');
const cors = require('cors')
const { ObjectId } = require('mongodb');
const client = require('./db');

const app = express();

app.use(express.json());
app.use(cors());



/*==============*/
/*    ROTAS     */
/*==============*/

//ROTA RAIZ
app.get('/', (req, res) => {
  res.json('Backend TocaPlay');
});


//LISTAR TODOS OS USUÁRIOS
app.get('/usuarios/usuarios', async (req, res) => {
  await client.connect();
  const usuarios = await client.db("spotify").collection("usuarios").find().toArray();
  res.json(usuarios)
});

// LISTAR PLAYLISTS PÚBLICAS
app.get('/playlists', async (req, res) => {
  await client.connect();
  const publicPlaylists = await client.db("spotify").collection("playlists").find().toArray();
  res.json(publicPlaylists);
});

// LISTAR MUSICAS
app.get('/musicas', async (req, res) => {
  await client.connect();
  const musicas = await client.db("spotify").collection("musicas").find().toArray();
  res.json(musicas);
});

// LISTAR PLAYLISTS PRIVADAS
app.get('/playlistsPrivadas/playlistsPrivadas', async (req, res) => {
  await client.connect();
  const privatePlaylists = await client.db("spotify").collection("playlistsPrivadas").find().toArray();
  res.json(privatePlaylists);
});

// LISTAR PLAYLISTS PRIVADAS POR ID
app.get('/playlistsPrivadas/:id', async (req, res) => {
  const { id } = req.params;
  await client.connect();
  const privatePlaylists = await client.db("spotify").collection("playlistsPrivadas").findOne({ _id: new ObjectId(id) });
  res.json(privatePlaylists);
});

// LISTAR PLAYLISTS PRIVADAS POR ID DO USUARIO
app.get('/playlistsPrivadas', async (req, res) => {
  const { idUsuario } = req.query;
  await client.connect();
  const privatePlaylists = await client.db("spotify").collection("playlistsPrivadas").find({ idUsuario: idUsuario }).toArray();
  res.json(privatePlaylists);
});

// LISTAR MUSICAS POR ID
app.get('/musicas/:id', async (req, res) => {
  await client.connect();
  const { id } = req.params;
  const publicPlaylists = await client.db("spotify").collection("musicas").findOne({ _id: new ObjectId(id) }) ;
  res.json(publicPlaylists);
});

//LISTAR DETALHES DAS PLAYLISTS PÚBLICAS
app.get('/playlists/:id', async (req, res) => {
  const { id } = req.params;

  await client.connect();
  const playlist = await client.db("spotify").collection("playlists").findOne({ _id: new ObjectId(id) });

  if (!playlist) {
    return res.status(404).json({ error: 'Playlist não encontrada!' });
  }

  res.status(200).json(playlist);
});



//BUSCAR MÚSICAS
app.get('/musicas', async (req, res) => {
  const { nome } = req.query;

  await client.connect();
  const resultadosFiltrados = await client.db("spotify").collection("musicas")
    .find({ nome: { $regex: nome, $options: 'i' } }).toArray();


    if (!resultadosFiltrados || resultadosFiltrados.length === 0) {
      return res.status(404).json({ error: 'Música não encontrada.' });
    }
  
    res.status(200).json(resultadosFiltrados);
});



//CADASTRO DE USUÁRIO
app.post('/usuarios', async (req, res) => {
  const { nome, email, senha } = req.body;

  await client.connect();
  const usuarioExistente = await client.db("spotify").collection("usuarios").findOne({ email });

  if (usuarioExistente) {
    return res.status(400).json({ error: 'E-mail já cadastrado.' });
  }

  const novoUsuario = {  nome, email, senha };

  await client.db("spotify").collection("usuarios").insertOne(novoUsuario);

  res.status(200).json(novoUsuario);
});



// LOGIN
app.get('/usuarios', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'É necessário inserir o email.' });
  }

  await client.connect();
  const usuario = await client.db("spotify").collection("usuarios").findOne({ email });

  if (!usuario) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  res.status(200).json(usuario);
});



// EDITAR PERFIL
app.patch('/usuarios/:id', async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.params;

  await client.connect();

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID de usuário inválido.' });
  }
  
  const usuarioRequisitado = await client.db("spotify").collection("usuarios").findOne({ _id: new ObjectId(id) });

  
  if (!usuarioRequisitado) {
    return res.status(404).json({ error: 'Usuário não encontrado.' });
  }

  const novoNome = nome || usuarioRequisitado.nome;
  const novoEmail = email || usuarioRequisitado.email;
  const novaSenha = senha || usuarioRequisitado.senha;

  await client.db("spotify").collection("usuarios").updateOne({ _id: new ObjectId(id) }, { $set: { nome: novoNome, email: novoEmail, senha: novaSenha } });

  const usuarioAtualizado = await client.db("spotify").collection("usuarios").findOne({ _id: new ObjectId(id) });

  res.status(200).json(usuarioAtualizado);
});




//CADASTRO DAS PLAYLISTS PRIVADAS
app.post('/usuarios/:id/playlistsPrivadas', async (req, res) => {
  const { nome, musicas } = req.body;
  const { id } = req.params;

  await client.connect();
  const usuarioRequisitado = await client.db("spotify").collection("usuarios").findOne({ _id: new ObjectId(id)});

  if (!usuarioRequisitado) {
    return res.status(404).json({ error: 'Usuário não encontrado.' });
  }


  const novaPlaylist = { idUsuario: id, nome, musicas };

  await client.db("spotify").collection("playlistsPrivadas").insertOne(novaPlaylist);

  const playlistsPrivadasAtualizadas = await client.db("spotify").collection("playlistsPrivadas").find().toArray();

  res.status(200).json(playlistsPrivadasAtualizadas);
});




// EDITAR PLAYLISTS PRIVADAS
app.patch('/playlistsPrivadas/:playlistId', async (req, res) => {
  const { nome, musicas } = req.body;
  const {  playlistId } = req.params;

  await client.connect();

  const playlistReq = await client.db("spotify").collection("playlistsPrivadas").findOne({ _id: new ObjectId(playlistId)  });
  if (!playlistReq) {
    return res.status(404).json({ error: 'Playlist não encontrada.' });
  }

  const novaNome = nome || playlistReq.nome;
  const novasMusicas = musicas || playlistReq.musicas;

  await client.db("spotify").collection("playlistsPrivadas")
  .updateOne({ _id: new ObjectId(playlistId) }, { $set: { nome: novaNome, musicas: novasMusicas } });

  const playlistPrivadaAtualizada = await client.db("spotify").collection("playlistsPrivadas").findOne({ _id: new ObjectId(playlistId) });

  res.status(200).json(playlistPrivadaAtualizada);
});




//INICIANDO SERVIDOR
const port = 3001;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});