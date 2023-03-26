import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import type { RootState } from "./redux";
import { setTheme } from "./redux/slices/theme";
import useIsLoggedIn from "./hooks/useIsLoggedIn";
import { routes } from "./pages";
import useIsAdmin from "./hooks/useIsAdmin";

function App() {
	const navigate = useNavigate();
	let isLoggedIn = useIsLoggedIn();

	const theme = useSelector((state: RootState) => state.theme.mode);
	const dispatch = useDispatch();
	const lsTheme = localStorage.getItem("theme");

	const isAdmin = useIsAdmin();
	useEffect(() => {
		console.log();
	}, [isAdmin]);

	useEffect(() => {
		lsTheme === null ? dispatch(setTheme("light")) : dispatch(setTheme(lsTheme));
	}, []);

	useEffect(() => {
		!isLoggedIn && navigate("/login");
	}, [isLoggedIn]);

	return (
		<>
			<Routes>
				{routes.map(({ id, path, Element }) => (
					<Route path={path} element={<Element />} key={id} />
				))}
			</Routes>

			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				rtl={false}
				pauseOnFocusLoss={false}
				theme="light"
				closeOnClick
				draggable
				pauseOnHover
			/>
		</>
	);
}

export default App;
