import { BAD_REQUEST_400 } from "constants/images";
import { Image } from "@nextui-org/react";
import React from "react";

function BadRequest400() {
    return (
        <div className="container mx-auto px-6 py-7">
            <div className="grid grid-cols-2 items-center text-center">
                <Image src={BAD_REQUEST_400} />
                <div className="text-3xl">Oops! Something went wrong!</div>
            </div>
        </div>
    );
}

export default BadRequest400;
