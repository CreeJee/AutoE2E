import React, { PropsWithChildren, useState, useEffect } from "react";
import { Menu } from "antd";
import { MenuTheme } from "antd/lib/menu/MenuContext";
import { MenuMode } from "antd/lib/menu";

import 'antd/dist/antd.css';

import {TaskState} from '../struct/Data'

export type TaskProps = {
    theme?: MenuTheme
    mode?: MenuMode,
}
function fetchTask<T>(setFunctor: React.Dispatch<React.SetStateAction<T>>){
    // fetch()
    return (value: T) => setFunctor(value);
}
const TaskList: React.FC<TaskProps> = (props: PropsWithChildren<TaskProps>, context?: any) => {
    const [taskList, setTask] = useState<TaskState[]>([]);
    const fetchList = fetchTask<TaskState[]>(setTask);
    useEffect(() => {
        fetchList([
            {name: 'Project 1'},
            {name: 'Project 2'},
            {name: 'Project 3'},
        ])
    }, [])
    // useLayoutEffect(() => {
    //     fetchTaskList();
    // })
    return (
        <Menu
          theme={props.theme || "dark"}
          mode={props.mode || "horizontal"}
        >
            {taskList.map((taskInfo, k)=><Menu.Item key={k}>{taskInfo.name}</Menu.Item>)}
        </Menu>
    );
}
export default TaskList;