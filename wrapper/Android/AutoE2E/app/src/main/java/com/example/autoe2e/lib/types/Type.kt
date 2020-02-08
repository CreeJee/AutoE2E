package com.example.autoe2e.lib.types

import io.ktor.util.Hash
import java.util.*
import java.util.concurrent.CompletableFuture
import kotlin.collections.ArrayList
import kotlin.collections.HashMap
//#RootType

//    uid: ID!
//    name: String!
interface Node {
    val name: String
}
interface Log {
    val type: LogType
    val message: String
}
data class Item(
    override val name: String
) : Node

data class Tag(
    override val type: LogType,
    override val message: String
): Log
data class DocumentNode(
    override val name: String,
    val children: ArrayList<DocumentNode>,
    val uid: Int
): Node
data class Task (
    val index: Int,
    val name: TaskJob,
    val current: DocumentNode,
    val param: ArrayList<String>
)
data class TaskGroup(
    override val name: String,
    val tasks: ArrayList<Task>
): Node
data class Project(
    override val name: String,
    val window: DocumentNode,
    val tags: ArrayList<Tag>,
    val taskGroup: HashMap<String, TaskGroup>
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