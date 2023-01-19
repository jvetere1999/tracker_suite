package edu.sjf.swe.backend

import edu.sjf.swe.backend.objects.Event
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SweDemoBackendApplication

public val ACTIVE_EVENTS: MutableMap<Long, Event> = mutableMapOf()

fun main(args: Array<String>) {
    runApplication<SweDemoBackendApplication>(*args)
}
