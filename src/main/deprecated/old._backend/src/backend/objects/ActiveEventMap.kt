package edu.sjf.swe.backend.objects;

import java.util.concurrent.ConcurrentHashMap

val EMPTY_EVENT = Event(-1,0,0, 0, "", "")

/**
 * ActiveEventMap
 * Contains
 * activeEvents:    A conccurrent hash map of active events
 * eventActivity:   A conccurrent hash map of events current state
 * eventLogs:       A conccurrent hash map of event logs
 */
class ActiveEventMap {
    private val activeEvents:   ConcurrentHashMap<Long, Event>      = ConcurrentHashMap()
    private val eventActivity:  ConcurrentHashMap<Long, Boolean>    = ConcurrentHashMap()
    private val eventLogs:      ConcurrentHashMap<Long, EventLog>   = ConcurrentHashMap()

    /**
     * Checks weather the entered id is linked to an active event (Does not check if event is expired)
     *
     * @param eventId the id of the event to check for existence
     *
     * @return true if the entered id is linked to an active event, false otherwise
     */
    private fun isEvent(id: Long): Boolean {
        return activeEvents.containsKey(id)
                && eventActivity.containsKey(id)
                && eventLogs.containsKey(id)
    }
    fun isEvent(event: Event): Boolean {
        return event.eventId?.let { isEvent(it) } == true
    }

    /**
     * Get event by ID if does not exist return empty event
     */
    fun getEvent(id: Long): Event {
        return activeEvents[id]?: EMPTY_EVENT
    }

    /**
     * Create a new event after checking if the event ID is take
     *
     * @param event: Object containing event information
     */
    fun createEvent(event: Event) {
        val id: Long = event.eventId ?: return

        if (isEvent(id)) return

        activeEvents[id] = event
        eventActivity[id] = true

        eventLogs[id] = EventLog()
    }
    fun replaceEvent(event: Event) {
        val id: Long = event.eventId?: return
        activeEvents[id] = event
    }

    /**
     * Log a new record into an events logs
     *
     * @param record the record to log
     */
    fun log(record: Record) {
        if (!isEvent(record.eventId)) return

        if (activeEvents[record.eventId]?.isOver() == true)
            eventActivity[record.eventId] = false

        eventLogs[record.eventId]?.add(record)
    }
    /**
     * Remove an event from the active event map
     *
     * @param event: Event to remove
     */
    private fun deleteEvent(id: Long) {
        if (!isEvent(id)) return

        activeEvents.remove(id)
        eventActivity.remove(id)
        eventLogs.remove(id)
    }
    fun deleteEvent(event: Event) {
        event.eventId?.let { deleteEvent(it) }
    }
    /**
     * End an event drop the event and return ended event object with log and event data
     *
     * @param event
     * @return endedEvent
     */
    private fun endEvent(event: Event): EndedEvent {
        val log: Log = eventLogs[event.eventId]?.toLog()
            ?: return EndedEvent(EMPTY_EVENT, Log(listOf()))
        deleteEvent(event)
        return EndedEvent(event, log)
    }

    /**
     * Audit all events, check if over if so end and discard
     *
     * @return list of ended events with logs
     */
    fun audit(): List<EndedEvent> {
        val events: MutableList<EndedEvent> = mutableListOf()
        for ((id, event) in activeEvents) {
            if (event.isOver()) {
                events.add(endEvent(event))
            }
        }
        return events
    }

}

data class Log(val records: List<Record>)
data class EndedEvent(val event: Event, val log: Log)



