import { Link } from "react-router";
function Error() {
    return (
        <>
            <p>This page doesn't exist!</p>
            <p>
                {localStorage.getItem("token") ? (
                    <Link to="/posts">Back to home</Link>
                ) : (
                    <Link to="/">Back to login</Link>
                )}
            </p>
        </>
    );
}

export default Error;
