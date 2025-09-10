import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();
mongoose.connect(process.env.MONGODB_URI, {dbName: "notesapp"}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

const app = express();
const PORT = process.env.PORT || 3000;

const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
    lastUpdated: { type: Date, default: Date.now }
}, { collection: 'test-data' } );

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

const Notes = mongoose.model('Notes', noteSchema);

app.get('/api/notes', async (req, res) => {
    const notes = await Notes.find().sort({lastUpdated: -1})
    res.json(notes);
});

app.get('/api/notes/:id', async (req, res) => {
    const note = await Notes.findById(req.params.id);
    res.json(note);
});

app.post('/api/notes', async (req, res) => {
    const newNote = new Notes(req.body);
    await newNote.save();
})

app.delete('/api/notes/:id', async (req, res) => {
    await Notes.findByIdAndDelete(req.params.id);
    res.json({message: 'Note deleted'});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});