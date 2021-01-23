export class Herobanner {

    public heroImage: Object;
    public title: string;
    public tag: string;
    public description: string;
    public date: string;


    constructor(

        heroImage: Object = {},
        title: string = '',
        tag: string = '',
        description: string = '',
        date: string = '',

    ) {

        this.heroImage = heroImage
        this.title = title
        this.tag = tag
        this.description = description
        this.date = date

    }
}
