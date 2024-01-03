export const FormValidityInitialState = {
  nameError: false,
  lastnameError: false,
  emailError: false,
  passwordError: false
};

export enum WhatToValidaty {
  VALIDATE_NAME = "VALIDATE_NAME",
  VALIDATE_LASTNAME = "VALIDATE_LASTNAME",
  VALIDATE_EMAIL = "VALIDATE_EMAIL",
  VALIDATE_PASSWORD = "VALIDATE_PASSWORD"
}

export interface FormValidityState {
  nameError: boolean;
  lastnameError: boolean;
  emailError: boolean;
  passwordError: boolean;
}

export interface FormValidityAction {
  payload: {
    text: string;
    key: string;
  };
}

export function FormValidityReducer(
  state: FormValidityState,
  action: FormValidityAction
) {
  const { payload } = action;

  if (payload.key === "VALIDATE_NAME") {
    return {
      ...state,
      nameError: payload.text.length === 0 ? true : false
    };
  } else if (payload.key === "VALIDATE_LASTNAME") {
    return {
      ...state,
      lastnameError: payload.text.length === 0 ? true : false
    };
  } else if (payload.key === "VALIDATE_EMAIL") {
    return {
      ...state,
      emailError:
        payload.text.includes("@") && payload.text.includes(".") ? false : true
    };
  } else if (payload.key === "VALIDATE_PASSWORD") {
    return {
      ...state,
      passwordError: payload.text.length > 9 ? false : true
    };
  } else {
    return state;
  }
}
