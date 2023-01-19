package edu.sjf.swe.backend.objects

import org.hibernate.Hibernate
import javax.persistence.*

@Entity
data class Event (
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    val eventId: Long?,
    @Column(name = "org_id")
    val orgID: Long,
    @Column(name = "time_start")
    val timeStart: Long,
    @Column(name = "time_end")
    val timeEnd: Long,
    @Column(name = "location")
    val location: String,
    @Column(name = "description")
    val description: String
) {
    fun isOver(): Boolean {
        return timeEnd < System.currentTimeMillis()
    }
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as Event

        return eventId != null && eventId == other.eventId
    }
    fun isEmpty(): Boolean = eventId == -1L
    override fun hashCode(): Int = eventId.hashCode()

    @Override
    override fun toString(): String {
        return this::class.simpleName + "(eventId = $eventId , orgID = $orgID , timeStart = $timeStart , timeEnd = $timeEnd , location = $location , description = $description )"
    }
}