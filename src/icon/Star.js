import React from "react";

const SVG = ({
                 style = {},
                 fill = "#586069",
                 width = "14px",
                 height = "16px",
                 className = "",
                 viewBox = "0 0 14 16",
             }) => (
    <svg
        width={width}
        style={style}
        fill={fill}
        height={height}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className={`svg-icon ${className || ""}`}
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <path d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z">
        </path>
    </svg>
);

export default SVG;
