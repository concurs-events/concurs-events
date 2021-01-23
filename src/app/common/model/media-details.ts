export class MediaDetails {

    public name: string;
    public altText: string;
    public width: string;
    public height: string;
    public url: string;


    constructor(

        name: string = '',
        altText: string = '',
        width: string = '',
        height: string = '',
        url: string = '',

    ) {

        this.name = name
        this.altText = altText
        this.width = width
        this.height = height
        this.url = url

    }
}
