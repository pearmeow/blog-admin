import Button from "./Button";
import Form from "./Form";

function Comment({ text, author, post, commentId, update, forceUpdate }) {
    const handleDeleteComment = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch(
                import.meta.env.VITE_API +
                    "posts/" +
                    post.id +
                    "/comments/" +
                    commentId,
                {
                    method: "DELETE",
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                },
            );
            if (!res.ok) {
                console.log("handleDeleteComment fetched with error");
            } else {
                let result = await res.json();
                console.log(result);
                forceUpdate(update + 1);
            }
        } catch (err) {
            console.log(err);
            return;
        }
    };

    return (
        <>
            <p>{author.username}: </p>
            <p>{text}</p>
            <Form onSubmit={handleDeleteComment}>
                <Button type="submit" text="Delete Comment" />
            </Form>
        </>
    );
}

export default Comment;
