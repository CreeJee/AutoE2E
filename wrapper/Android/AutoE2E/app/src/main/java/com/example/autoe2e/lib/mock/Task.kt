package com.example.autoe2e.lib.mock

import com.example.autoe2e.lib.types.*
import com.fasterxml.jackson.core.io.NumberInput
import graphql.schema.AsyncDataFetcher.async
import io.netty.util.concurrent.Promise
import kotlinx.coroutines.future.await
import java.util.ArrayList
import java.util.concurrent.CompletableFuture

fun insertTask(projectName: String, groupName: String, task: TaskInfoInput): Task? {
    val project: Project? = findProject(projectName);
    val group: TaskGroup? = findProjectGroup(projectName, groupName);
    val foundNode: DocumentNode? = findNode(project?.window, task.nodeUid);
    if (project !is Project || group !is TaskGroup || foundNode !is DocumentNode) {
        return null
    }
    val temp = Task(
        index = group.tasks.size - 1,
        name = task.name,
        current = foundNode,
        param = task.param
    );
    group.tasks.add(temp)
    return temp
}
fun removeTask(projectName: String, groupName: String, nth: Int) : Boolean{
    val group: TaskGroup? = findProjectGroup(projectName, groupName);
    if (group is TaskGroup && group.tasks.size > nth) {
        //project.tags.removeAt(NumberInput.parseInt(taskId))
        group.tasks.removeAt(nth)
        return true
    }
    return false
}
