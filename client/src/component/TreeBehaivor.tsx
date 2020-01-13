import React, { PropsWithChildren, useLayoutEffect, useState } from "react";
import { Tag, Tree } from "antd";
import 'antd/dist/antd.css';

import {TagState} from '../struct/Data';
// import { DocNode } from "../struct/Task";
import {ColorType} from '../struct/Base';
import { DocNode } from 'src/lib/DocNode';
const {TreeNode} = Tree;
export const BehaiviorTag: React.FC<TagState> = (props: PropsWithChildren<TagState>, context?: any) => {
    return (
        <Tag color={props?.type || ColorType.INFO}>{props?.name || ''}</Tag>
        // Tag
    );
}
export const TreeBehaivor: React.FC<{}> = (props: PropsWithChildren<{}>, context?: any) => {
  const [docNode, setNode] = useState<DocNode>(new DocNode(0));
  useLayoutEffect(() => {
    docNode.load().then((value) => {
      console.log('payload: ',value);
      // setNode(value);
    })
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
        <TreeNode title="parent 1-0" key="0-0-0" disabled>
          <TreeNode title="leaf" key="0-0-0-0" disableCheckbox/>
          <TreeNode title="leaf" key="0-0-0-1" />
        </TreeNode>
        <TreeNode title="parent 1-1" key="0-0-1">
          <TreeNode title="sss" key="0-0-1-0" />
        </TreeNode>
      </TreeNode>
    </Tree>
  )
}
export default TreeBehaivor;