interface AuthState {
    isAuthenticated: boolean;
}

// eslint-disable-next-line prefer-const
let authState: AuthState = {
    isAuthenticated: false
};

export const setAuth = (state: boolean) => {
    authState.isAuthenticated = state;
};

export const checkAuth = () => {
    return authState;
};

export const authLoader = () => {
    const auth = checkAuth();
    if (!auth.isAuthenticated) {
        throw new Response("Unauthorized", { status: 401 });
    }
    return null;
};