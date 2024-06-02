import { Button } from "@nextui-org/react";
import { GoogleIcon } from "icons/GoogleIcon";
import React from "react";
import { useSearchParams } from "react-router-dom";

function GoogleRegisterButton() {
    const [queryParams, setQueryParams] = useSearchParams();

    const openGoogleRegisterPage = React.useCallback(() => {
        const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";

        const scope = [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
        ].join(" ");

        if (
            process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID &&
            process.env.REACT_APP_GOOGLE_OAUTH_REGISTER_REDIRECT_URL
        ) {
            queryParams.set("response_type", "code");
            queryParams.set("client_id", process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID);
            queryParams.set(
                "redirect_uri",
                process.env.REACT_APP_GOOGLE_OAUTH_REGISTER_REDIRECT_URL
            );
            queryParams.set("prompt", "select_account");
            queryParams.set("scope", scope);
            setQueryParams(queryParams);

            const url = `${googleAuthUrl}?${queryParams}`;
            window.location.href = url;
        }
    }, []);

    return (
        <Button
            type="submit"
            className="max-w-md text-lg bg-default-900 text-white"
            fullWidth
            size="lg"
            variant="flat"
            onClick={openGoogleRegisterPage}
        >
            <div className="flex items-center justify-center gap-2">
                <GoogleIcon height={30} width={30} />
                Sign up with Google
            </div>
        </Button>
    );
}

export default GoogleRegisterButton;
