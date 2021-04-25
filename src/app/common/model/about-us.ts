export class AboutUs {

    public breadCrumb: Object;
    public about: Object[];

    constructor(

        breadCrumb: Object = {},
        about: Object[] = [],

    ) {

        this.breadCrumb = breadCrumb
        this.about = about

    }
}
