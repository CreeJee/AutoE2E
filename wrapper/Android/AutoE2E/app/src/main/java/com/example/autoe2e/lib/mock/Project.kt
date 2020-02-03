package com.example.autoe2e.lib.mock

import com.example.autoe2e.lib.types.DocumentNode
import com.example.autoe2e.lib.types.Project
import com.example.autoe2e.lib.types.Task
import java.util.*
import kotlin.collections.HashMap

private val projectList = HashMap<String,Project>();


fun createProject(name: String) : Project{
    val temp = Project(
        name = name,
        window = DocumentNode("window", ArrayList()),
        taskGroup = ArrayList(),
        tags = ArrayList()
    )
    projectList[name] = temp
    return temp
}
fun removeProject(name: String): Boolean {
    val hasName = projectList.get(name) === null
    if (hasName) {
        projectList.remove(name);
    }
    return hasName
}
fun projectList(): HashMap<String, Project>{
    return projectList;
}
fun findProject (uid: String): Project? {
    return projectList[uid];
}