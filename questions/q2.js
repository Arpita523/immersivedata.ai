import express from 'express';
import evaluateWorkflow from './q1.js';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/evaluate', (req, res) => {
    const documents = req.body;

    if (!Array.isArray(documents)) {
        return res.status(400).json({
            error: "Invalid input. Expected an array of documents."
        });
    }

    const result = evaluateWorkflow(documents);
    res.json(result);
});

app.listen(port, () => {
    console.log(`-----------------------------------------`);
    console.log(`🚀 Q2 Service running at http://localhost:${port}`);
    console.log(`-----------------------------------------`);
});
