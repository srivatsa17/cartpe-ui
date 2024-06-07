import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    User
} from "@nextui-org/react";
import {
    CHANGE_PASSWORD_SCREEN,
    CONTACT_US_SCREEN,
    EDIT_PROFILE_SCREEN,
    LOGIN_USER_SCREEN,
    ORDER_SCREEN,
    SAVED_ADDRESSES_SCREEN,
    WISHLIST_SCREEN
} from "constants/routes";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import React from "react";
import { logoutUser } from "redux/AuthService/loginSlice";
import { useNavigate } from "react-router-dom";

function Profile() {
    const dispatch = useReduxDispatch();
    const navigate = useNavigate();
    const loginDetails = useReduxSelector((state) => state.userLoginDetails);
    const { isLoggedIn, email, firstName, lastName } = loginDetails;

    const handleUserLogout = () => {
        dispatch(logoutUser());
    };

    React.useEffect(() => {
        if (isLoggedIn === false) {
            navigate(LOGIN_USER_SCREEN);
        }
    }, [isLoggedIn, navigate]);

    return (
        <Dropdown placement="bottom" className="mt-1">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    showFallback
                    className="transition-transform"
                    color="danger"
                    name={firstName ? (lastName ? firstName + " " + lastName : firstName) : ""}
                    size="sm"
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem isReadOnly showDivider>
                    <User
                        name={firstName ? (lastName ? firstName + " " + lastName : firstName) : ""}
                        description={email}
                        classNames={{
                            name: "text-default-600",
                            description: "text-default-500"
                        }}
                        avatarProps={{
                            size: "sm"
                        }}
                    />
                </DropdownItem>
                <DropdownItem href={ORDER_SCREEN} className="text-default-600">
                    Orders
                </DropdownItem>
                <DropdownItem href={WISHLIST_SCREEN} className="text-default-600">
                    Wishlist
                </DropdownItem>
                <DropdownItem href={CONTACT_US_SCREEN} showDivider className="text-default-600">
                    Contact Us
                </DropdownItem>
                <DropdownItem href={SAVED_ADDRESSES_SCREEN} className="text-default-600">
                    Saved Addresses
                </DropdownItem>
                <DropdownItem href={EDIT_PROFILE_SCREEN} className="text-default-600">
                    Edit Profile
                </DropdownItem>
                <DropdownItem
                    href={CHANGE_PASSWORD_SCREEN}
                    showDivider
                    className="text-default-600"
                >
                    Change Password
                </DropdownItem>
                <DropdownItem color="danger" className="text-danger" onClick={handleUserLogout}>
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default Profile;
