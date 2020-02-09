package com.example.autoe2e.lib.mock

import android.app.Activity
import android.text.Layout
import com.example.autoe2e.dep.LayoutEffects
import com.example.autoe2e.dep.LoadComponentButton
import com.example.autoe2e.dep.currentContext
import com.example.autoe2e.lib.types.DocumentNode
import com.example.autoe2e.lib.types.Project
import com.example.autoe2e.lib.types.Task
import com.example.autoe2e.lib.types.TaskGroup
import kotlinx.coroutines.future.await
import java.util.concurrent.CompletableFuture

fun findProjectGroup(projectName: String, groupName: String) : TaskGroup?{
    val project = findProject(projectName)
    if(project !== null) {
        return project.taskGroup[groupName];
    }
    return null
}
fun insertProjectGroup(projectName: String, groupName: String) : TaskGroup?{

    val project = findProject(projectName)
    if(project !== null && project.taskGroup[groupName] !is TaskGroup) {
        val temp = TaskGroup(
            name = groupName,
            tasks = ArrayList()
        )
        project.taskGroup[groupName] = temp
        return temp
    }
    // when duplicated
    return null

}
fun removeProjectGroup(projectName: String, groupName: String): Boolean {
    val project = findProject(projectName)
    if(project !== null && project.taskGroup[groupName] is TaskGroup) {
        project.taskGroup.remove(groupName)
        return true
    }
    // when duplicated
    return false
}
suspend fun runTask(projectName: String, groupName: String): DocumentNode?{
    val project: Project? = findProject(projectName)
    val group: TaskGroup? = findProjectGroup(projectName, groupName)
    if (project is Project && group is TaskGroup) {
        val layout = LayoutEffects(root = project.window)
        layout.applyEffects(group)
        return project.window;
    }
    return null
}