export interface EventInterface {
    id: number;
    /** event's name */
    label: string;
    /** event's type */
    type: string;
    /** event's description */
    description: string;
    /** event's host */
    host: {
        name: string;
        surname: string;
    };
    /** host's email */
    email?: string;
    /** host's phone number */
    phoneNumber?: string;
    /** maximal amount of attendees */
    guestsAmount: number;
    /** event's address */
    address: {
        country: string;
        city: string;
        street: string;
        house: string
    };
    place: string;
    /** event's date */
    date: string;
    /** event's time */
    time?: string;
    /** event's price */
    price?: number;
}
