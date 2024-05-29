import Img, { type ImgProps } from '@components/Img.tsx';

interface ImageProps extends ImgProps {
  name: string;
  type: ImgProps['type'];
  forceDirectory?: string; // Optional prop to specify a directory directly
}

/**
 * Renders an image component with a source path constructed from provided properties.
 * This component is a wrapper around the `Img` component, allowing for more flexible image source paths.
 *
 * @param {ImageProps} props - The properties passed to the AssetsImg component.
 * @param {string} props.name - The name of the image file (including extension).
 * @param {string} props.type - The type of the image, which is used to construct the default directory path.
 * @param {string} [props.forceDirectory] - An optional directory path that, if provided, overrides the default directory construction based on the image type.
 * @param {object} props.rest - Any additional properties are passed through to the underlying `Img` component.
 * @returns {JSX.Element} The `Img` component with the constructed source path and any additional properties.
 */
function AssetsImg({
  name,
  type,
  forceDirectory,
  ...props
}: ImageProps): JSX.Element {
  const directory = forceDirectory || `${type}s`; // Use forceDirectory if provided, otherwise default to type
  return (
    <Img
      src={`/assets/${directory}/${name}`}
      type={type}
      {...props}
    />
  );
}

export default AssetsImg;
