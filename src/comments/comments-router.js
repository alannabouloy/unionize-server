const express = require("express");
const CommentsService = require("./comments-service");
const path = require("path");
const xss = require("xss");
const jsonParser = express.json();

const commentsRouter = express.Router();

const sanitizeComment = (data) => {
  const { comment, union, name, id, date } = data;
  const sanitizedComment = {
    id,
    comment: xss(comment),
    union,
    name: xss(name),
    date,
  };

  return sanitizedComment;
};

commentsRouter
  .route("/")
  .get(async (req, res, next) => {
    const db = req.app.get("db");
    const unionName = req.query.union;
    if (!unionName) {
      return res
        .status(400)
        .json({ error: "Request query must include a union name" });
    }
    try {
      const union = await CommentsService.checkUnion(db, unionName);

      if (!union) {
        return res
          .status(404)
          .json({ error: "there is no union that matches the name you gave" });
      }

      let comments = await CommentsService.getUnionComments(db, union.id);

      comments = comments.map((comment) => sanitizeComment(comment));

      res.status(200).json(comments);

      next();
    } catch (error) {
      next(error);
    }
  })
  .post(jsonParser, async (req, res, next) => {
    const db = req.app.get("db");
    const { unionName, name, comment, date } = req.body;

    if (!unionName) {
      return res
        .status(400)
        .json({ error: "Request body must include a unionName" });
    }

    if (!name) {
      return res.status(400).json({ error: "Request body must includ a name" });
    }

    if (!comment) {
      return res
        .status(400)
        .json({ error: "Request body must include a comment" });
    }

    try {
      const union = await CommentsService.checkUnion(db, unionName);

      if (!union) {
        return res
          .status(404)
          .json({ error: "there is no union that matches the name you gave" });
      }

      const newComment = {
        name,
        comment,
        union: union.id,
        date,
      };

      const result = await CommentsService.addComent(db, newComment);

      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${result.id}`))
        .json(sanitizeComment(result));

      next();
    } catch (error) {
      next(error);
    }
  });

module.exports = commentsRouter;
