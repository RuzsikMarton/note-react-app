import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI, { dbName: "notesapp" })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const app = express();
const PORT = process.env.PORT || 3000;

const noteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    lastUpdated: { type: Date, default: Date.now },
  },
  { collection: "test-data" }
);

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

const Notes = mongoose.model("Notes", noteSchema);

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Notes.find().sort({ lastUpdated: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes", error: err });
  }
});

app.get("/api/notes/:id", async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Error fetching note", error: err });
  }
});

app.post("/api/notes", async (req, res) => {
  try {
    const newNote = new Notes(req.body);
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: "Error creating note", error: err });
  }
});


app.delete("/api/notes/:id", async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    await note.deleteOne();
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note", error: err });
  }
});

app.put("/api/notes/:id", async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    note.title = req.body.title;
    note.content = req.body.content;
    note.lastUpdated = Date.now(); 
    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Error updating note", error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
