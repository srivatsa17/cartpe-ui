import * as React from "react";

import PropTypes from "prop-types";

export default function EmailIcon({ height, width, size, ...props }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height={height || size || 20}
            width={width || size || 20}
            {...props}
        >
            <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6m-2 0l-8 5-8-5h16m0 12H4V8l8 5 8-5v10z" />
        </svg>
    );
}

EmailIcon.propTypes = {
    size: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
};
