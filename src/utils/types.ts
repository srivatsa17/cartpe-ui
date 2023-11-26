export type LoginState = {
    isLoading: boolean;
    isLoggedIn: boolean;
    error: string | null | unknown;
}

export interface ErrorResponse {
    response?: {
        data?: {
            detail?: string;
            message?: string;
        };
    };
}
