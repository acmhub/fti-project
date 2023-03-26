import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { store } from "./redux";

import "react-toastify/dist/ReactToastify.min.css";
import "./tailwind.css";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<CookiesProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</CookiesProvider>
		</Provider>
	</React.StrictMode>
);
