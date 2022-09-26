
const notesContainer = document.getElementById("notes");
const addNoteButton = document.getElementById("add-note");

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", addNote);

function addNote()
{
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    }

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

function removeNote(id, element)
{

    const notes = getNotes().filter((note) => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);

}

function saveNotes(notes)
{
    localStorage.setItem("app-notes", JSON.stringify(notes));
}

function getNotes()
{
    return JSON.parse(localStorage.getItem("app-notes") || "[]");
}

function createNoteElement(id, content)
{
    const note = document.createElement("textarea");

    note.classList.add("note");
    note.id = id;
    note.value = content;
    note.placeholder = "Empty Note 😮";

    note.addEventListener("change", () => {updateNote(id, note.value)});
    note.addEventListener("dblclick", () => {
        const doDelete = confirm(
            "Are you sure you wish to delete this sticky note?"
        );

        if (doDelete) {
            removeNote(id, note);
          }
    });

    return note;

}

function updateNote(id, newContent)
{
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id == id)[0];
  
    targetNote.content = newContent;
    saveNotes(notes);
}