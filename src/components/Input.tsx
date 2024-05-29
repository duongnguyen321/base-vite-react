import tw from '@helpers/tailwind.helper.ts';
import type { ClassValue } from 'clsx';
import { type InputHTMLAttributes, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Text from './Text';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  loading?: boolean;
  classNames?: {
    wrapper?: ClassValue;
    input?: ClassValue;
    label?: ClassValue;
  };
  rules?: {
    required?: string | boolean;
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
  label?: string;
}

/**
 * Renders a customizable input component integrated with `react-hook-form` for form handling and validation.
 * It supports tailwind classes for styling, loading state, and custom validation rules.
 *
 * @param {Object} props - The properties passed to the Input component.
 * @param {boolean} props.required - If true, the input is marked as required. Can be a boolean or a string for custom error messages.
 * @param {string} props.name - The name of the input field, used for form registration and error handling.
 * @param {boolean} [props.loading=false] - If true, the input is disabled to indicate a loading state.
 * @param {Object} [props.classNames] - Optional custom Tailwind CSS classes for styling the input _components.
 * @param {String} [props.className] - Custom class for the input element.
 * @param {ClassValue} [props.classNames.wrapper] - Custom class for the wrapper div.
 * @param {ClassValue} [props.classNames.input] - Custom class for the input element.
 * @param {ClassValue} [props.classNames.label] - Custom class for the label element.
 * @param {Object} [props.rules] - Custom validation rules for `react-hook-form`.
 * @param {string|boolean} [props.rules.required] - Validation rule for marking the input as required. Can be a custom error message string.
 * @param {Object} [props.rules.pattern] - Validation rule for regex pattern matching with a value and a custom error message.
 * @param {string} [props.label] - The label text for the input field.
 * @param {string} [props.placeholder] - The placeholder text for the input field.
 * @param {InputHTMLAttributes<HTMLInputElement>} props - Additional HTML input attributes spread onto the input element.
 *
 * @returns {JSX.Element} A JSX element representing the input field, including label, validation error messages, and support for custom styling.
 */
function Input({
  required,
  name,
  loading,
  classNames,
  className,
  rules = {
    required,
  },
  label,
  placeholder,
  ...props
}: InputProps) {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();
  const { t } = useTranslation();
  const [focus, setFocus] = useState(false);
  const adjustedRules = {
    ...rules,
    required: rules?.required
      ? typeof rules.required === 'string'
        ? rules.required
        : t('errors.form.required')
      : false,
  };

  return (
    <div
      className={tw(
        'relative w-fit min-w-[200px] h-full',
        className,
        classNames?.wrapper,
      )}
      title={label}
    >
      <label
        className={tw(
          'relative block w-full pl-2 pr-2 pt-3 pb-2 border bg-color-50 dark:bg-color-200 rounded-xl',
          errors[name] ? 'border-red-500' : 'border-gray-500',
          classNames?.label,
        )}
        onClick={() => setFocus(true)}
        htmlFor={name}
      >
        <input
          id={name}
          {...register(name, adjustedRules)}
          className={tw('bg-transparent', classNames?.input)}
          onBlur={async (e) => {
            await trigger(name);
            if (!e.target.value) {
              setFocus(false);
            }
          }}
          onFocus={() => setFocus(true)}
          disabled={loading}
          {...props}
        />
        <p
          className={tw(
            'absolute transition-all top-3 left-4 text-[16px]',
            focus && '-translate-y-3 -translate-x-2 text-sm text-neutral-400',
          )}
        >
          {(label || placeholder) ?? name}
          {rules?.required && <span className='text-red-500'>*</span>}
        </p>
      </label>

      {errors[name] && (
        <Text
          as={'p'}
          className='absolute text-[12px] px-2 py-1 rounded-md bottom-0 right-2 translate-y-2 bg-error-500 w-fit text-white z-50'
        >
          {errors[name]?.message?.toString() ?? t('errors.form.required')}
        </Text>
      )}
    </div>
  );
}

export default Input;
