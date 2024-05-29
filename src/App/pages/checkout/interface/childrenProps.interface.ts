import type { UseFetchResponse } from '@interface/hooks/useFetch.interface.ts';
import type DefaultProps from '@type/pages/defaultProps.interface.ts';

export interface ChildrenPropsInterface extends DefaultProps, UseFetchResponse<any> {
}
