import { WhatToValidaty, FormValidityAction } from "./FormValidityReducer";

export function SetValidity(
  values: string[],
  setFormValidityData: React.Dispatch<FormValidityAction>
) {
  Object.values(WhatToValidaty).map((key, idx) => {
    setFormValidityData({
      payload: {
        key: key,
        text: values[idx]
      }
    });
  });
}
