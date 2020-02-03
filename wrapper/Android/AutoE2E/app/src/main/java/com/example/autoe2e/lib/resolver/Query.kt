package com.example.autoe2e.lib.resolver

import com.example.autoe2e.lib.mock.findProject
import com.example.autoe2e.lib.mock.projectList
import com.example.autoe2e.lib.types.IQuery
import com.example.autoe2e.lib.types.Project

class Query: IQuery {
    override fun project(id: String): Project? {
        return findProject(id)
    }

    override fun projects(): Iterable<Project> {
        return projectList().values
    }

}