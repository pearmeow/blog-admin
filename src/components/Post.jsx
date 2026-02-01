import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import isAuthorized from "../auth.jsx";
import { useParams } from "react-router";
import Form from "./Form.jsx";
import Input from "./Input.jsx";
import Button from "./Button.jsx";

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
        // declare form variables to get
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
                        postId: postId,
                        // put title gotten from form here
                        title: "temp",
                        text: "temp",
                        published: "temp",
                    }),
                },
            );
            if (!res.ok) {
                console.log("joever");
            } else {
                let result = await res.json();
                console.log(result);
                navigate("/posts/" + post.id);
            }
        } catch (err) {
            console.log(err);
            return;
        }
    };

    return (
        <>
            <p>{post && post.id}</p>
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
                    labelName="Published"
                    name="published"
                    id={3}
                    defaultValue={post ? post.published : false}
                />
                <Button type="submit" text="Submit" />
            </Form>
            <Link to="/posts">Back to posts</Link>
        </>
    );
}

export default Post;
