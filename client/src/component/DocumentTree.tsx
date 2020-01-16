import { Tag, Tree } from 'antd';
// tslint:disable-next-line: no-submodule-imports
import 'antd/dist/antd.css';
import React, { PropsWithChildren, useLayoutEffect, useState } from 'react';

// tslint:disable-next-line: no-implicit-dependencies,no-submodule-imports

import { DocNode } from '../lib/DocNode';
import {ColorType} from '../struct/Base';
import {ITagState} from '../struct/Data';
const {TreeNode} = Tree;
export const DocumentTag: React.FC<ITagState> = (props: PropsWithChildren<ITagState>, context?: any) => {
    return (
        <Tag color={props?.type || ColorType.INFO}>{props?.name || ''}</Tag>
        // Tag
    );
};
export const DocumentTree: React.FC<{}> = (props: PropsWithChildren<{}>, context?: any) => {
  const [docNode] = useState<DocNode>(new DocNode(0));
  const generateTree = (root: DocNode): JSX.Element => {
    return (<TreeNode title={root.name} key={root.uid.toString()}/>)
  };
  useLayoutEffect(() => {
    docNode.load().then((value) => {
      console.log('payload: ', value);
    });
  });
  return (
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
  );
};
export default DocumentTree;
