import { FormData } from "./types";

export const personForm: FormData[] = [
  {
    name: "firstName",
    label: "First Name",
    component: "TextField",
    placeholder: "First Name",
    isRequired: true,
    defaultValue: ""
  },
  {
    name: "lastName",
    label: "Last Name",
    component: "TextField",
    placeholder: "Last Name",
    isRequired: true,
    defaultValue: ""
  },
  {
    name: "address",
    label: "Address",
    component: "MultiLineTextField",
    placeholder: "Address",
    defaultValue: "",
    rows: 3
  },
  // {
  //   name: "currentAddressSameAsPermanentAddress",
  //   label: "Current Adress same as Permanent Address",
  //   component: "Checkbox",
  //   defaultValue: true
  // },
  {
    name: "dateOfBirth",
    label: "Date Of Birth",
    component: "DatePicker",
    placeholder: "Date Of Birth",
    isRequired: true,
    defaultValue: ""
  }
];
