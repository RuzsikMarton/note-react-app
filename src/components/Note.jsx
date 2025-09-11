import React, { use, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Note = () => {
  const [note, setNote] = React.useState({ title: "", content: "" });
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessege] = React.useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id === undefined;

  const deleteNote = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete note");
      }
      setNote({ title: "", content: "" });
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveNote = async () => {
    setIsLoading(true);
    if (isNew) {
      try {
        const res = await fetch("http://localhost:3000/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(note),
        });
        if (!res.ok) {
          throw new Error("Failed to create note");
        }
        navigate("/");
      } catch (error) {
        console.error("Error creating note:", error);
        setErrorMessege("Failed to create note");
      }
    } else {
      try {
        const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(note),
        });
        if (!res.ok) {
          throw new Error("Failed to update note");
        }
      } catch (error) {
        console.error("Error updating note:", error);
        setErrorMessege("Failed to update note");
      }
    }
    setIsLoading(false);
  };

  const fetchNote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/notes/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch note");
      }
      const data = await response.json();
      setNote(data);
    } catch (error) {
      console.error("Error fetching note:", error);
      setErrorMessage("Failed to fetch note.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isNew) {
      setNote({ title: "", content: "" });
    } else if (id) {
      fetchNote();
    }
  }, [id, isNew]);
  console.log(errorMessage)
  return (
    <div className="note">
      <h2>
        Note:{" "}
        {isLoading ? (
          <div className="flex flex-row space-x-1">
            <Spinner />
            <div>Loading...</div>
          </div>
        ) : errorMessage ? (
          <span className= "text-red-500">{errorMessage}</span>
        ) : (
          <>{isNew ? "New Note" : id}</>
        )}
      </h2>
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
        <button
          className="save"
          onClick={saveNote}
          disabled={
            (note.title?.length ?? 0) < 1 || (note.content?.length ?? 0) < 1
          }
        >
          Save
        </button>
        <button className="delete" onClick={deleteNote} disabled={!note?._id}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Note;
