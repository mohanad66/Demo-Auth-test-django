import React, { useEffect, useState } from 'react'
import api from '../api'
import "../styles/Home.css"
import Note from '../componenets/Note'
export default function Home() {
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")
    useEffect(() => {
        getNotes();
    }, []);
    const getNotes = () => {
        api
            .get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };
    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) console.log("Note Deleted!")
                else console.log("Failed to Delete note.")
                getNotes();
            }).catch((err) => alert(err))
    }
    const createNote = (e) => {
        e.preventDefault()
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) console.log("Note Created!")
                else console.log("Failed Creating Note.")
                getNotes();

            }).catch((err) => alert(err))

    }
    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} id={crypto.randomUUID()} />
                ))}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title"> Title : </label>
                <br />
                <input type="text" id="title" className="title" name='title' required onChange={(e) => setTitle(e.target.value)} />
                <br />
                <label htmlFor="content"> Content : </label>
                <br />
                <textarea id="content" className="content" value={content} name='content' required onChange={(e) => setContent(e.target.value)} ></textarea>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
