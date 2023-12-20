import * as React from "react";

import PropTypes from "prop-types";

export const RupeeIcon = ({ height, width, size, ...props }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height={height || size || 20}
        width={width || size || 20}
        {...props}
    >
        <path d="M13.66 7c-.56-1.18-1.76-2-3.16-2H6V3h12v2h-3.26c.48.58.84 1.26 1.05 2H18v2h-2c-.27 2.8-2.63 5-5.5 5h-.73l6.73 7h-2.77L7 14v-2h3.5c1.76 0 3.22-1.3 3.46-3H6V7h7.66z" />
    </svg>
);

RupeeIcon.propTypes = {
    size: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
};
