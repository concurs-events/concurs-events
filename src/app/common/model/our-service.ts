export class OurService {

    public breadCrumb: Object;
    public rtf: Object[];

    constructor(

        breadCrumb: Object = {},
        rtf: Object[] = [],

    ) {

        this.breadCrumb = breadCrumb
        this.rtf = rtf

    }
}
