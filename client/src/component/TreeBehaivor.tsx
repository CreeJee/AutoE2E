import { Tag, Tree } from 'antd';
// tslint:disable-next-line: no-submodule-imports
import 'antd/dist/antd.css';
import React, { PropsWithChildren, useLayoutEffect, useState } from 'react';

// tslint:disable-next-line: no-implicit-dependencies,no-submodule-imports
import { DocNode } from 'src/lib/DocNode';
// import { IDocNode } from "../struct/Task";
import {ColorType} from '../struct/Base';
import {ITagState} from '../struct/Data';
const {TreeNode} = Tree;
export const BehaiviorTag: React.FC<ITagState> = (props: PropsWithChildren<ITagState>, context?: any) => {
    return (
        <Tag color={props?.type || ColorType.INFO}>{props?.name || ''}</Tag>
        // Tag
    );
};
export const TreeBehaivor: React.FC<{}> = (props: PropsWithChildren<{}>, context?: any) => {
  const [docNode] = useState<DocNode>(new DocNode(0));
  useLayoutEffect(() => {
    docNode.load().then((value) => {
      console.log('payload: ', value);
      // setNode(value);
    });
  });
  return (
      <Tree
      // checkable
      // defaultExpandedKeys={['0-0-0', '0-0-1']}
      // defaultSelectedKeys={['0-0-0', '0-0-1']}
      // defaultCheckedKeys={['0-0-0', '0-0-1']}
      // onSelect={this.onSelect}
      // onCheck={this.onCheck}
    >
      <TreeNode title="parent 1" key="0-0">
        <TreeNode title="parent 1-0" key="0-0-0" disabled={true}>
          <TreeNode title="leaf" key="0-0-0-0" disableCheckbox={true}/>
          <TreeNode title="leaf" key="0-0-0-1" />
        </TreeNode>
        <TreeNode title="parent 1-1" key="0-0-1">
          <TreeNode title="sss" key="0-0-1-0" />
        </TreeNode>
      </TreeNode>
    </Tree>
  );
};
export default TreeBehaivor;
