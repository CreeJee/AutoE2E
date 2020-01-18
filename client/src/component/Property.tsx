import React,{ PropsWithChildren, useEffect, useState } from 'react';
import {Instance as adapter} from '../lib/Socket'
import { IResponseType } from '../struct/Interface/SockAdapter';
import DiviedRow from './DiviedRow';
export const Property: React.FC<{}> = (props: PropsWithChildren<{}>, context?: any) => {
    const [objectEnum, setEnum] = useState({});
    const bindHandler = (response: IResponseType) => {
        setEnum(response.data)
    }
    useEffect(()=> {    
        adapter.bind('Property', bindHandler);
        return () => adapter.unBind('Property', bindHandler);
    })
    return (
        <DiviedRow size={2}>
            {}
        </DiviedRow>
    )
};
export default Property;
