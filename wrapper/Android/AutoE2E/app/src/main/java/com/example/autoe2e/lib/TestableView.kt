package com.example.autoe2e.lib

import android.view.DragEvent
import android.view.KeyEvent
import android.view.View

fun onClick (view: View) {

}
fun onDrag (view: View, event: DragEvent): Boolean {
    return true
}
fun onKeydown (view: View, keyCode: Int, event: KeyEvent): Boolean {
    return true
}
class TestableView<T : View>(var view: View) {
    init {
        this.view.setOnClickListener(::onClick)
        this.view.setOnKeyListener(::onKeydown)
        this.view.setOnDragListener(::onDrag)
    }
}
fun <T: View>Convert(view: View): TestableView<T> {
    return TestableView(view)
}