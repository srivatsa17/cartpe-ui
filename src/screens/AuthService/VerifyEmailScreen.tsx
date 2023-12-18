import {
    EMAIL_VERIFICATION_FAILURE_IMAGE,
    EMAIL_VERIFICATION_SUCCESS_IMAGE
} from "constants/images";
import { Image, Spacer } from "@nextui-org/react";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import React from "react";
import { useParams } from "react-router-dom";
import { verifyUserEmail } from "redux/AuthService/registerSlice";

function VerifyEmailScreen() {
    const { id, token } = useParams();
    const dispatch = useReduxDispatch();

    const [verifiedStatus, setVerifiedStatus] = React.useState(false);

    const userRegisterDetails = useReduxSelector((state) => state.userRegisterDetails);
    const { error, isLoading, isRegistered, isVerified } = userRegisterDetails;

    if (!verifiedStatus && !isLoading && !isVerified && id && token) {
        dispatch(verifyUserEmail(id, token));
        setVerifiedStatus(true);
    }

    return (
        <div className="container mx-auto place-content-center">
            <div className="flex flex-wrap items-center justify-center">
                <div className="xs:w-2/3 sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-1/2">
                    {!isLoading && isRegistered && isVerified ? (
                        <>
                            <div className="my-7">
                                The email verification process has been completed successfully. You
                                may now close this tab.
                            </div>
                            <Spacer y={5} />
                            <Image
                                src={EMAIL_VERIFICATION_SUCCESS_IMAGE}
                                alt="email-verification"
                            />
                        </>
                    ) : error ? (
                        <>
                            <div className="my-7">
                                The email verification has failed due to either an invalid token or
                                non-existent user. Try again after a while.
                            </div>
                            <Spacer y={5} />
                            <Image
                                src={EMAIL_VERIFICATION_FAILURE_IMAGE}
                                alt="email-verification"
                            />
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default VerifyEmailScreen;
