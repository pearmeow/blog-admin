import { useEffect, useState } from "react";
import { redirect } from "react-router";
import PostCard from "./PostCard";
import isAuthorized from "../auth.jsx";

function Posts() {
    if (!isAuthorized()) {
        redirect("/");
    }
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("http://localhost:3000/posts");
                if (!res.ok) {
                    return;
                }
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);
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
