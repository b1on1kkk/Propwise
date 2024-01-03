export const RegistrationUserInitialState = {
  name: "",
  lastname: "",
  email: "",
  password: ""
};

export enum RegistrationUserForm {
  NAME = "NAME",
  LASTNAME = "LASTNAME",
  EMAIL = "EMAIL",
  PASSWORD = "PASSWORD"
}

interface RegistrationUserFormAction {
  type: RegistrationUserForm;
  payload: string;
}

interface RegistrationUserFormState {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export function RegistrationUserFormReducer(
  state: RegistrationUserFormState,
  action: RegistrationUserFormAction
) {
  const { type, payload } = action;

  switch (type) {
    case RegistrationUserForm.NAME:
      return {
        ...state,
        name: payload
      };
    case RegistrationUserForm.LASTNAME:
      return {
        ...state,
        lastname: payload
      };
    case RegistrationUserForm.EMAIL:
      return {
        ...state,
        email: payload
      };
    case RegistrationUserForm.PASSWORD:
      return {
        ...state,
        password: payload
      };
  }
}
