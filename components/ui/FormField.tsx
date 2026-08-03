type FormFieldOption = {
  label: string;
  value: string;
};

type FormFieldProps = {
  id: string;
  label: string;
  name?: string;
  type?: "text" | "email" | "tel" | "select" | "textarea";
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  options?: FormFieldOption[];
  fullWidth?: boolean;
};

export function FormField({
  id,
  label,
  name = id,
  type = "text",
  placeholder,
  helperText,
  required = false,
  options = [],
  fullWidth = false,
}: FormFieldProps) {
  const helperId = helperText ? `${id}-help` : undefined;
  const className = [
    "form-field",
    `form-field--${type}`,
    fullWidth ? "form-field--full" : "",
  ]
    .filter(Boolean)
    .join(" ");
  const sharedProps = {
    className: "form-control",
    id,
    name,
    required,
  };

  return (
    <div className={className}>
      <label className="form-field__label" htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>

      {type === "textarea" ? (
        <textarea
          {...sharedProps}
          aria-describedby={helperId}
          placeholder={placeholder ?? " "}
          rows={6}
        />
      ) : type === "select" ? (
        <select {...sharedProps} aria-describedby={helperId} defaultValue="">
          <option disabled value="">
            {placeholder ?? "Select an option"}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...sharedProps}
          aria-describedby={helperId}
          placeholder={placeholder ?? " "}
          type={type}
        />
      )}

      {helperText ? (
        <span className="form-field__help" id={helperId}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
}
