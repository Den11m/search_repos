import React from "react";

import Star from "./Star";

const Icon = ({name, ...other}) => {
    switch (name) {
        case "star":
            return <Star {...other} />;
        default:
            return;
    }
};

export default Icon;
