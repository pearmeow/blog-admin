import Login from "./components/Login";
import Register from "./components/Register";
import Posts from "./components/Posts";

const routes = [
    {
        Component: Login,
        path: "/",
    },
    {
        Component: Register,
        path: "/register",
    },
    {
        Component: Posts,
        path: "/posts",
    },
    // {
    //     path: "/posts/:id",
    // },
];

export default routes;
