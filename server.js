const express = require("express");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

// server config
app.listen(PORT, () => {
  console.log(`🚀 Server is running on ${PORT}`);
});