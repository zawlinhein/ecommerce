import React, { useEffect, useState } from "react";

const InputBox = (props) => {
  const {
    value,
    handleChange,
    id,
    placeholder,
    regex,
    categoryList,
    ...inputProps
  } = props;
  const [isBlur, setIsBlur] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (regex) {
      const checkRegex = regex.test(value);
      setIsValid(checkRegex);
    } else {
      setIsValid(!!value);
    }
  }, [value]);
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {placeholder}
      </label>
      {id === "category" ? (
        <select
          {...inputProps}
          id={id}
          onChange={handleChange}
          value={value}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {categoryList.map((item) => (
            <option value={item}>
              {" "}
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </option>
          ))}
        </select>
      ) : id !== "description" ? (
        <input
          {...inputProps}
          id={id}
          onChange={handleChange}
          value={value}
          onBlur={() => setIsBlur(true)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      ) : (
        <textarea
          {...inputProps}
          id={id}
          value={value}
          onChange={handleChange}
          onBlur={() => setIsBlur(true)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      )}
      {isBlur && !isValid && (
        <span className="text-sm text-red-500">Invalid input!</span>
      )}
    </div>
  );
};

export default InputBox;
