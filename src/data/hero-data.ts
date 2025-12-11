import shape from "../../public/assets/img/shape/curved-line-2.png";
import bg_1 from "../../public/assets/img/hero/slider-3.jpg";
import bg_2 from "../../public/assets/img/hero/slider-2.jpg";
import bg_3 from "../../public/assets/img/hero/slider-1.jpg";
import { IHeroItem } from "@/types/hero-interface";

const heroData: IHeroItem[] = [ 
    {
        id: 1,
        shape: shape,
        bg: bg_1,
        subTitle: 'Kindergarten Program',
        title: 'Best Children’s Education',
        btn: 'Admission open 22-23',
    },
    {
        id: 2,
        shape: shape,
        bg: bg_2,
        subTitle: 'Nursery Program',
        title: 'Best Nursery Education',
        btn: 'Admission open 22-23',
    },
    {
        id: 3,
        shape: shape,
        bg: bg_3,
        subTitle: 'Kindergarten Program',
        title: 'Best Junior KG Education',
        btn: 'Admission open 22-23',
    }
]
export default heroData;