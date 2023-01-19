package edu.sjf.swe.backend.objects

class EventLog {
    private val log: MutableList<Record> = mutableListOf()
    fun add(record: Record) = log.add(record)
    operator fun iterator(): Iterator<Record> = log.iterator()
    operator fun get(i: Int): Record = log.get(i)

    fun toLog() = Log(log)
}