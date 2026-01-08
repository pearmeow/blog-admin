import Login from "./components/Login";
import Register from "./components/Register";
import Posts from "./components/Posts";
import CreatePost from "./components/CreatePost";

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
    {
        Component: CreatePost,
        path: "/posts/new",
    },
    // {
    //     path: "/posts/:id",
    // },
];

export default routes;
