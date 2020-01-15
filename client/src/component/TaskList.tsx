import { Menu } from 'antd';
// tslint:disable-next-line: no-submodule-imports
import { MenuMode } from 'antd/lib/menu';
// tslint:disable-next-line: no-submodule-imports
import { MenuTheme } from 'antd/lib/menu/MenuContext';
import React, { PropsWithChildren, useEffect, useState } from 'react';

// tslint:disable-next-line: no-submodule-imports
import 'antd/dist/antd.css';

import {ITaskState} from '../struct/Data';

export interface ITaskProps {
    theme?: MenuTheme;
    mode?: MenuMode;
}
function fetchTask<T>(setFunctor: React.Dispatch<React.SetStateAction<T>>) {
    // fetch()
    return (value: T) => setFunctor(value);
}
const TaskList: React.FC<ITaskProps> = (props: PropsWithChildren<ITaskProps>, context?: any) => {
    const [taskList, setTask] = useState<ITaskState[]>([]);
    const fetchList = fetchTask<ITaskState[]>(setTask);
    useEffect(() => {
        fetchList([
            {name: 'Project 1'},
            {name: 'Project 2'},
            {name: 'Project 3'},
        ]);
    }, []);
    // useLayoutEffect(() => {
    //     fetchTaskList();
    // })
    return (
        <Menu
          theme={props.theme || 'dark'}
          mode={props.mode || 'horizontal'}
          style={{lineHeight: '64px'}}
        >
            {taskList.map((taskInfo, k) => <Menu.Item key={k}>{taskInfo.name}</Menu.Item>)}
        </Menu>
    );
};
export default TaskList;
