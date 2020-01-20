import React from 'react';
import DiviedRow from './DiviedRow';
import { useAdapterState } from 'src/hooks/useAdapter';
import { Button } from 'antd';
export const Property: React.FC<{}> = () => {
    const [property] = useAdapterState<object>('Property', {});
    return (
        <DiviedRow size={2}>
            {Object.keys(property).map(key => (
                <Button>{key}</Button>
            ))}
        </DiviedRow>
    );
};
export default Property;
