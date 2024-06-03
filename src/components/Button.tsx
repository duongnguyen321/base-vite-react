import tw from '@helpers/tailwind.helper.ts';
import { motion, type Variants } from 'framer-motion';
import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isRounded?: boolean;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?:
    | 'red'
    | 'orange'
    | 'green'
    | 'blue'
    | 'info'
    | 'default'
    | 'error'
    | 'warning'
    | 'success'
    | 'flat'
    | 'bordered';
}

/**
 * Renders a customizable button component with various styling options.
 *
 * @param {Object} props - The properties passed to the Button component.
 * @param {boolean} [props.isLoading=false] - Indicates if the button is in a loading state.
 * @param {boolean} [props.isRounded=false] - Determines if the button should have rounded edges.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - The type attribute of the button.
 * @param {'red' | 'orange' | 'green' | 'blue' | 'info' | 'default' | 'error' | 'warning' | 'success' | 'flat' | 'bordered'} [props.variant='default'] - The color variant of the button.
 * @param {string} [props.className] - Additional custom class names to apply to the button.
 * @param {Object} props...props - Additional properties to spread onto the button element.
 * @returns {React.FC} A functional component that renders a button.
 */
function Button({
                  isLoading = false,
                  isRounded = false,
                  children,
                  type = 'button',
                  variant = 'default',
                  className,
                  ...props
                }: ButtonProps) {
  const roundedClass = isRounded ? 'rounded-full' : 'rounded';
  const loadingClass = isLoading ? 'opacity-50 cursor-not-allowed' : '';
  const variantClass = (() => {
    switch (variant) {
      case 'red':
        return 'bg-red-500 hover:bg-red-400 text-white';
      case 'error':
        return 'bg-error-500 hover:bg-error-400 text-white';
      case 'orange':
        return 'bg-orange-500 hover:bg-orange-400 text-white';
      case 'warning':
        return 'bg-warning-500 hover:bg-warning-400 text-white';
      case 'green':
        return 'bg-green-500 hover:bg-green-400 text-white';
      case 'success':
        return 'bg-success-500 hover:bg-success-400 text-white';
      case 'info':
        return 'bg-info-500 hover:bg-info-400 text-white';
      case 'blue':
        return 'bg-blue-500 hover:bg-blue-400 text-white';
      case 'flat':
        return 'bg-transparent hover:bg-gray-100 text-gray-800';
      case 'bordered':
        return 'bg-transparent border-2 border-gray-500 hover:border-gray-600 text-gray-800';
      default:
        return 'bg-color-500 hover:bg-color-600 text-white';
    }
  })();
  const variants: Variants = {
    initial: { opacity: 1 },
    click: {
      opacity: 0.9,
      scale: 0.965,
      transition: {
        type: 'spring',
        duration: 0.2,
      },
    },
    exit: {
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.25,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileTap="click"
    >
      <button
        type={type}
        className={tw(
          `transition-all cursor-pointer focus:outline-0 ${roundedClass} ${loadingClass} ${variantClass} p-2 text-white`,
          className,
        )}
        {...props}
        disabled={isLoading}
      >
        {children}
      </button>
    </motion.div>
  );
}

export default Button;
