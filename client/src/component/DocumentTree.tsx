import { Button, Card, Tag, Tree, Icon } from 'antd';
// tslint:disable-next-line: no-submodule-imports
import 'antd/dist/antd.css';
import React, { PropsWithChildren } from 'react';

// tslint:disable-next-line: no-implicit-dependencies,no-submodule-imports

import { DocNode, TaskList } from '../lib/DocNode';
import { ColorType } from '../struct/Base';
import { ITagState } from '../struct/Data';
const { TreeNode } = Tree;
export const DocumentTag: React.FC<ITagState> = (props: PropsWithChildren<ITagState>) => {
    return (
        <Tag color={props?.type || ColorType.INFO}>{props?.name || ''}</Tag>
        // Tag
    );
};
const generateTree = (root: DocNode, key = ''): JSX.Element => {
    const deepKey: string = `${key}${root.uid.toString()}`;
    return (
        <TreeNode title={root.name} key={deepKey}>
            {root.children.map(node => generateTree(node, deepKey))}
        </TreeNode>
    );
};
const onPlay = () => {};
export const DocumentTree: React.FC<{}> = (/*props: PropsWithChildren<{}>, context?: any*/) => {
    const [docNode] = DocNode.useState();
    const baseButtonStyle = { marginRight: '6px', marginBottom: '6px' };
    return (
        <Card
            hoverable={true}
            title="Layout Tree"
            actions={[<Icon type="play-circle" key="play-circle" onClick={onPlay} />]}
        >
            <Tree
            // checkable
            // defaultExpandedKeys={['0-0-0', '0-0-1']}
            // defaultSelectedKeys={['0-0-0', '0-0-1']}
            // defaultCheckedKeys={['0-0-0', '0-0-1']}
            // onSelect={loadProperty}
            // onCheck={this.onCheck}
            >
                {generateTree(docNode)}
            </Tree>
            <Card title="Phone Navigation">
                <Button type="primary" style={baseButtonStyle}>
                    Exit
                </Button>
            </Card>
            <Card title="InvokeEvent">
                {Object.keys(TaskList).map((taskName, k) => (
                    <Button key={k} style={baseButtonStyle}>
                        {taskName}
                    </Button>
                ))}
            </Card>
        </Card>
    );
};
export default DocumentTree;
