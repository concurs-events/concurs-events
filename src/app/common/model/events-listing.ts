export class EventsListing {

    public breadCrumb: Object;
    public pastEvents: Object;

    constructor(

        breadCrumb: Object = {},
        pastEvents: Object = {},

    ) {

        this.breadCrumb = breadCrumb
        this.pastEvents = pastEvents

    }
}
