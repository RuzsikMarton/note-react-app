import React, { use, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [notes, setNotes] = React.useState([]);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="home">
      <h2>All Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <div className="note-preview">
              <Link to={`/note/${note._id}`}>
                <h3>{note.title}</h3>
              </Link>
              <p>
                {note.content.length > 25
                  ? note.content.slice(0, 25) + " . . ."
                  : note.content}
              </p>
            </div>
            <span>
              Last Updated: {new Date(note.lastUpdated).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
