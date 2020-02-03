package com.example.autoe2e

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import com.example.autoe2e.lib.startServer
import com.example.autoe2e.lib.stopServer

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        startServer()
        Log.d("GQL-AUTOE2E","started");
    }
    override fun onDestroy() {
        super.onDestroy()
        stopServer()
        Log.d("GQL-AUTOE2E","stop");
    }
}
