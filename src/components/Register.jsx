import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

function Register() {
    const [errorMessage, setErrorMessage] = useState([]);
    const nav = useNavigate();
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
                nav("/");
            } else {
                let result = await res.json();
                let errs = [];
                for (const elem of result) {
                    errs.push(<p>{elem.msg}</p>);
                }
                setErrorMessage(errs);
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
            {errorMessage}
            <Form onSubmit={handleRegister}>
                <Input
                    type="text"
                    labelName="Username"
                    name="username"
                    id={1}
                    required={true}
                    minLen={8}
                />
                <Input
                    type="password"
                    labelName="Password"
                    name="password"
                    id={2}
                    required={true}
                    minLen={8}
                    maxLen={32}
                />
                <Input
                    type="password"
                    labelName="Confirm Password"
                    name="confirm"
                    id={3}
                    required={true}
                    minLen={8}
                    maxLen={32}
                />
                <Input
                    type="text"
                    labelName="Code (for author creation)"
                    name="authorcode"
                    id={4}
                    required={true}
                />
                <Button type="submit" text="Submit" />
            </Form>
            <Link to="/">Back to login</Link>
        </>
    );
}

export default Register;
