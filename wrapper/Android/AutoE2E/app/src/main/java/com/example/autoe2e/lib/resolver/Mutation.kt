package com.example.autoe2e.lib.resolver

import com.example.autoe2e.lib.mock.*
import com.example.autoe2e.lib.types.*
import kotlinx.coroutines.runBlocking
import java.util.concurrent.CompletableFuture

class Mutation: IMutation{
    override fun createProject(user: String): Project {
        return createProject(name = user)
    }

    override fun deleteProject(user: String): Boolean {
        return removeProject(name = user);
    }

    override fun insertGroup(project: String, group: String): TaskGroup? {
        return insertProjectGroup(projectName = project, groupName = group)
    }

    override fun removeGroup(project: String, group: String): Boolean {
        return removeProjectGroup(projectName = project, groupName = group)
    }

    override fun insertTask(project: String, group: String, task: TaskInfoInput): Task? {
        return insertTask(projectName= project, groupName = group, task = task)
    }

    override fun removeTask(project: String, group: String, nth: Int): Boolean {
        return removeTask(projectName= project, groupName = group, nth = nth)
    }

    override fun runTask(project: String, group: String): DocumentNode? {
        //WARNING: task accepts only one task running
        return runBlocking {
            runTask(projectName = project, groupName = group)
        }
    }

}