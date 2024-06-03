import AssetsImg from '@components/AssetsImg.tsx';
import useLoading from '@context/Loading/hooks/useLoading.tsx';
import tw from '@helpers/tailwind.helper.ts';
import React, { useState } from 'react';

export interface ImgProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  type?: 'icon' | 'image';
  size?: number | string;
  fallback?: {
    directory: 'icon' | 'image';
    name: string;
  }; // Name of the fallback image
}

/**
 * Renders an image or icon with optional custom sizing and a fallback image.
 *
 * This component automatically sets a default size for icons if no size is provided.
 * It accepts all standard HTML image attributes through `props` and can display a fallback image if the primary image fails to load.
 *
 * @param forceDirectory - Optional prop to specify a directory directly
 * @param {Object} props - The properties passed to the component.
 * @param {'icon' | 'image'} [props.type='image'] - Specifies the type of the image, affecting default sizing.
 * @param {number | string} [props.size] - The size of the image or icon. For icons, defaults to 40px if not specified.
 * @param {string} [props.fallback] - The name of the fallback image file.
 * @returns The `Img` component rendered as an `<img>` HTML element with applied styles and attributes.
 */
function Img({ type = 'image', size, fallback, ...props }: ImgProps) {
  const [error, setError] = useState(false);
  const { loading } = useLoading();
  if (type === 'icon' && !size) {
    size = 40;
  }

  if (loading && fallback) {
    return (
      <AssetsImg
        name={fallback.name}
        forceDirectory={fallback.directory}
        type={type}
        {...props}
      />
    );
  }

  if ((!props.src || error) && fallback) {
    return (
      <AssetsImg
        name={fallback.name}
        forceDirectory={fallback.directory}
        type={type}
        {...props}
      />
    );
  }

  return (
    <img
      className={tw('outline-0', props.className)}
      src={props.src}
      onError={() => setError(true)}
      style={{
        width: type === 'icon' ? (props.width || size) + 'px' : '',
        height: (props.height || size) + 'px',
      }}
      {...props}
    />
  );
}

export default Img;
