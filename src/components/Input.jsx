function Input({ type, labelName, name, id }) {
    return (
        <>
            <p>
                <label htmlFor={id}>{labelName} </label>
                <input id={id} type={type} name={name} />
            </p>
        </>
    );
}

export default Input;
