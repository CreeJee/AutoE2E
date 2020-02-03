package com.example.autoe2e.lib.resolver

import com.example.autoe2e.lib.mock.createProject
import com.example.autoe2e.lib.mock.createTask
import com.example.autoe2e.lib.mock.removeTask
import com.example.autoe2e.lib.mock.removeProject
import com.example.autoe2e.lib.types.*

class Mutation: IMutation{
    override fun createProject(user: String): Project {
        return createProject(name = user)
    }

    override fun deleteProject(user: String): Boolean {
        return removeProject(name = user);
    }

    override fun insertGroup(project: String, group: String): TaskGroup {

    }

    override fun removeGroup(project: String, group: String): Boolean {

    }

    override fun insertTask(project: String, group: String, task: TaskInfoInput): Task? {
//        return createTask(projectID, task)
    }

    override fun removeTask(projectID: String, taskID: String, nth: Int): Boolean {
//        return removeTask(projectId= projectID, taskId = taskID)
    }

    override fun runTask(projectID: String, taskID: String): DocumentNode {
        
        return runTask(projectId= projectID, taskId = taskID)
    }

}