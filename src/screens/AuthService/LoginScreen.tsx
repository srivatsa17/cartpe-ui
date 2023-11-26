import { Button, Image, Input, Spacer } from "@nextui-org/react";
import { HOME_SCREEN, REGISTER_USER_SCREEN, RESET_PASSWORD_SCREEN } from "constants/routes";
import { Link, useNavigate } from "react-router-dom";
import { useReduxDispatch, useReduxSelector } from "hooks/redux";

import { EyeFilledIcon } from "icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "icons/EyeSlashFilledIcon";
import { LOGIN_USER_IMAGE } from "constants/images";
import React from "react";
import { loginUser } from "redux/auth_service/loginSlice";

function LoginScreen() {
    const dispatch = useReduxDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useReduxSelector(state => state.userLoginDetails);

    const [emailValue, setEmailValue] = React.useState("");
    const [passwordValue, setPasswordValue] = React.useState("");
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

    const validateEmail = (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i);
    const validatePassword = (password: string) => password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password);

    const isEmailInvalid = React.useMemo(() => {
        if (emailValue === "") return false;
        return validateEmail(emailValue) ? false : true;
    }, [emailValue]);

    const isPasswordInvalid = React.useMemo(() => {
        if(passwordValue === "") return false;
        return validatePassword(passwordValue) ? false : true;
    }, [passwordValue]);

    const invalidPasswordMessage = () => {
        if(passwordValue.length < 8) return "Password should be at least 8 characters long.";
        else if (!/[a-zA-Z]/i.test(passwordValue)) return "Password should contain alphabets.";
        else if (!/\d/.test(passwordValue)) return "Password should contain digits.";
        return "";
    };

    React.useEffect(() => {
        if(isLoggedIn === true) {
            navigate(HOME_SCREEN);
        }
    }, [isLoggedIn, navigate, dispatch]);

    const handleLoginSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const data = { email: emailValue, password: passwordValue};
        dispatch(loginUser(data));
    };

    return (
        <div className="container mx-auto place-content-center">
            <div className="flex flex-wrap items-center justify-center">
                <div className="xs:w-2/3 sm:w-2/3 md:w-2/3 lg:w-1/2 xl:w-1/2">
                    <Image src={LOGIN_USER_IMAGE} alt="login-image" className="w-full h-auto pointer-events-none" />
                </div>
                <div className="xs:w-2/3 sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-1/2 my-7">
                    <div className="text-5xl text-center lg:text-left xl:text-left antialiased">
                        Login to <span className="font-medium">CartPe</span>!
                    </div>
                    <div>
                        <Spacer y={12} />
                        <Input
                            type="email"
                            label="Email"
                            variant="flat"
                            labelPlacement="outside"
                            description="We'll never share your email with anyone else."
                            className="max-w-md"
                            size="lg"
                            isInvalid={isEmailInvalid}
                            errorMessage={isEmailInvalid && "Please enter a valid email"}
                            value={emailValue}
                            onValueChange={setEmailValue}
                            color={emailValue ? isEmailInvalid ? "danger" : "success" : "default"}
                            isRequired
                        />
                        <Spacer y={3} />
                        <Input
                            type={isPasswordVisible ? "text" : "password"}
                            label="Password"
                            variant="flat"
                            labelPlacement="outside"
                            description="We'll never share your password with anyone else."
                            className="max-w-md"
                            size="lg"
                            isInvalid={isPasswordInvalid}
                            errorMessage={isPasswordInvalid && invalidPasswordMessage()}
                            value={passwordValue}
                            onValueChange={setPasswordValue}
                            color={passwordValue ? isPasswordInvalid ? "danger" : "success" : "default"}
                            isRequired
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {
                                        isPasswordVisible ? (
                                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )
                                    }
                                </button>
                            }
                        />
                        <Spacer y={10} />
                        <Button
                            className="w-[28rem] text-lg bg-default-900 text-white"
                            size="lg"
                            variant="flat"
                            onClick={handleLoginSubmit}
                            // isLoading
                            isDisabled={
                                emailValue.length === 0 ||
                                passwordValue.length === 0 ||
                                isEmailInvalid ||
                                isPasswordInvalid
                            }
                        >
                            Login
                        </Button>
                    </div>
                    <Spacer y={3}/>
                    <div>
                        Don&apos;t have an account?&nbsp;
                        <Link to={REGISTER_USER_SCREEN} className="text-blue-700 font-semibold">Register</Link>
                    </div>
                    <Spacer y={2}/>
                    <div>
                        Forgot Password?&nbsp;
                        <Link to={RESET_PASSWORD_SCREEN} className="text-blue-700 font-semibold">Reset</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;
