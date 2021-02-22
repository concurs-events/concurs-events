export class EventDetails {

    public heroBanner: Object;
    public startDate: string
    public eventDesc: Object
    public people: Object
    public sponser: Object
    public locationDetails: Object

    constructor(
        heroBanner: Object = {},
        startDate: string = '',
        eventDesc: Object = {},
        people: Object = {},
        sponser: Object = {},
        locationDetails: Object = {}
    ) {
        this.heroBanner = heroBanner
        this.startDate = startDate
        this.eventDesc = eventDesc
        this.people = people
        this.sponser = sponser
        this.locationDetails = location
    }
}
