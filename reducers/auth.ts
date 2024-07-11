import { Reducer, ReducerState } from "react";

type AuthAction =
    | { type: 'RESTORE_TOKEN'; token: string }
    | { type: 'SIGN_IN'; token: string }
    | { type: 'SIGN_OUT' };

interface AuthState {
  isLoading: boolean,
  isSignout: boolean,
  userToken: string | null,
}

const authReducer = (prevState: AuthState, action: AuthAction) => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            };
        case 'SIGN_IN':
            console.log('reducer signin case');

            return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            };
        case 'SIGN_OUT':
            return {
            ...prevState,
            isSignout: true,
            userToken: null,
            };
        default:
            return {
                ...prevState,
                isSignout: true,
                userToken: null,
              };
    }
}

export {authReducer, AuthAction, AuthState}
