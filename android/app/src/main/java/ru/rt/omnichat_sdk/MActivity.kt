package ru.rt.omnichat_sdk

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import okhttp3.*
import java.io.File
import java.io.FileOutputStream
import java.io.IOException


class MActivity : Activity() {
    var bundlePath : String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.mactivity_layout)

        val downloadButton = findViewById<Button>(R.id.download_file)
        downloadButton.setOnClickListener {
            downloadFile()
        }
        val start = findViewById<Button>(R.id.start_activity)
        start.setOnClickListener {
            startA()
        }
    }


    fun downloadFile() {
        val client = OkHttpClient();
        val request = Request.Builder()
            .url("http://192.168.1.188:80/index.android.bundle")
            .get()
            .build();

        try {

            val response = client.newCall(request).enqueue(object : Callback {
                override fun onFailure(call: Call, e: IOException) {
                    TODO("Not yet implemented")
                }

                override fun onResponse(call: Call, response: Response) {
                    val inputStream = response.body?.byteStream();
                    val bytes = inputStream?.readBytes()

                    val path = filesDir.absolutePath + "/index.android.bundle"
                    val file = File(path)
                    val fileOutput = FileOutputStream(file)
                    fileOutput.write(bytes)
                    fileOutput.flush()
                    fileOutput.close()
                    bundlePath = path
                }
            })
        } catch (e: Exception) {
            Log.e("MActivity", e.message ?: "")
        }
    }

    fun startA() {
        val intent = Intent(this, MainActivity::class.java).apply {
            putExtra("rt.ru.sdk_example.PATH", bundlePath)
        }
        startActivity(intent)
    }

}
