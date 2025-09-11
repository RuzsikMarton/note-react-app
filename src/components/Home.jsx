import React, { use, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const Home = () => {
  const [notes, setNotes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const fetchNotes = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:3000/api/notes");
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setErrorMessage("Failed to fetch notes.");
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="home">
      <h2>All Notes</h2>
      {isLoading ? (
          <div className="flex flex-row space-x-1">
            <Spinner />
            <div>Loading...</div>
          </div>
        ) : errorMessage ? (
          <span className= "text-red-500">{errorMessage}</span>
        ) : (
         
        
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
      )}
    </div>
  );
};

export default Home;
