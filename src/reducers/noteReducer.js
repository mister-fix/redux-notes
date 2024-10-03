import { createSlice, current } from "@reduxjs/toolkit";
import noteService from "../services/notes";

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteSlice = createSlice({
	name: "notes",
	initialState: [],
	reducers: {
		// Removed 'createNote' definition from here!
		toggleImportanceOf(state, action) {
			const id = action.payload;
			const noteToChange = state.find((n) => n.id === id);
			const changedNote = {
				...noteToChange,
				important: !noteToChange.important,
			};

			console.log(current(state));

			return state.map((note) => (note.id !== id ? note : changedNote));
		},
		// Add 'appendNote' action creator
		appendNote(state, action) {
			state.push(action.payload);
		},
		// Add 'setNotes' action creator
		setNotes(state, action) {
			return action.payload;
		},
	},
});

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;

// Define 'initializeNotes' action creator which initializes the notes
// based on the data received from the backend
export const initializeNotes = () => {
	return async (dispatch) => {
		const notes = await noteService.getAll();
		dispatch(setNotes(notes));
	};
};

// Define async 'createNote' action creator which will create new notes
// and dispatch the 'appendNote' creator to add the notes to the state
export const createNote = (content) => {
	return async (dispatch) => {
		const newNote = await noteService.createNew(content);
		dispatch(appendNote(newNote));
	};
};

export default noteSlice.reducer;
