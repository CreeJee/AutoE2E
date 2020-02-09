package com.example.autoe2e.lib.mock

import com.example.autoe2e.lib.types.DocumentNode

fun findNode(node: DocumentNode?, nodeUid: Int): DocumentNode? {
    //tree search
    //window.children
    if (node is DocumentNode) {

        if (node.uid == nodeUid) {
            return node
        }
        for (child in node.children) {
            val found = findNode(child, nodeUid)
            if (found !== null) {
                return found
            }
        }
    }
    return null
}