package com.example.autoe2e.lib

import android.util.Log

import com.example.autoe2e.lib.resolver.Mutation
import com.example.autoe2e.lib.resolver.Query
import com.expediagroup.graphql.SchemaGeneratorConfig
import com.expediagroup.graphql.TopLevelObject
import com.expediagroup.graphql.toSchema
import com.google.gson.Gson
import graphql.GraphQL
import graphql.GraphQLException
import graphql.schema.GraphQLSchema
import io.ktor.http.cio.websocket.Frame
import io.ktor.http.cio.websocket.FrameParser
import kotlinx.coroutines.channels.SendChannel


val gson = Gson()
class GQLSocket() {
    val runtime: GraphQL;

    init {
        val config = SchemaGeneratorConfig(supportedPackages  = listOf("com.example"))
        val queries = listOf(TopLevelObject(Query()))
        val mutations = listOf(TopLevelObject(Mutation()))
        val schema: GraphQLSchema = toSchema(config = config, queries = queries, mutations = mutations)
        this.runtime = GraphQL.newGraphQL(schema).build()
    }
    fun parse(query : Frame.Text): String{
        val response: String = try {
            val result: Map<String, Any> = runtime.execute(query.toString()).getData();
            gson.toJson(result)
        } catch (e: GraphQLException) {
            gson.toJson(e.localizedMessage);
        }
        Log.d("GQL-AUTOE2E",response)
        return response;

    }
}