export default class Event {
    static eventId = 0;
    
    constructor(eventName, timeStart, timeEnd, location, description) {
            this.eventId = ++Event.eventId;
            this.eventName = eventName;
            this.timeStart = timeStart;
            this.timeEnd = timeEnd;
            this.date = new Date().toLocaleDateString();
            this.location = location;
            this.description = description;
        }
}