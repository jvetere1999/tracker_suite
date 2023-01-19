package edu.sjf.swe.backend.controller

import edu.sjf.swe.backend.objects.ActiveEventMap
import edu.sjf.swe.backend.objects.Event
import edu.sjf.swe.backend.objects.Record
import org.springframework.web.bind.annotation.*

@RestController
class LiveController {
    val map: ActiveEventMap = ActiveEventMap()

    /**
     * Check in record
     * @param record
     *      user_id: Long
     *      event_id: Long
     *      timeCreated: Long
     * @Return some json file rn just a string
     */
    @ResponseBody
    @PostMapping(value = ["/check-in"])
    fun checkIn(@RequestBody record: Record): String {
        map.log(record)
        return "User record successfully to ${record.eventId}"
    }

    /**
     * Create a new event object in the Map
     * @param event
     *      org_id: long
     *      time_start: long
     *      time_end: long
     *      location: String
     *      description: String
     */
    @ResponseBody
    @PostMapping(value = ["/create-event"])
    fun createEvent(@RequestBody event: Event): String {
        map.createEvent(event)
        return "Event ${event.eventId} created successfully"
    }
    /**
     * Edit a old event object in the Map if not there createEvent
     * @param event
     *      org_id: long
     *      time_start: long
     *      time_end: long
     *      location: String
     *      description: String
     */
    @ResponseBody
    @PostMapping(value = ["/edit-event"])
    fun editEvent(@RequestBody event: Event): String {
        if (map.isEvent(event))
            map.replaceEvent(event)
        else
            map.createEvent(event)
        return "Event ${event.eventId} edited successfully"
    }

    /**
     * Delete a event object in the Map
     * @param event
     *      org_id: long
     *      time_start: long
     *      time_end: long
     *      location: String
     *      description: String
     */
    @ResponseBody
    @PostMapping(value = ["/delete-event"])
    fun deleteEvent(@RequestBody event: Event): String {
        map.deleteEvent(event)
        return "Event ${event.eventId} deleted successfully"
    }

    /**
     * Audit conccurent Maps for ended events
     */
    @ResponseBody
    @GetMapping(value = ["/audit"])
    fun audit(): String {
        map.audit()
        return "Event map audit successfully"
    }

    @GetMapping(value = ["/view-event/{id}"])
    fun viewEvent(@PathVariable("id") id: Long): String {
        val event: Event = map.getEvent(id)
        if (event.isEmpty()) {
            return "Event $id not found"
        }
        return event.toString()
    }



}