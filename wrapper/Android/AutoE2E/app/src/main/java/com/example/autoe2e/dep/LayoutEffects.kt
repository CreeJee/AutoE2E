package com.example.autoe2e.dep


import android.app.Activity
import android.content.Context
import android.view.View
import android.view.ViewGroup
import com.example.autoe2e.lib.types.DocumentNode
import com.example.autoe2e.lib.types.Task
import com.example.autoe2e.lib.types.TaskGroup


var currentContext: Context? = null;
// TODO : find graphql mapper type & complete action for 'rollback protocol', 'property change'
class LayoutEffects(private var root: DocumentNode) {
    private var rollbackNode: DocumentNode? = null
    private val nodeMapper: ArrayList<View> = ArrayList()
    private fun layoutClone(group: ViewGroup, root: DocumentNode, startUid: Int = root.uid) {
        val childCount = group.childCount;
        for(i in 0.. childCount)
        {
            val child: View = group.getChildAt(i)
            val uid = startUid+1
            val currentNode = DocumentNode(
                name = child.javaClass.name,
                children = ArrayList(),
                parent = root,
                uid = uid
            );
            root.children.add(currentNode);
            nodeMapper[uid] = child
            if (child is ViewGroup) {
                layoutClone(child, currentNode,startUid+childCount)
            }
        }
    }
    private suspend fun load(){
        // TODO : layout communicate load
        if (currentContext !== null ) {
            layoutClone((currentContext as Activity).window.decorView.rootView as ViewGroup, root)
            rollbackNode = root.copy()
        }
    }
    private suspend fun applyEffect(task: Task) {
        run(nodeMapper[task.current.uid], task)
    }
    private suspend fun rollbackEffects() {

    }
    suspend fun applyEffects(taskGroup: TaskGroup) {
        try {
            load()
            for (task in taskGroup.tasks) {
                applyEffect(task)
            }
        } catch (e: Error) {
            rollbackEffects()
        }
    }
}