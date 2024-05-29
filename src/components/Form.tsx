import tw from '@helpers/tailwind.helper';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Button from './Button';

interface FormProps {
  defaultValues?: Record<string, any>;
  children?: React.ReactNode;
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (data: Record<string, any>) => void;
  titleSubmit?: string;
  onLoading?: boolean;
  classNames?: {
    form?: string;
    button?: string;
  };
}

/**
 * Renders a form component with React Hook Form integration for form state management.
 * This component provides a structured way to create a form with default values, submission handling,
 * and custom styling options. It also integrates a loading state and a customizable submit button.
 *
 * @param {Object} props - The properties passed to the Form component.
 * @param {Record<string, any>} props.defaultValues - Default values for form fields.
 * @param {React.ReactNode} props.children - Form elements or other React _components to be rendered inside the form.
 * @param {(data: Record<string, any>) => void} props.onSubmit - Callback function that is called when the form is submitted.
 * @param {string} [props.titleSubmit='Submit'] - Text to display on the submit button.
 * @param {boolean} [props.onLoading=false] - Indicates if the form is in a loading state, disabling the submit button.
 * @param {Object} [props.classNames={}] - Custom class names for styling the form and the submit button.
 * @param {string} [props.classNames.form] - Custom class name for the form element.
 * @param {string} [props.classNames.button] - Custom class name for the submit button.
 * @returns {React.FC} - A React functional component that renders the form.
 */
function Form({
  defaultValues,
  children,
  onSubmit,
  titleSubmit = 'Submit',
  onLoading = false,
  classNames = {
    form: '',
    button: '',
  },
}: FormProps) {
  const methods = useForm({ defaultValues });
  const handleSubmit = methods.handleSubmit(
    (data) => onSubmit && onSubmit(data),
  );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit}
        className={tw(classNames?.form)}
      >
        {children}
        <Button
          isRounded
          type='submit'
          variant='success'
          disabled={onLoading}
          className={tw(classNames?.button)}
        >
          {onLoading ? 'Loading...' : titleSubmit}
        </Button>
      </form>
    </FormProvider>
  );
}

export default Form;
