export type sunsetSunrise = {
    results: {
        sunrise: string;
        sunset: string;
        first_light: string;
        last_light: string;
        dawn: string;
        dusk: string;
        solar_noon: string;
        golden_hour: string;
        day_length: string;
        timezone: string;
        utc_offset: number;
    };
    status: string;
};

export type tempo = {
    product: string;
    init: string;
    dataseries: [
        {
            timepoint: string;
            cloudcover: number;
            seeing: number;
            transparency: number;
            lifted_index: number;
            rh2m: number;
            wind10m: { direction: string; speed: number };
            temp2m: number;
            prec_type: string;
            img: string;
        }
    ];
};
