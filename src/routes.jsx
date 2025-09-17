import Login from "./components/Login";
import Posts from "./components/Posts";

const routes = [
    {
        Component: Login,
        path: "/",
    },
    // {
    //     Component: ,
    //     path: "/register",
    // },
    {
        Component: Posts,
        path: "/posts",
    },
    // {
    //     path: "/posts/:id",
    // },
];

export default routes;
