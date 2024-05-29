import tw from '@helpers/tailwind.helper.ts';
import React from 'react';

export interface ImgProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  type?: 'icon' | 'image';
  size?: number | string;
}

/**
 * Renders an image or icon with optional custom sizing.
 *
 * This component automatically sets a default size for icons if no size is provided.
 * It accepts all standard HTML image attributes through `props`.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {'icon' | 'image'} [props.type='image'] - Specifies the type of the image, affecting default sizing.
 * @param {number | string} [props.size] - The size of the image or icon. For icons, defaults to 40px if not specified.
 * @returns The `Img` component rendered as an `<img>` HTML element with applied styles and attributes.
 */
function Img({ type = 'image', size, ...props }: ImgProps) {
  if (type === 'icon' && !size) {
    size = 40;
  }
  return (
    <img
      className={tw('outline-0', props.className)}
      src={props.src}
      style={{
        width: type === 'icon' ? (props.width || size) + 'px' : '',
        height: (props.height || size) + 'px',
      }}
      {...props}
    />
  );
}

export default Img;
