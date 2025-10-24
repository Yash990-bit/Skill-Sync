const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const db = require('./config/db')

const dashboardRoutes = require('./routes/dashboard')
const projectRoutes = require('./routes/projects')
const notificationRoutes = require('./routes/notifications')
const authRoutes = require("./routes/auth");

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/notifications', notificationRoutes);
app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('✅ Backend is running with MY SQL')
})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`))
