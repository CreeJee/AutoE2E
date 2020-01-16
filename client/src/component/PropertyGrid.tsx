import {Input } from 'antd';
import React, { PropsWithChildren } from 'react';
import DiviedRow from './DiviedRow'
const PropertyGrid: React.FC<{}> = (props: PropsWithChildren<{}>, context?: any) => {
    return (
		<DiviedRow size={2}>
            <Input suffix="px" addonBefore="1"/>
            <Input suffix="px" addonBefore="2"/>
            <Input suffix="px" addonBefore="1"/>
            <Input suffix="px" addonBefore="2"/>
            <Input suffix="px" addonBefore="1"/>
            <Input suffix="px" addonBefore="2"/>
            <Input suffix="px" addonBefore="1"/>
            <Input suffix="px" addonBefore="2"/>
		</DiviedRow>
	)
}

export default PropertyGrid