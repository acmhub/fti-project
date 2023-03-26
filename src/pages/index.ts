import Dashboard from "./dashboard";
import Projects from "./projects";
import Clients from "./clients";
import Tasks from "./tasks";
import Reports from "./reports";
import Users from "./users";

import ProjectPage from "./dynamic/project";
import ClientPage from "./dynamic/client";
import ProfilePage from "./dynamic/profile";

import AddProject from "./add/project";
import AddClient from "./add/client";

import Login from "./auth/login";
import Signup from "./auth/signup";
import NotFound from "./notfound";

export const routes = [
	{
		id: 1,
		path: "/",
		Element: Dashboard,
	},
	{
		id: 2,
		path: "/projects",
		Element: Projects,
	},
	{
		id: 3,
		path: "/clients",
		Element: Clients,
	},
	{
		id: 4,
		path: "/tasks",
		Element: Tasks,
	},
	{
		id: 5,
		path: "/reports",
		Element: Reports,
	},
	{
		id: 6,
		path: "/users",
		Element: Users,
	},

	{
		id: 7,
		path: "/project/:projectId",
		Element: ProjectPage,
	},
	{
		id: 8,
		path: "/client/:clientId",
		Element: ClientPage,
	},
	{
		id: 9,
		path: "/profile/:userId",
		Element: ProfilePage,
	},

	{
		id: 10,
		path: "/add-project",
		Element: AddProject,
	},
	{
		id: 11,
		path: "/add-client",
		Element: AddClient,
	},

	{
		id: 12,
		path: "/login",
		Element: Login,
	},
	{
		id: 13,
		path: "/sign-up",
		Element: Signup,
	},
	{
		id: 14,
		path: "*",
		Element: NotFound,
	},
];
