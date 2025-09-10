import "./styles/App.css";
import { useState, useEffect } from "react";

function App() {
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        (async () => {
            const data = await fetch("http://localhost:3000/posts");
            if (!data.ok) {
                return;
            }
            const res = await data.json();
            console.log(res);
            setPosts(res);
        })();
    }, []);
    return (
        <>
            <p>{posts ? posts[0].text : ""}</p>
        </>
    );
}

export default App;
