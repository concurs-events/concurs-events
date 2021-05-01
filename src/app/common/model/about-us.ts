export class AboutUs {

    public breadCrumb: Object;
    public about: Object[];
    public testimonailList: Object[];

    constructor(

        breadCrumb: Object = {},
        about: Object[] = [],
        testimonailList: Object[] = [],

    ) {

        this.breadCrumb = breadCrumb
        this.about = about
        this.testimonailList = testimonailList

    }
}
