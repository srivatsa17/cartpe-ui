import * as React from "react";

import PropTypes from "prop-types";

export const ExchangeIcon = ({ height, width, size, ...props }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height={height || size || "1em"}
            width={width || size || "1em"}
            {...props}
        >
            <path d="M21.71 9.29l-4-4a1 1 0 00-1.42 1.42L18.59 9H7a1 1 0 000 2h14a1 1 0 00.92-.62 1 1 0 00-.21-1.09zM17 13H3a1 1 0 00-.92.62 1 1 0 00.21 1.09l4 4a1 1 0 001.42 0 1 1 0 000-1.42L5.41 15H17a1 1 0 000-2z" />
        </svg>
    );
};

ExchangeIcon.propTypes = {
    size: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
};
