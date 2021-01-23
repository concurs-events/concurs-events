export class Section {

    public title: string;
    public description: string;
    public media: Object;


    constructor(

        title: string = '',
        description: string = '',
        media: Object = {}

    ) {

        this.title = title
        this.description = description
        this.media = media

    }
}
