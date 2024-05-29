import type DefaultProps from '@type/pages/defaultProps.interface.ts';
import React from 'react';

export interface RoutesMapInterface {
  link: string;
  title: string;
  Element: React.FC<any>;
  Layout?: React.FC<DefaultProps & { children?: React.ReactNode }>;
}
