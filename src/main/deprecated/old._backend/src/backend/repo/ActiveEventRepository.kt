package edu.sjf.swe.backend.repo

import edu.sjf.swe.backend.objects.Event

interface ActiveEventRepository {
    fun findByEventId(eventId: Long): Event
    fun getEndedEventsByEventId(eventId: Long): List<Event>
}