import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";

function Register() {
    const [errorMessage, setErrorMessage] = useState(null);
    const handleRegister = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get("username");
        const password = formData.get("password");
        const confirm = formData.get("confirm");
        const authorcode = formData.get("authorcode");
        try {
            const res = await fetch(import.meta.env.VITE_API + "authors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                    confirm,
                    authorcode,
                }),
            });
            if (res.ok) {
                let stuff = await res.json();
                console.log(stuff);
            } else {
                setErrorMessage("Username or password is wrong");
            }
        } catch (err) {
            console.log(err);
            setErrorMessage("Failed to fetch from api");
            return;
        }
    };
    return (
        <>
            <p>Register</p>
            <p>{errorMessage}</p>
            <Form onSubmit={handleRegister}>
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
                <Input
                    type="password"
                    labelName="Confirm Password"
                    name="confirm"
                    id={3}
                />
                <Input type="text" labelName="Code" name="authorcode" id={4} />
                <Button type="submit" text="Submit" />
            </Form>
        </>
    );
}

export default Register;
