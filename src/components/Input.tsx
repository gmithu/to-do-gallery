import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string
    className?: string
    variant?: "default" | "search"
}

export default function Input({ label, className = "", variant = "default", ...rest }: InputProps) {
    const { placeholder, ...inputRest } = rest;
    const variantClasses = variant === "search" ? " w-full h-12 " : "";
    return (
        <div>
            <input
                type="text"
                placeholder={placeholder || label || "Enter value"}
                className={`border border-slate-300 rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-slate-400 focus:outline-none transition-all duration-200 shadow-sm bg-slate-50  ${variantClasses} ${className}`}
                {...inputRest}
            />

        </div>
    )
}
