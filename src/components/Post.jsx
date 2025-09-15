import { useEffect, useState } from "react";
import PostCard from "./PostCard";

function Post() {
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:3000/posts");
            if (!res.ok) {
                return;
            }
            const data = await res.json();
            setPosts(data);
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

export default Post;
