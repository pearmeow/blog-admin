import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";

function Login() {
    const [errorMessage, setErrorMessage] = useState(null);
    const handleLogin = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get("username");
        const password = formData.get("password");
        try {
            const token = await fetch("http://localhost:3000/tokens/authors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            if (token.ok) {
                const jwt = await token.json();
                localStorage.setItem("token", jwt);
                setErrorMessage("Username or password is right");
                // TODO: redirect to posts
            } else {
                // TODO: Give some error message
                setErrorMessage("Username or password is wrong");
                console.log(errorMessage);
            }
        } catch (err) {
            // TODO: Give some error message
            console.log(err);
            setErrorMessage("Something went wrong and I don't know what!");
            return;
        }
    };
    return (
        <>
            <p>{errorMessage}</p>
            <Form onSubmit={handleLogin}>
                <Input
                    type="text"
                    labelName="Username"
                    name="username"
                    id={1}
                />
                <Input
                    type="password"
                    labelName="Password"
                    name="password"
                    id={2}
                />
                <Button type="submit" text="Submit" />
            </Form>
        </>
    );
}

export default Login;
