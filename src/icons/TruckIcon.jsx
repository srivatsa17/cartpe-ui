import * as React from "react";

import PropTypes from "prop-types";

export const TruckIcon = ({ height, width, size, strokeWidth, ...props }) => {
    return (
        <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth || 2}
            viewBox="0 0 24 24"
            height={height || size || "1em"}
            width={width || size || "1em"}
            {...props}
        >
            <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
            <path d="M8 18.5 A2.5 2.5 0 0 1 5.5 21 A2.5 2.5 0 0 1 3 18.5 A2.5 2.5 0 0 1 8 18.5 z" />
            <path d="M21 18.5 A2.5 2.5 0 0 1 18.5 21 A2.5 2.5 0 0 1 16 18.5 A2.5 2.5 0 0 1 21 18.5 z" />
        </svg>
    );
};

TruckIcon.propTypes = {
    size: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    strokeWidth: PropTypes.number
};
