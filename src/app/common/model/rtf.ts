export class Rtf {

    public title: string;
    public id: string;
    public sections: Object[];


    constructor(

        title: string = '',
        id: string = '',
        sections: Object[] = []

    ) {

        this.title = title
        this.id = id
        this.sections = sections

    }
}
