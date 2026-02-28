const express = require('express');
const cors = require('cors');

const app = express();
const port = 4004;

app.use(cors());

app.get("/teams", async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 4000)); // Simulate delay

    res.json({
        "teams": ['Squad A', 'Squad B', 'Squad C', 'Squad D', 'Squad E']
    });
});

app.listen(port, () => {
    console.log(`Team API is running on port ${port}`);
});