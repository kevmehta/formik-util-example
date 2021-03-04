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
    const { setFieldValue } = formikProps;
    setFieldValue(name, newValue);
    onChange(formikProps, newValue);
  };

  // const _checkboxChange = (
  //   event: React.FormEvent<HTMLInputElement | HTMLElement | undefined>,
  //   checked: boolean | undefined,
  //   name: string
  // ) => {
  //   const { setFieldValue } = formikProps;
  //   setFieldValue(name, checked);
  //   onChange(formikProps, checked);
  // };

  const _onDateSelect = (date: Date | null | undefined, name: string) => {
    const { setFieldValue } = formikProps;
    setFieldValue(name, date);
    onChange(formikProps, date);
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
              defaultValue={$field.defaultValue}
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
              defaultValue={$field.defaultValue}
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

    // if ($field.component === "CheckBox") {
    //   return (
    //     <Field key={index} name={$field.name}>
    //       {({ field: { name } }: FieldProps) => (
    //         <Checkbox
    //           label="Checked checkbox (uncontrolled)"
    //           defaultChecked
    //           onChange={(
    //             event?: React.FormEvent<
    //               HTMLInputElement | HTMLElement | undefined
    //             >,
    //             checked?: boolean | undefined
    //           ) => _checkboxChange(event, checked, name)}
    //         />
    //       )}
    //     </Field>
    //   );
    // }

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
    newValue: string | undefined
  ) => {
    console.log("Add Your custom logic to handle onChange");
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
