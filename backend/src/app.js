const express = require('express');

const { checkConnection } = require('./config/db');

const app = express();

app.get('/api/health', async (req, res) => {
  const dbStatus = await checkConnection();
  

  res.json({
    status: 'OK',
    dbStatus: dbStatus ? "connected" : "disconnected", 
    timestamp: new Date().toISOString()
  });
});

module.exports = app;