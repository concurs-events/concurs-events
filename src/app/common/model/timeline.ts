export class Timeline {

    public date: string;
    public title: string;
    public description: string;


    constructor(

        date: string = '',
        title: string = '',
        description: string = '',

    ) {

        this.date = date
        this.title = title
        this.description = description
    }
}
