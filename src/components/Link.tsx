import useNavigate from '@hooks/useNavigate.tsx';
import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: React.ElementType;
  href: string;
}

function Link({ as: Component = 'a', href, ...props }: LinkProps) {
  const navigate = useNavigate();
  const isInternalLink = href.startsWith('/');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isInternalLink) {
      e.preventDefault();
      navigate(href);
    } else if (Component !== 'a') {
      e.preventDefault();
      window.open(href, '_blank');
    }
  };

  if (isInternalLink || Component !== 'a') {
    return <Component {...props} data-href={href} onClick={handleClick} />;
  } else {
    return <Component {...props} href={href} target="_blank" rel="noopener noreferrer" />;
  }
}

export default Link;
