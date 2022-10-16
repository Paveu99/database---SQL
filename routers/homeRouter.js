const express = require('express');
const { TodoRecord } = require('../records/todo.record');
const { pool } = require('../utils/db');

const homeRouter = express.Router();

homeRouter

  .get('/', async (req, res) => {
    const plot = await TodoRecord.findAll();
    res.render('client/list-all', {
      plot,
    });
  })

  .get('/:id', async (req, res) => {
    const read = await TodoRecord.find(req.params.id);
    const { id, title } = read;
    res.render('client/one', {
      id,
      title,
    });
  })

  .post('/', async (req, res) => {
    const { title } = req.body;
    const addedTask = await new TodoRecord({
      title,
    }).insert();
    res
      .status(201) // po to aby wiedzieć czy jest ok bo kody 200 oznaczają że jest ok
      .render('client/added', {
        addedTask,
        title,
      });
  })
//
  .put('/:id', async (req, res) => {
    const update = await TodoRecord.find(req.params.id);
    console.log(req.body);
    update.title = `${req.body.newTitle}`;
    await update.update();
    res.render('client/modified', {
      id: req.params.id,
      title: req.body,
    });
  })
//
  .delete('/:id', async (req, res) => {
    const toDelete = await TodoRecord.find(req.params.id);
    await toDelete.delete();

    res
      .status(201)
      .render('client/deleted', {
        id: toDelete.id,
        title: toDelete.title,
      });
  })
//
  .get('/form/add', (req, res) => {
    res.render('client/form/add');
  })
//
  .get('/form/edit/:id', async (req, res) => {
    const find = await TodoRecord.find(req.params.id);
    const { id, title } = find;
    res.render('client/form/edit', {
      id,
      title,
    });
  });

module.exports = {
  homeRouter,
};
