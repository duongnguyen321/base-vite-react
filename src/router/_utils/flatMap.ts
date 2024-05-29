import { RoutesMapInterface } from '@router/interface/routesMap.interface.ts';
import React from 'react';

/**
 * Flattens a hierarchical structure of routes into a flat array of routes.
 * Each route in the output array will have a `link` property representing its full path
 * and a `Layout` property indicating the React component used to render the layout for that route.
 * Nested routes are recursively flattened with their paths resolved relative to their parent route.
 *
 * @param {RoutesMapInterface[]} routesMap - An array of route objects to be flattened. Each route object
 * may contain nested routes under a `nested` property.
 * @returns {RoutesMapInterface[]} A flat array of route objects with resolved `link` and `Layout` properties.
 */
function flatMap(routesMap: RoutesMapInterface[]): RoutesMapInterface[] {
  const flatRoutes: RoutesMapInterface[] = [];

  /**
   * Recursively flattens an array of route objects.
   *
   * @param {RoutesMapInterface[]} routes - The array of route objects to flatten.
   * @param {string} basePath - The base path for the current level of routes. Defaults to an empty string.
   * @param {React.FC<any>} parentLayout - The React functional component used as a layout for the current level of routes.
   * If a route does not specify its own layout, it inherits this layout from its parent.
   */
  const flatten = (
    routes: RoutesMapInterface[],
    basePath: string = '',
    parentLayout?: React.FC<any>,
  ) => {
    routes.forEach((route) => {
      const fullPath = `${basePath}/${route.link}`.replace(/\/+/g, '/');
      const currentLayout = route.Layout || parentLayout;
      flatRoutes.push({ ...route, link: fullPath, Layout: currentLayout });

      if (route.nested) {
        flatten(route.nested, fullPath, currentLayout);
      }
    });
  };

  flatten(routesMap);
  return flatRoutes;
}

export default flatMap;
