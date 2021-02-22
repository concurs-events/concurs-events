export class EventsListing {

    public breadCrumb: Object;
    public pastEvents: Object;
    public events: Object;

    constructor(

        breadCrumb: Object = {},
        pastEvents: Object = {},
        events: Object = {},

    ) {

        this.breadCrumb = breadCrumb
        this.pastEvents = pastEvents
        this.events = events

    }
}
