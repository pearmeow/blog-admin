import { useState } from "react";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import { useNavigate } from "react-router";

function CreatePost() {
    let [errorMessage, setErrorMessage] = useState(null);
    let navigate = useNavigate();
    const handleCreatePost = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get("title");
        const text = formData.get("text");
        const published = formData.get("published");
        try {
            const res = await fetch(import.meta.env.VITE_API + "posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    title,
                    text,
                    published,
                }),
            });
            if (res.ok) {
                let stuff = await res.json();
                console.log(stuff);
                navigate("/posts");
            } else {
                setErrorMessage(res.ok);
            }
        } catch (err) {
            console.log(err);
            setErrorMessage("Failed to fetch from api");
            return;
        }
    };

    return (
        <>
            <p>Create new post</p>
            <p>{errorMessage}</p>
            <Form onSubmit={handleCreatePost}>
                <Input type="text" labelName="Title" name="title" id={1} />
                <Input type="text" labelName="Text" name="text" id={2} />
                <Input
                    type="checkbox"
                    labelName="Published"
                    name="published"
                    id={3}
                />
                <Button type="submit" text="Submit" />
            </Form>
        </>
    );
}

export default CreatePost;
