import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import isAuthorized from "../auth.jsx";
import { useParams } from "react-router";
import Form from "./Form.jsx";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import Comment from "./Comment.jsx";
import Logout from "./Logout.jsx";

function Post() {
    const [post, setPost] = useState(null);
    let navigate = useNavigate();
    let params = useParams();
    const postId = Number(params.postId);
    useEffect(() => {
        (async () => {
            if (!isAuthorized()) {
                navigate("/");
            }
            try {
                const res = await fetch(
                    import.meta.env.VITE_API + "posts/" + postId,
                );
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
    }, [navigate, postId]);

    const handleUpdatePost = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get("title");
        const text = formData.get("text");
        const published = formData.get("published");
        try {
            const res = await fetch(
                import.meta.env.VITE_API + "posts/" + (post ? post.id : ""),
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                    body: JSON.stringify({
                        postId,
                        title,
                        text,
                        published,
                    }),
                },
            );
            if (!res.ok) {
                console.log("joever");
            } else {
                let result = await res.json();
                console.log(result);
                navigate("/posts");
            }
        } catch (err) {
            console.log(err);
            return;
        }
    };

    console.log(post ? post.published : false);
    if (!post) {
        return (
            <>
                <p>This post doesn't exist!</p>
                <Link to="/posts">Back to posts</Link>
                <Logout />
            </>
        );
    }

    let comments = [];
    for (const comm of post.comments) {
        comments.push(
            <Comment
                key={comm.id}
                commentId={comm.id}
                author={comm.author}
                text={comm.text}
            />,
        );
    }

    return (
        <>
            <Form onSubmit={handleUpdatePost}>
                <Input
                    type="text"
                    labelName="Title"
                    name="title"
                    id={1}
                    defaultValue={post ? post.title : ""}
                />
                <p>
                    <label htmlFor={2}>Article body</label>
                </p>
                <p>
                    <textarea
                        id={2}
                        name="text"
                        defaultValue={post ? post.text : ""}
                    />
                </p>
                <Input
                    type="checkbox"
                    // kinda hacky and weird
                    key={post ? post.published : ""}
                    labelName="Published"
                    name="published"
                    id={3}
                    defaultChecked={post ? post.published : ""}
                />
                <Button type="submit" text="Submit" />
            </Form>
            {comments.length == 0 ? <p>No comments yet!</p> : <p>Comments</p>}
            {comments}
            <Link to="/posts">Back to posts</Link>
            <Logout />
        </>
    );
}

export default Post;
