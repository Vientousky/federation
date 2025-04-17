import { Montserrat , Audiowide } from 'next/font/google'

export const montserrat = Montserrat({
    subsets:['latin'],
    weight:['400','500','600','700'],
    variable:'--fonts-primario'
});

export const audiowide = Audiowide ({
    subsets:['latin'],
    weight:['400'],
    variable:'--fonts-casual'
})