function Input({ type, labelName, name, id, defaultValue }) {
    return (
        <>
            <p>
                <label htmlFor={id}>{labelName} </label>
                <input
                    id={id}
                    type={type}
                    name={name}
                    defaultValue={defaultValue}
                />
            </p>
        </>
    );
}

export default Input;
