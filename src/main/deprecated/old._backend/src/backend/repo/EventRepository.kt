package edu.sjf.swe.backend.repo

import edu.sjf.swe.backend.objects.Event
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Component

@Component
class EventRepository: ActiveEventRepository {

    override fun findByEventId(eventId: Long): Event {
        TODO("Not yet implemented")
    }

    override fun getEndedEventsByEventId(eventId: Long): List<Event> {
        TODO("Not yet implemented")
    }
}