export class Util {

    CF_DELIVERY_API = 'https://cdn.contentful.com/spaces/i9f438s6ez2a/environments/master/entries/';
    CF_DELIVERY_ACCESS_KEY = '8An7wVkx6PFqqUMe-wpPcIlHihHCHpGkCA-0plecmf0';
    NETLIFY_CONTACT_FUNCTION = 'https://www.concursevents.com/.netlify/functions/insert-user-data';
    NETLIFY_EMAIL_FUNCTION = 'https://www.concursevents.com/.netlify/functions/send-mail';
    HOME_CONTENT_TYPE = 'homePage';
    HEADER_CONTENT_TYPE = 'header';
    CONTACT_CONTENT_TYPE = 'contactPage';
    EVENT_CONTENT_TYPE = 'eventListing';
    SERVICE_CONTENT_TYPE = 'rtf';
    EVENT_DETAILS_CONTENT_TYPE = 'eventPage';

    notBlankOrEmpty(input): boolean {
        if (input != undefined && input != '' && input != {} && input != []) {
            return true
        }
        return false
    }

    isStringNotEmpty(str: string): boolean {
        if (str != undefined && str.trim() != '') {
            return true
        }
        return false
    }

}
