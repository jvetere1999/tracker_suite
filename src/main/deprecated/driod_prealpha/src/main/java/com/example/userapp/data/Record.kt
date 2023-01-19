package com.example.userapp.data



data class Record(
    val starttime: String,
    val deviceid: String,
    val endtime: String
) {
    override fun toString(): String {
        return "'$starttime', '$deviceid', '$endtime');"
    }
}
data class UserRecord(val userId: Int, val record: Record) {
    override fun toString(): String {
        return "INSERT INTO record (userID, startTime, deviceId, endTime) VALUES ('$userId', " + record.toString()
        //INSERT INTO my_table (userID, startTime, deviceId, endTime)
        //VALUES ('user1', '2022-01-01 12:00:00', 'device1', '2022-01-01 13:00:00');
    }
}