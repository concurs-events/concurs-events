export class HomeDetails {

    public heroBanner: Object;
    public rtf: Object[];
    public pastEvents: Object;
    public gallery: Object;


    constructor(

        heroBanner: Object = {},
        rtf: Object[] = [],
        pastEvents: Object = {},
        gallery: Object = {},

    ) {

        this.heroBanner = heroBanner
        this.rtf = rtf
        this.pastEvents = pastEvents
        this.gallery = gallery

    }
}
