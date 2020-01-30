import { Menu } from 'antd';
// tslint:disable-next-line: no-submodule-imports
import { MenuMode } from 'antd/lib/menu';
// tslint:disable-next-line: no-submodule-imports
import { MenuTheme } from 'antd/lib/menu/MenuContext';
import React, { PropsWithChildren } from 'react';

// tslint:disable-next-line: no-submodule-imports
import 'antd/dist/antd.css';

import { useGqlState } from 'src/hooks/useAdapter';
import { IItemState } from '../struct/Data';

export interface IThemeProps {
    theme?: MenuTheme;
    mode?: MenuMode;
    name: string;
}

const ItemList: React.FC<IThemeProps> = (props: PropsWithChildren<IThemeProps>) => {
    const fieldName = props.name;
    const query = `
    query {
        ${fieldName}
    }`;
    const [taskList] = useGqlState<IItemState[]>(fieldName, query, []);
    return (
        <Menu
            theme={props.theme || 'dark'}
            mode={props.mode || 'horizontal'}
            style={{ lineHeight: '64px' }}
        >
            {taskList.map((taskInfo, k) => (
                <Menu.Item key={k}>{taskInfo.name}</Menu.Item>
            ))}
        </Menu>
    );
};
export default ItemList;
