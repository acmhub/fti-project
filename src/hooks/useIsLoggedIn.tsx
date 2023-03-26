import { useCookies } from "react-cookie";

function useIsLoggedIn() {
	const [cookies, setCookie] = useCookies(["user"]);
	return cookies.user ? cookies.user.isLoggedIn : false;
}

export default useIsLoggedIn;
