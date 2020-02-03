package com.example.autoe2e.dep

import android.content.Context
import android.content.Intent
import android.util.AttributeSet
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.Toast
import androidx.core.content.ContextCompat.startActivity
import com.example.autoe2e.R

class LoadComponentButton : Button{
    private fun onClick(view: View) {
        Log.d("tag","loadComponent Click");
        val intent = Intent();
        intent.action = context.getString(R.string.action_name);
        intent.type = context.getString(R.string.mine_type);
        if(intent.resolveActivity(context.packageManager) !== null) {
            startActivity(context, intent, null);
        } else {
            Toast.makeText(context, context.getString(R.string.app_select_non_support),1000).show()
        }
    }
    private fun init() {
        this.setOnClickListener(::onClick)
    }
    constructor(context: Context?) : super(context){
        this.init()
    }

    constructor(context: Context?, attrs: AttributeSet?) : super(context, attrs, R.attr.buttonStyle){
        this.init()
    }
    constructor(context: Context?, attrs: AttributeSet?, defStyleAttr: Int) : super(context, attrs, defStyleAttr, 0){
        this.init()
    }
    constructor(context: Context?, attrs: AttributeSet?, defStyleAttr: Int, defStyleRes: Int) : super(context, attrs, defStyleAttr, defStyleRes) {
        this.init()
    }
}