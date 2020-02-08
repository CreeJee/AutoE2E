package com.example.autoe2e.lib.mock

import com.example.autoe2e.lib.types.DocumentNode

fun findNode(node: DocumentNode?, nodeUid: Int): DocumentNode? {
    //tree search
    //window.children
    if (node is DocumentNode) {
        for (child in node.children) {
            return when (child.uid == nodeUid) {
                true -> node
                false -> findNode(node, nodeUid)
            }
        }
    }
    return null
}