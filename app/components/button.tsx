import React from "react";
import clsx from "clsx";

type ButtonProps = {
    button: string;
    variants: "primary" | "secondary" | "danger";
    onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({button, variants = "primary", onClick}) => {
    const buttonClasses = clsx(
        "px-10 py-2 rounded-md font-semidbold transition",{
            "bg-blue-500 text-white hover:bg-blue-600": variants === "primary",
            "bg-gray-500 text-white hover:bg-gray-600": variants === "secondary",
            "bg-red-500 text-white hover:bg-red-600": variants === "danger",
        }
    );
    return (
        <button className={buttonClasses} onClick={onClick} type="submit">
            {button}
        </button>
    );
};

export default Button;