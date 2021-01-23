export class TwoCol {

    public title: string;
    public id: string;
    public shortDescription: string;
    public itemsList: Object[]


    constructor(

        title: string = '',
        id: string = '',
        shortDescription: string = '',
        itemsList: Object[] = []

    ) {

        this.title = title
        this.id = id
        this.shortDescription = shortDescription
        this.itemsList = itemsList
    }
}
