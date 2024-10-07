import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

import { LOGIN_USER_SCREEN } from "constants/routes";
import React from "react";
import { useNavigate } from "react-router-dom";

function AnonymousUserProfile() {
    const navigate = useNavigate();

    const handleUserLogin = () => {
        navigate(LOGIN_USER_SCREEN);
    };

    return (
        <Dropdown placement="bottom" className="mt-1">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    showFallback
                    className="transition-transform"
                    color="danger"
                    size="sm"
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem color="danger" className="text-danger" onClick={handleUserLogin}>
                    Login
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default AnonymousUserProfile;
