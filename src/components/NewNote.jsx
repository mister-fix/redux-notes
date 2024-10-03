import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";

const NewNote = (props) => {
	const dispatch = useDispatch();

	// Modified method: removed newNote and call to noteService to create new note
	const addNote = async (event) => {
		event.preventDefault();
		const content = event.target.note.value;
		event.target.note.value = "";
		dispatch(createNote(content));
	};

	return (
		<form onSubmit={addNote}>
			<input name="note" />
			<button type="submit">add</button>
		</form>
	);
};

export default NewNote;
