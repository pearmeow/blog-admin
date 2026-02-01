import Login from "./components/Login";
import Register from "./components/Register";
import Posts from "./components/Posts";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post.jsx";

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
    {
        Component: Post,
        path: "/posts/:postId",
    },
];

export default routes;
