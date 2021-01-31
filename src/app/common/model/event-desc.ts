export class EventDesc {

    public name: string;
    public title: string;
    public address: string;
    public description: string;
    public date: string;
    public media: Object;


    constructor(

        name: string = '',
        title: string = '',
        address: string = '',
        description: string = '',
        date: string = '',
        media: Object = {}

    ) {

        this.name = name
        this.title = title
        this.address = address
        this.description = description
        this.date = date
        this.media = media

    }
}
