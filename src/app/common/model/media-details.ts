export class MediaDetails {

    public name: string;
    public title: string;
    public altText: string;
    public width: string;
    public height: string;
    public url: string;


    constructor(

        name: string = '',
        title: string = '',
        altText: string = '',
        width: string = '',
        height: string = '',
        url: string = '',

    ) {

        this.name = name
        this.title = title
        this.altText = altText
        this.width = width
        this.height = height
        this.url = url

    }
}
