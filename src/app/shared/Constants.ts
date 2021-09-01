import { ColorType } from './models/schema.model';

export const Constants = {

    /** color choice */
    issueTypeListWithColor: {
        [ColorType.LightPink]: {
            name: ColorType.LightPink,
            color: '#FFB6C1'
        },
        [ColorType.LightGreen]: {
            name: ColorType.LightGreen,
            color: '#90EE90'
        },
        [ColorType.Yellow]: {
            name: ColorType.Yellow,
            color: 	'#FFFF00'
        },
        [ColorType.LightBlue]: {
            name: ColorType.LightBlue,
            color: '#add8e6'
        },
        [ColorType.LightSteelBlue]: {
            name: ColorType.LightSteelBlue,
            color: '#b0c4de'
        }
    }
};
