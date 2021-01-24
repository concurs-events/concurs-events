export class Contact {

    public breadCrumb: Object;
    public title: string;
    public shortDesc: string;
    public address: string;
    public phone: string;
    public email: string;
    public website: string;
    public loction: string;

    constructor(

        breadCrumb: Object = {},
        title: string = '',
        shortDesc: string = '',
        address: string = '',
        phone: string = '',
        email: string = '',
        website: string = '',
        loction: string = '',

    ) {

        this.breadCrumb = breadCrumb
        this.title = title
        this.shortDesc = shortDesc
        this.address = address
        this.phone = phone
        this.email = email
        this.website = website
        this.loction = loction

    }
}
