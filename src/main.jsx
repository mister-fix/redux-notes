import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./App.jsx";

import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer.js";

import { createNote } from "./reducers/noteReducer";
import { filterChange } from "./reducers/filterReducer.js";

const reducer = combineReducers({
	notes: noteReducer,
	filter: filterReducer,
});

const store = createStore(reducer);

console.log(store.getState());

store.subscribe(() => console.log(store.getState()));
store.dispatch(filterChange("IMPORTANT"));
store.dispatch(
	createNote("combineReducers forms one reducer from many simple reducers")
);

/*createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
);*/

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<App /> {/* Replaced empty div with the App component */}
		</Provider>
	</StrictMode>
);
