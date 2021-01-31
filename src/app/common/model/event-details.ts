export class EventDetails {

    public heroBanner: Object;
    public startDate: string
    public eventDesc: Object
    public people: Object
    public sponser: Object
    public location: Object

    constructor(
        heroBanner: Object = {},
        startDate: string = '',
        eventDesc: Object = {},
        people: Object = {},
        sponser: Object = {},
        location: Object = {}
    ) {
        this.heroBanner = heroBanner
        this.startDate = startDate
        this.eventDesc = eventDesc
        this.people = people
        this.sponser = sponser
        this.location = location
    }
}
