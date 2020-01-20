import { Col, Row } from 'antd';
import React, { PropsWithChildren } from 'react';
export interface ILayoutGrid {
    size: number;
}
const chunk = (arr: React.ReactNode[], size: number = 1) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, size + i));
    }
    return result;
};
const fullGrid = 24;
const DiviedRow: React.FC<ILayoutGrid> = (props: PropsWithChildren<ILayoutGrid>) => {
    const a = React.Children.toArray(props.children);
    const collection = chunk(a, props.size).map((nodes, key) => {
        const children = nodes.map((node, k, array) => {
            const size = array.length;
            return (
                <Col span={fullGrid / size} key={k}>
                    {node}
                </Col>
            );
        });
        return <Row key={key}>{children}</Row>;
    }, []);
    return <>{collection}</>;
};

export default DiviedRow;
