const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('OfficeSpaceManagement backend radi!');
});

app.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}`);
});
