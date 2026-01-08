import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PostCard from "./PostCard";
import isAuthorized from "../auth.jsx";

function Posts() {
    const [posts, setPosts] = useState(null);
    let navigate = useNavigate();
    useEffect(() => {
        (async () => {
            if (!isAuthorized()) {
                navigate("/");
            }
            try {
                const res = await fetch(import.meta.env.VITE_API + "posts");
                if (!res.ok) {
                    console.log("joever");
                    return;
                }
                const data = await res.json();
                console.log(data);
                setPosts(data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [navigate]);
    const pagePosts = [];
    if (posts) {
        posts.forEach((elem) => {
            pagePosts.push(
                <PostCard key={elem.id} title={elem.title} text={elem.text} />,
            );
        });
    }

    return <>{pagePosts}</>;
}

export default Posts;
