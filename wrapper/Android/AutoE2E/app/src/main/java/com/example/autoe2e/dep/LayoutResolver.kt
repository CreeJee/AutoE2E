package com.example.autoe2e.dep

import android.view.View
import com.example.autoe2e.lib.types.Task
import com.example.autoe2e.lib.types.TaskJob

suspend fun run(view: View, task: Task) {
    when (task.name) {
        TaskJob.Click -> {
            if (view.isClickable) {
                view.callOnClick()
            }
        }
        TaskJob.DoubleClick -> {}
        TaskJob.Focus -> {}
        TaskJob.FocusOut -> {}
        TaskJob.KeyDown -> {}
        TaskJob.KeyPress -> {}
        TaskJob.KeyUp -> {}
        TaskJob.MouseEnter -> {}
        TaskJob.MouseLeave -> {}
        TaskJob.Resize -> {}
        TaskJob.Zoom -> {}
    }
}