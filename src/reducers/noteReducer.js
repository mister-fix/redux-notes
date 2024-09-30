import { createStore } from "redux";

const noteReducer = (state = [], action) => {
	switch (action.type) {
		case "NEW_NOTE": {
			// modified to use array spread syntax
			return [...state, action.payload]; // before: return state.concat(action.payload)
		}
		case "TOGGLE_IMPORTANCE": {
			const id = action.payload.id;
			const noteToChange = state.find((n) => n.id === id);
			const changedNote = {
				...noteToChange,
				important: !noteToChange.important,
			};
			return state.map((note) => (note.id !== id ? note : changedNote));
		}
		default: {
			return state;
		}
	}
};

const store = createStore(noteReducer);

store.dispatch({
	type: "NEW_NOTE",
	payload: {
		content: "state changes are made with actions",
		important: false,
		id: 2,
	},
});

store.dispatch({
	type: "TOGGLE_IMPORTANCE",
	payload: {
		id: 2,
	},
});
