import * as React from "react";

import PropTypes from "prop-types";

export const TruckFastIcon = ({ height, width, size, ...props }) => {
    return (
        <svg
            viewBox="0 0 640 512"
            fill="currentColor"
            height={height || size || "1em"}
            width={width || size || "1em"}
            {...props}
        >
            <path d="M112 0C85.5 0 64 21.5 64 48v48H16c-8.8 0-16 7.2-16 16s7.2 16 16 16h256c8.8 0 16 7.2 16 16s-7.2 16-16 16H48c-8.8 0-16 7.2-16 16s7.2 16 16 16h192c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16 7.2-16 16s7.2 16 16 16h192c8.8 0 16 7.2 16 16s-7.2 16-16 16H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zm432 237.3V256H416v-96h50.7l77.3 77.3zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm368-48c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48z" />
        </svg>
    );
};

TruckFastIcon.propTypes = {
    size: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    strokeWidth: PropTypes.number
};
