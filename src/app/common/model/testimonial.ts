export class Testimonial {

    public name: string;
    public designation: string;
    public message: string;
    public media: Object;


    constructor(

        name: string = '',
        designation: string = '',
        message: string = '',
        media: Object = {}

    ) {

        this.name = name
        this.designation = designation
        this.message = message
        this.media = media

    }
}
