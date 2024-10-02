import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App.jsx";

import noteReducer, { appendNote } from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer.js";
import noteService from "./services/notes";

const store = configureStore({
	reducer: {
		notes: noteReducer,
		filter: filterReducer,
	},
});

console.log(store.getState());

noteService.getAll().then((notes) => {
	notes.forEach((note) => store.dispatch(appendNote(note)));
});

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);
