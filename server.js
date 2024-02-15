const express = require('express');
const app = express();
const db = require('./models');;
const port = process.env.PORT || 8000;

const user = require('./src/routes/user');

const health = require('./src/controllers/health');
app.use(express.json());
app.use('/v1/user', user);
app.get('/healthz', health.healthCheck);
    app.all('/healthz', async (req, res) => {
    res.status(405).header('Cache-Control','no-cache').send();
})

app.use((req, res, next) => {
    res.status(404).send();
})

const server = app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});

db.sequelize.sync()
.then(()=> console.log('Databae and db created'));

module.exports = server;

