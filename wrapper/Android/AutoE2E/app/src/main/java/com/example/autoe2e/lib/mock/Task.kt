package com.example.autoe2e.lib.mock

import com.example.autoe2e.lib.types.Project
import com.example.autoe2e.lib.types.Task
import com.example.autoe2e.lib.types.TaskInfoInput
import com.fasterxml.jackson.core.io.NumberInput
import io.netty.util.concurrent.Promise
import java.util.ArrayList

fun createTask(projectID: String, task: TaskInfoInput): Task? {
    val project = findProject(projectID);
    if (project === null) {
        return null;
    }
    val temp = Task(
        uid = project.tasks.size.toString(),
        name = task.name,
        current = findNode(task.nodeId),
        param = task.param
    );
    project.tasks.add(temp);
    return temp;
}
fun removeTask(projectId: String, taskId: String) : Boolean{
    val project = findProject(projectId);
    if (project !== null) {
        project.tags.removeAt(NumberInput.parseInt(taskId))
        return true
    }
    return false
}
fun runTask(projectId= projectID): Promise<Unit> {
    val project = findProject(projectId);
    for(task in tasks) {
        // task.name.label
        // invokeTask
    }
}