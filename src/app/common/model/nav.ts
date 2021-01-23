export class Nav {

    public name: string;
    public link: string;
    public fragment: string;

    constructor(

        name: string = '',
        link: string = '',
        fragment = ''

    ) {

        this.name = name
        this.link = link
        this.fragment = fragment

    }
}
