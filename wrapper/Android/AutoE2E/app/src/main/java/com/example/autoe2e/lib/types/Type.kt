package com.example.autoe2e.lib.types

import kotlin.collections.ArrayList
import kotlin.collections.HashMap
interface Node {
    var name: String
}
interface Log {
    var type: LogType
    var message: String
}

data class Tag(
    override var type: LogType,
    override var message: String
): Log
data class DocumentNode(
    override var name: String,
    var children: ArrayList<DocumentNode>,
    var parent: DocumentNode? = null,
    var uid: Int
): Node
data class Task (
    var index: Int,
    var name: TaskJob,
    var current: DocumentNode,
    var param: ArrayList<String>
)
data class TaskGroup(
    override var name: String,
    var tasks: ArrayList<Task>
): Node
data class Project(
    override var name: String,
    var window: DocumentNode,
    var tags: ArrayList<Tag>,
    var taskGroup: HashMap<String, TaskGroup>
): Node

interface IQuery {
    fun project(id: String): Project?
    fun projects(): Iterable<Project>
}
interface IMutation {

    fun createProject(name: String): Project?
    fun deleteProject(name: String): Boolean

    fun insertGroup(project: String, group: String): TaskGroup?
    fun removeGroup(project: String, group: String): Boolean
    fun insertTask(project: String, group: String, task: TaskInfoInput): Task?
    fun removeTask(project: String, group: String, nth: Int): Boolean

    fun runTask(project: String, group: String): DocumentNode?
}