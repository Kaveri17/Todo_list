require('dotenv').config();

const app = require("./app");
const { sequelize } = require('./models');
const port = process.env.PORT ;
// const server = http.createServer(app);

app.listen(port,async()=>{
    await sequelize.authenticate()
    console.log(`SERVER RUNNING SUCCESSFULLY IN PORT ${port}.` )
})

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });