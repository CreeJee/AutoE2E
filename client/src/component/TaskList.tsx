import { Menu } from 'antd';
// tslint:disable-next-line: no-submodule-imports
import { MenuMode } from 'antd/lib/menu';
// tslint:disable-next-line: no-submodule-imports
import { MenuTheme } from 'antd/lib/menu/MenuContext';
import React, { PropsWithChildren, useEffect, useState } from 'react';

// tslint:disable-next-line: no-submodule-imports
import 'antd/dist/antd.css';

import {Instance as adapter} from '../lib/Socket'
import {ITaskState} from '../struct/Data';

export interface ITaskProps {
    theme?: MenuTheme;
    mode?: MenuMode;
    name: string, 
}
function fetchTask<T>(name: string ,setFunctor: React.Dispatch<React.SetStateAction<T>>) {
    // fetch()
    return () => {
        adapter.get(`${name}`).then((value: object) => {
            setFunctor(value as unknown as T);
        })
    }
}
const TaskList: React.FC<ITaskProps> = (props: PropsWithChildren<ITaskProps>, context?: any) => {
    const [taskList, setTask] = useState<ITaskState[]>([]);
    const fetchList = fetchTask<ITaskState[]>(props.name, setTask);
    useEffect(() => {
        fetchList();
    }, [fetchList, props.name]);
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
