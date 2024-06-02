import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import BadRequest400 from "screens/Error/BadRequest400";
import EditProfileDetails from "components/EditProfileScreen/EditProfileDetails";
import EditProfileSkeleton from "components/EditProfileScreen/EditProfileSkeleton";
import { HOME_SCREEN } from "constants/routes";
import React from "react";
import { getProfile } from "redux/AuthService/profileSlice";

function EditProfileScreen() {
    const dispatch = useReduxDispatch();
    const { user, isLoading } = useReduxSelector((state) => state.profile);

    React.useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    return isLoading === false ? (
        user ? (
            <div className="container mx-auto px-6 py-7">
                <Breadcrumbs className="mb-3" size="lg">
                    <BreadcrumbItem href={HOME_SCREEN}>Home</BreadcrumbItem>
                    <BreadcrumbItem isCurrent isLast>
                        Edit Profile
                    </BreadcrumbItem>
                </Breadcrumbs>
                <div>
                    <EditProfileDetails user={user} />
                </div>
            </div>
        ) : (
            <BadRequest400 />
        )
    ) : (
        <div className="container mx-auto px-6 py-7">
            <EditProfileSkeleton />
        </div>
    );
}

export default EditProfileScreen;
