var express = require('express');
var data = require('./data/data.json');

const app = express();
const PORT = 3000;

app.get('/', (req, res) =>
    res.json(data)
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(data);
});
