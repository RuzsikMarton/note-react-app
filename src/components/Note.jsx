import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Note = () => {
  const [note, setNote] = React.useState({ title: "", content: "" });
  const { id } = useParams();

  const fetchNote = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/notes/${id}`);
      const data = await response.json();
      setNote(data);
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <div className="note">
      <h2>Note: {note._id}</h2>
      <input
        type="text"
        placeholder="Title"
        maxLength={30}
        value={note.title ? note.title : ""}
        onChange={(e) => {
          setNote({ ...note, title: e.target.value });
        }}
      />
      <div className="textarea">
        <textarea
          placeholder="Write your note here..."
          rows={15}
          cols={50}
          maxLength={200}
          value={note.content ? note.content : ""}
          onChange={(e) => {
            setNote({ ...note, content: e.target.value });
          }}
        ></textarea>
      </div>
      <div className="note-buttons">
        <button className="save" disabled={(note.title?.length ?? 0) < 1 || (note.content?.length ?? 0) < 1}>Save</button>
        <button className="delete" disabled={!note?._id}>Delete</button>
      </div>
    </div>
  );
};

export default Note;
