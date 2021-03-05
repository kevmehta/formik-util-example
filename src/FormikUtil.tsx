import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikProps,
  FormikValues
} from "formik";
import React, { useState } from "react";
import { personForm } from "./data";
import { FormData, InitialValues } from "./types";
import {
  DatePicker,
  TextField,
  IDatePickerStrings,
  Checkbox
} from "@fluentui/react";

const DayPickerStrings: IDatePickerStrings = {
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],

  shortMonths: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],

  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],

  shortDays: ["S", "M", "T", "W", "T", "F", "S"],

  goToToday: "Go to today",
  prevMonthAriaLabel: "Go to previous month",
  nextMonthAriaLabel: "Go to next month",
  prevYearAriaLabel: "Go to previous year",
  nextYearAriaLabel: "Go to next year",
  closeButtonAriaLabel: "Close date picker",
  monthPickerHeaderAriaLabel: "{0}, select to change the year",
  yearPickerHeaderAriaLabel: "{0}, select to change the month"
};

const getInitialValue = (formData: FormData[]) => {
  let initialValue: InitialValues = {};
  formData.forEach((field) => {
    initialValue[field.name] =
      typeof field.defaultValue !== "undefined" && field.defaultValue !== ""
        ? field.defaultValue
        : "";
  });

  return initialValue;
};

const addFieldDynamically = (
  field: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData[]>>
) => {
  setFormData((prevState) => {
    const _newState = [...prevState];
    _newState.push(field);
    return _newState;
  });
};

const removeFieldDynamically = (
  field: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData[]>>
) => {
  setFormData((prevState) => {
    const _newState = prevState.filter((f) => f.name !== field.name);
    return _newState;
  });
};

const buildForm = (
  formikProps: FormikProps<InitialValues>,
  formData: FormData[],
  onChange: Function
) => {
  const _inputOnChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue: string | undefined,
    name: string
  ) => {
    const { setFieldValue, values } = formikProps;
    const oldValue = values[name];
    setFieldValue(name, newValue);
    onChange(formikProps, newValue, oldValue, name);
  };

  const _checkboxChange = (
    event:
      | React.FormEvent<HTMLInputElement | HTMLElement | undefined>
      | undefined,
    newValue: boolean | undefined,
    name: string
  ) => {
    console.log("newValue:", newValue);
    const { setFieldValue, values } = formikProps;
    const oldValue = values[name];
    setFieldValue(name, newValue as boolean);
    onChange(formikProps, newValue, oldValue, name);
  };

  const _onDateSelect = (newValue: Date | null | undefined, name: string) => {
    const { setFieldValue, values } = formikProps;
    const oldValue = values[name];
    setFieldValue(name, newValue);
    onChange(formikProps, newValue, oldValue, name);
  };

  return formData.map((field, index) => {
    let $field = { ...field };

    if ($field.component === "TextField") {
      return (
        <Field key={index} name={$field.name}>
          {({ field: { name } }: FieldProps) => (
            <TextField
              name={name}
              label={$field.label}
              placeholder={$field.placeholder}
              defaultValue={$field.defaultValue as string}
              required={$field.isRequired}
              onChange={(
                event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
                newValue: string | undefined
              ) => _inputOnChange(event, newValue, name)}
            />
          )}
        </Field>
      );
    }

    if ($field.component === "MultiLineTextField") {
      return (
        <Field key={index} name={$field.name}>
          {({ field: { name } }: FieldProps) => (
            <TextField
              name={name}
              label={$field.label}
              placeholder={$field.placeholder}
              defaultValue={$field.defaultValue as string}
              required={$field.isRequired}
              multiline
              rows={$field.rows}
              onChange={(
                event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
                newValue: string | undefined
              ) => _inputOnChange(event, newValue, name)}
            />
          )}
        </Field>
      );
    }

    if ($field.component === "DatePicker") {
      return (
        <Field key={index} name={$field.name}>
          {({ field: { name } }: FieldProps) => (
            <DatePicker
              strings={DayPickerStrings}
              showWeekNumbers={true}
              firstWeekOfYear={1}
              isRequired={$field.isRequired}
              showMonthPickerAsOverlay={true}
              onSelectDate={(date: Date | null | undefined) =>
                _onDateSelect(date, name)
              }
            />
          )}
        </Field>
      );
    }

    if ($field.component === "Checkbox") {
      return (
        <Field key={index} name={$field.name}>
          {({ field: { name } }: FieldProps) => (
            <Checkbox
              name={name}
              label={$field.label}
              defaultChecked={$field.defaultValue as boolean}
              onChange={(
                ev?: React.FormEvent<
                  HTMLInputElement | HTMLElement | undefined
                >,
                checked?: boolean | undefined
              ) => _checkboxChange(ev, checked, name)}
            />
          )}
        </Field>
      );
    }

    return null;
  });
};

const PersonForm = ({ formikProps, formData, onChange }: any) => {
  return (
    <Form>
      {buildForm(formikProps, formData, onChange)}
      <button type="submit">Submit</button>
    </Form>
  );
};

export const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData[]>(personForm);
  const [initialValues, setInitialValues] = useState<InitialValues>(
    getInitialValue(formData)
  );

  const onChange = (
    formikProps: FormikProps<InitialValues>,
    newValue: string | boolean | undefined,
    oldValue: string | boolean | undefined,
    fieldName: string
  ) => {
    // Custom loigc onChange goes here
    if (fieldName === "currentAddressSameAsPermanentAddress") {
      const newField: FormData = {
        name: "currentAdress",
        label: "Current Address",
        component: "MultiLineTextField",
        placeholder: "Current Address",
        defaultValue: "",
        rows: 3
      };
      if (newValue === false) {
        addFieldDynamically(newField, setFormData);
      } else {
        removeFieldDynamically(newField, setFormData);
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values: FormikValues) => {
        console.log("Submit:", values);
      }}
    >
      {(formikProps: FormikProps<InitialValues>) => (
        <PersonForm
          formikProps={formikProps}
          formData={formData}
          onChange={onChange}
        />
      )}
    </Formik>
  );
};
