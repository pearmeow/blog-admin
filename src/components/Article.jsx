import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

function Article() {
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        (async () => {
            const data = await fetch("http://localhost:3000/posts");
            if (!data.ok) {
                return;
            }
            const res = await data.json();
            setPosts(res);
        })();
    }, []);
    const articles = [];
    if (posts) {
        posts.forEach((elem) => {
            articles.push(
                <ArticleCard
                    key={elem.id}
                    title={elem.title}
                    text={elem.text}
                />,
            );
        });
    }

    return <>{articles}</>;
}

export default Article;
