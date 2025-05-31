// src/components/Searchbar/SearchBar.jsx
import React from "react";
import searchIcon from "../../assets/search.svg";

export default function SearchBar({
  placeholder = "Search…",
  wrapperClassName = "",
  inputClassName = "",
  buttonClassName = "",
  iconClassName = "",
  ...rest
}) {
  return (
    <div className={`flex w-full ${wrapperClassName}`}>
      <input
        type="text"
        placeholder={placeholder}
        className={`
          flex-1 rounded-l-full px-5 py-3 text-sm focus:outline-none
          ${inputClassName}
        `}
        {...rest}
      />
      <button
        className={`
          px-5 py-3 rounded-r-full flex items-center justify-center
          ${buttonClassName}
        `}
      >
        <img src={searchIcon} alt="search" className={iconClassName} />
      </button>
    </div>
  );
}
