export class EventsCard {

    bannerMedia: Object;
    cardTitle: string;
    cardDate: string;
    cardDesc: string;
    cardUrl: string;

    constructor(
        bannerMedia: Object = {},
        cardTitle: string = '',
        cardDate: string = '',
        cardDesc: string = '',
        cardUrl: string = ''
    ) {
        this.bannerMedia = bannerMedia
        this.cardTitle = cardTitle
        this.cardDate = cardDate
        this.cardDesc = cardDesc
        this.cardUrl = cardUrl
    }
}
