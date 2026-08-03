import React, { useId } from "react";

const Input = React.forwardRef(function Input(
    {
        label,
        type = "text",
        className = "",
        ...props
    },
    ref
) {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="inline-block mb-1 pl-1"
                >
                    {label}
                </label>
            )}

            <input
                id={id}
                type={type}
                ref={ref}
                className={`w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-black outline-none duration-200 focus:bg-gray-50 ${className}`}
                {...props}
            />
        </div>
    );
});

export default Input;