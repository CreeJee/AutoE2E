package com.example.autoe2e.lib
import io.ktor.application.call
import io.ktor.http.cio.websocket.pingPeriod
import io.ktor.application.install
import io.ktor.features.CallLogging
import io.ktor.features.DefaultHeaders
import io.ktor.http.cio.websocket.Frame
import io.ktor.http.cio.websocket.timeout
import io.ktor.response.respondText
import io.ktor.routing.get
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import io.ktor.server.netty.NettyApplicationEngine
import io.ktor.sessions.Sessions
import io.ktor.sessions.cookie
import io.ktor.websocket.WebSockets
import io.ktor.websocket.webSocket
import kotlinx.coroutines.channels.consumeEach
import java.time.Duration
data class GQLSession(val id: String)
private val app = GQLApplication()
fun startServer() {
    app.start();
}
fun stopServer(){
    app.stop()
}
class GQLApplication  {
    private var app: NettyApplicationEngine;
    constructor() {
        this.app =  embeddedServer(Netty, port = 8080, host = "0.0.0.0"){
            install(DefaultHeaders)
            install(CallLogging)
            install(WebSockets) {
                pingPeriod = Duration.ofMinutes(1)
                timeout = Duration.ofMinutes(1)
            }
            install(Sessions) {
                cookie<GQLSession>("AutoE2EData")
            }
            routing {
                webSocket("/e2e") {
                    incoming.consumeEach {
                        frame ->  when {
                            frame is Frame.Text -> {
                                outgoing.send(Frame.Text(socket.parse(frame)))
                            }
                        }
                    }
                }

                get("/") {
                    call.respondText {
                        "Hello World!"
                    }
                }
            }
        }
    }
    private val socket = GQLSocket();
    fun start() {
        this.app.start()
    }
    fun stop() {
        this.app.stop(0L,0L);
    }
}