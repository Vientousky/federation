import { Montserrat, Bebas_Neue  } from 'next/font/google'

export const montserrat = Montserrat({
    subsets:['latin'],
    weight:['400','500','600','700'],
    variable:'--fonts-primario'
});

export const bebas_Neue  =  Bebas_Neue ({
    subsets:['latin'],
    weight:['400'],
    variable:'--fonts-casual'
});
