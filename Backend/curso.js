const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: './Images' });

const connection = require('./connection');


router.get('/listarCursoEspecifico', (req, res) => {
  const cursoId = req.query.cursoId;

  // Verifica se o parâmetro cursoId foi fornecido
  if (!cursoId) {
    res.status(400).send('ID do curso é obrigatório.');
    return;
  }

  // Chama a função do banco de dados para listar o curso específico
  const query = `SELECT listarCursoEspecifico(${cursoId}) AS curso`;


  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao listar curso específico:', err);
      res.status(500).send('Erro interno do servidor');
      return;
    }
    // Retorna os dados do curso específico como resposta
    const curso = JSON.parse(results[0].curso); // Convertendo para objeto JavaScript
    res.json(curso);
  });
});

router.get('/listarAreaEspecifica', (req, res) => {
  const areaId = req.query.areaId;

  const query = `SELECT listarAreaEspecifica(${areaId}) AS area`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao obter área:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    // Obtenha a área como uma string JSON do resultado do banco de dados
    const areaString = results[0].area;

    try {
      const areaJSON = JSON.parse(areaString);

      res.json(areaJSON);
    } catch (error) {
      console.error('Erro ao fazer parsing do JSON:', error);
      res.status(500).json({ error: 'Erro interno do servidor ao fazer parsing do JSON' });
    }
  });
});

router.get('/listarMateriaEspecifica', (req, res) => {
  const materiaId = req.query.materiaId;

  const query = `SELECT listarMateriaEspecifica(${materiaId}) AS materia`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao obter área:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    // Obtenha a área como uma string JSON do resultado do banco de dados
    const materiaString = results[0].materia;

    try {
      const materiaJSON = JSON.parse(materiaString);

      res.json(materiaJSON);
    } catch (error) {
      console.error('Erro ao fazer parsing do JSON:', error);
      res.status(500).json({ error: 'Erro interno do servidor ao fazer parsing do JSON' });
    }
  });
});

router.get('/listarPagamentoEspecifico', (req, res) => {
  const pagamentoId = req.query.pagamentoId;

  const query = `SELECT listarPagamentoEspecifico(${pagamentoId}) AS pagamento`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao obter área:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
      return;
    }

    try {
      res.json(results);
    } catch (error) {
      console.error('Erro ao fazer parsing do JSON:', error);
      res.status(500).json({ error: 'Erro interno do servidor ao fazer parsing do JSON' });
    }
  });
});

router.post('/editarCurso', upload.single('imagem'), (req, res) => {
  const { cursoId, nome, modalidade, anotacoes, valor, area, pagamento, materia, dataIni, dataFini, duracao, media} = req.body;
  let imagem;

  if(req.file == undefined) {
    imagem = "NULL";
  } else {
    imagem = req.file.filename;
  }

  // Verifica se algum dos dados está vazio
  if (!cursoId || !nome || !modalidade || !valor || !area || !pagamento || !materia || !dataIni || !dataFini || !duracao) {
    res.status(400).json({ error: 'Todos os campos devem ser preenchidos' });
    return;
  }

  const query = `
    SELECT editarCurso(${cursoId}, "${nome}", '${modalidade}', '${anotacoes}', ${valor}, ${area}, ${materia}, ${pagamento}, '${dataIni}', '${dataFini}', '${duracao}', ${media}, '${imagem}');
  `;

  console.log(query);

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Erro ao atualizar curso:', error);
      res.status(500).json({ error: 'Erro interno do servidor' + error});
      return;
    }

    if (results) {
      res.json({ cursoId: cursoId });
    } else {
      res.status(404).json({ 'Curso não encontrado ou não foi possível atualizar: ' : cursoId });
    }
  });
});



module.exports = router;