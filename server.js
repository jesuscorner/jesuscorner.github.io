const express = require('express');
const { LowSync } = require('lowdb');
const { JSONFileSync } = require('lowdb/node');
const path = require('path');

const db = new LowSync(new JSONFileSync('db.json'));
db.read();
db.data = db.data || { posts: [], comments: [] };

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/api/posts', (req, res) => {
  const { type } = req.query;
  const posts = type ? db.data.posts.filter(p => p.type === type) : db.data.posts;
  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const post = { id: Date.now().toString(), ...req.body };
  db.data.posts.push(post);
  db.write();
  res.json(post);
});

app.get('/api/posts/:id/comments', (req, res) => {
  const comments = db.data.comments.filter(c => c.postId === req.params.id);
  res.json(comments);
});

app.post('/api/posts/:id/comments', (req, res) => {
  const comment = { id: Date.now().toString(), postId: req.params.id, ...req.body };
  db.data.comments.push(comment);
  db.write();
  res.json(comment);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
