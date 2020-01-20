import { Menu } from 'antd';
// tslint:disable-next-line: no-submodule-imports
import { MenuMode } from 'antd/lib/menu';
// tslint:disable-next-line: no-submodule-imports
import { MenuTheme } from 'antd/lib/menu/MenuContext';
import React, { PropsWithChildren } from 'react';

// tslint:disable-next-line: no-submodule-imports
import 'antd/dist/antd.css';

import { useAdapterState } from 'src/hooks/useAdapter';
import { ITaskState } from '../struct/Data';

export interface ITaskProps {
    theme?: MenuTheme;
    mode?: MenuMode;
    name: string;
}

const TaskList: React.FC<ITaskProps> = (props: PropsWithChildren<ITaskProps>) => {
    const [taskList] = useAdapterState<ITaskState[]>(props.name, []);
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
export default TaskList;
