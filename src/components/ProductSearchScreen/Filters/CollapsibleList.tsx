import React from "react";

interface CollapsibleList {
    title: string;
    children: React.ReactNode;
    actionButton?: React.ReactNode;
    defaultVisible?: boolean;
}

function CollapsibleList({ title, children, defaultVisible }: CollapsibleList) {
    const [visible, setVisible] = React.useState(defaultVisible);

    const handleButtonClick = () => {
        setVisible((visible) => !visible);
    };

    return (
        <div>
            <div>
                <button onClick={handleButtonClick}>
                    <div className="uppercase font-semibold pb-2">{title}</div>
                </button>
            </div>
            {visible ? <div>{children}</div> : null}
        </div>
    );
}

export default CollapsibleList;
