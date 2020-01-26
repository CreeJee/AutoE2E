import React from 'react';
import DiviedRow from './DiviedRow';
import { useAdapterState } from 'src/hooks/useAdapter';
import { Button } from 'antd';
import { IProperty } from 'src/struct/Data';
export const Property: React.FC<IProperty> = () => {
    const [property] = useAdapterState<IProperty>('Property', {});
    return (
        <DiviedRow size={2}>
            {Object.keys(property).map(key => (
                <Button>{key}</Button>
            ))}
        </DiviedRow>
    );
};
export default Property;
