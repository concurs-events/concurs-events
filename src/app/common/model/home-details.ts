export class HomeDetails {

    public heroBanner: Object;
    public rtf: Object[];
    public pastEvents: Object;
    public events: Object;
    public gallery: Object;


    constructor(

        heroBanner: Object = {},
        rtf: Object[] = [],
        pastEvents: Object = {},
        events: Object = {},
        gallery: Object = {},

    ) {

        this.heroBanner = heroBanner
        this.rtf = rtf
        this.pastEvents = pastEvents
        this.events = events
        this.gallery = gallery

    }
}
