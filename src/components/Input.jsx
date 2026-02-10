import "./Input.module.css";

function Input({
    type,
    labelName,
    name,
    id,
    defaultValue,
    defaultChecked,
    required,
    minLen,
    maxLen,
}) {
    return (
        <>
            <p>
                <label htmlFor={id}>{labelName} </label>
                <input
                    id={id}
                    type={type}
                    name={name}
                    defaultValue={defaultValue}
                    defaultChecked={defaultChecked}
                    required={required}
                    minLength={minLen}
                    maxLength={maxLen}
                />
            </p>
        </>
    );
}

export default Input;
