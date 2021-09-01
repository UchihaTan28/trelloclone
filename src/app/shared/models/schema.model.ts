
export interface Card {
    title: string;
    desc?: string;
    createdAt?: Date;
    colorType?: ColorType;
}
 export interface Issue {
     name: ColorType;
    color: string;
 }

export enum ColorType {
    LightBlue = '1',
    LightSteelBlue = '2',
    LightPink = '3',
    LightGreen = '4',
    Yellow = '5'
}

export interface List {
    title: string;
    talks: Card[];
    id: string;
}

export interface Board {
    title: string;
    tracks: List[];
}