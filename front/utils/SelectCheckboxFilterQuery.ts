import { TCheckBoxes } from "@/interfaces/interfaces";

// function to create filter query
function CreateFilterQuery(
  checkboxes: TCheckBoxes[],
  cb: (query: string) => void
) {
  let counter = 0;
  let query = "";
  checkboxes.forEach((cb) => {
    if (cb.checked_status) {
      counter++;
      if (counter > 1) query += `&e_filt=${cb.query}`;
      else query += `?e_filt=${cb.query}`;
    }
  });

  cb(query);

  const newUrl = `${window.location.pathname}${query}`;
  window.history.pushState({ path: newUrl }, "", newUrl);
}

export function SelectCheckbox(
  checkbox: TCheckBoxes,
  checkBoxesData: TCheckBoxes[],
  setUpdatedCheckboxes: (cb_data: TCheckBoxes[]) => void,
  setUpdatedFilterQuery: (query: string) => void
) {
  const tempCheckBoxesData = checkBoxesData.map((cb) => {
    if (cb.id === checkbox.id && !cb.checked_status)
      return { ...cb, checked_status: true };

    if (cb.id === checkbox.id && cb.checked_status)
      return { ...cb, checked_status: false };
    return cb;
  });

  setUpdatedCheckboxes(tempCheckBoxesData);

  // creating new filter queries
  CreateFilterQuery(tempCheckBoxesData, (query) =>
    setUpdatedFilterQuery(query)
  );
}
