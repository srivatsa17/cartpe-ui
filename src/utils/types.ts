export type RegisterState = {
    isLoading: boolean;
    isRegistered: boolean;
    isVerified: boolean;
    error: string | null | unknown;
};

export type LoginState = {
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    error: string | null | unknown;
};

export type Category = {
    name?: string | undefined;
    slug?: string | undefined;
};

export type CategorySearchState = {
    isLoading: boolean;
    categories: Array<Category> | [];
    error: string | null | unknown;
};

export interface ErrorResponse {
    response?: {
        data?: {
            detail?: string;
            message?: string;
        };
    };
}
