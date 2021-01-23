export class HeaderDetails {

    public logo: Object;
    public nav: Object[];

    constructor(

        logo: Object = {},
        nav: Object[] = [],

    ) {

        this.logo = logo
        this.nav = nav

    }
}
