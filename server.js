const { app } = require('./app');
const { initModels } = require('./util/initModels');
const { sequelize } = require('./util/database');

sequelize
  .authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

// Models Relations
initModels();

sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Express app running');
});
