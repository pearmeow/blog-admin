import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import PostCard from "./PostCard";
import isAuthorized from "../auth.jsx";
import { useParams } from "react-router";

function Post() {
    const [post, setPost] = useState(null);
    let navigate = useNavigate();
    let params = useParams();
    params.postId;
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
                setPost(data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [navigate]);
    const pagePosts = [];
    if (post) {
        post.forEach((elem) => {
            pagePosts.push(
                <PostCard
                    key={elem.id}
                    title={elem.title}
                    text={elem.text}
                    id={elem.id}
                />,
            );
        });
    }

    return (
        <>
            {pagePosts}
            <Link to="/posts/new">New post</Link>
        </>
    );
}

export default Post;
