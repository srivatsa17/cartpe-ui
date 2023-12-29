import * as React from "react";

import PropTypes from "prop-types";

export const CashIcon = ({ height, width, size, ...props }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height={height || size || "1em"}
            width={width || size || "1em"}
            {...props}
        >
            <path d="M3 6h18v12H3V6m9 3a3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3M7 8a2 2 0 01-2 2v4a2 2 0 012 2h10a2 2 0 012-2v-4a2 2 0 01-2-2H7z" />
        </svg>
    );
};

CashIcon.propTypes = {
    size: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    strokeWidth: PropTypes.number
};
