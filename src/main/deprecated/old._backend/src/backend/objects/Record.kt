package edu.sjf.swe.backend.objects

import org.hibernate.Hibernate
import javax.persistence.*


@Entity
data class Record(
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    val id: Long?,
    @Column(name = "user_id")
    val userId: Long,
    @Column(name = "event_id")
    val eventId: Long,
    @Column(name = "time_created")
    val timeCreated: Long
    /*
            History tracking and centralization of data records
            Retain system pattern
             */
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as Record

        return id != null && id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    @Override
    override fun toString(): String {
        return this::class.simpleName + "(id = $id , userId = $userId , eventId = $eventId , timeCreated = $timeCreated )"
    }
}
