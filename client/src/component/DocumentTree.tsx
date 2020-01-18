import { Tag, Tree, Button, Card } from 'antd';
// tslint:disable-next-line: no-submodule-imports
import 'antd/dist/antd.css';
import React, { PropsWithChildren, useLayoutEffect, useState, useEffect } from 'react';

// tslint:disable-next-line: no-implicit-dependencies,no-submodule-imports

import { DocNode, TaskList } from '../lib/DocNode';
import {ColorType} from '../struct/Base';
import {ITagState} from '../struct/Data';
import DiviedRow from './DiviedRow';
const {TreeNode} = Tree;
export const DocumentTag: React.FC<ITagState> = (props: PropsWithChildren<ITagState>, context?: any) => {
		return (
				<Tag color={props?.type || ColorType.INFO}>{props?.name || ''}</Tag>
				// Tag
		);
};	
const generateTree = (root: DocNode, key=''): JSX.Element => {
    const deepKey: string = `${key}${root.uid.toString()}`;
    return (
        <TreeNode title={root.name} key={deepKey}>
            {root.children.map((node) => generateTree(node,deepKey))}
        </TreeNode>
    )
};
export const DocumentTree: React.FC<{}> = (props: PropsWithChildren<{}>, context?: any) => {
	const [docNode] = useState<DocNode>(new DocNode(0));
	const baseButtonStyle = {marginRight: '6px', marginBottom: '6px'};

	useEffect(() => {
		docNode.load().then((value) => {
			console.log('payload: ', value);
		});
	});
	return (
		<>
			<Tree
				// checkable
				// defaultExpandedKeys={['0-0-0', '0-0-1']}
				// defaultSelectedKeys={['0-0-0', '0-0-1']}
				// defaultCheckedKeys={['0-0-0', '0-0-1']}
				// onSelect={loadProperty}
				// onCheck={this.onCheck}
			>
				{generateTree(docNode)}
				{/* <TreeNode title="parent 1" key="0-0">
					<TreeNode title="parent 1-0" key="0-0-0" disabled={true}>
						<TreeNode title="leaf" key="0-0-0-0" disableCheckbox={true}/>
						<TreeNode title="leaf" key="0-0-0-1" />
					</TreeNode>
					<TreeNode title="parent 1-1" key="0-0-1">
						<TreeNode title="sss" key="0-0-1-0" />
					</TreeNode>
				</TreeNode> */}

			</Tree>
			<Card title="Phone Navigation">
				<Button type="primary" style={baseButtonStyle}>Exit</Button>
			</Card>
			<Card title="InvokeEvent">
				{Object.keys(TaskList).map((taskName, k)=><Button key={k} style={baseButtonStyle}>{taskName}</Button>)}
			</Card>
		</>
	);
};
export default DocumentTree;
