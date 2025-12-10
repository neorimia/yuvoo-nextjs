import img1 from "../../public/assets/img/testimonials/1.png";
import img2 from "../../public/assets/img/testimonials/3.png";
import img3 from "../../public/assets/img/testimonials/2.png";
import img4 from "../../public/assets/img/testimonials/4.png";
import img5 from "../../public/assets/img/testimonials/5.png";
import img6 from "../../public/assets/img/testimonials/6.png";
import { ITestimonialItem } from "@/types/testimonial-interface";

const testimonialData: ITestimonialItem[] = [
    {
        id: 1,
        review: 'Happy Christmas to the whole Kindedo from everyone at Monkton. A big thank you to Kindedo pupil Will who lent his Kindedo to this card.',
        author: 'Norma J. Johnston',
        authorImg: img1,
        rating: 5,
    },
    {
        id: 2,
        review: 'Your child will laugh, play and explore at Summer at MLS. From soccer, water play, art, music, theater and science, Shabbat celebrations, cooking.',
        author: 'Mateo D. Daniel',
        authorImg: img2,
        rating: 5,
    },
    {
        id: 3,
        review: 'The unique Mentone Grammar Community is our point of difference compared to many in the industry. The School often talks about the concept.',
        author: 'Michael M. Mason',
        authorImg: img3,
        rating: 4,
    },
    {
        id: 4,
        review: 'Happy Christmas to the whole Kindedo from everyone at Monkton. A big thank you to Kindedo pupil Will who lent his Kindedo to this card.',
        author: 'Norma J. Johnston',
        clrClass: 'theme-bg-6',
        authorImg: img1,
        delay: '.3s',
        rating: 5,
    },
    {
        id: 5,
        review: 'Your child will laugh, play and explore at Summer at MLS. From soccer, water play, art, music, theater and science, Shabbat celebrations, cooking.',
        author: 'Mateo D. Daniel',
        clrClass: 'clr-1 theme-bg-7',
        authorImg: img2,
        delay: '.5s',
        rating: 5,
    },
    {
        id: 6,
        review: "Happy Christmas to the whole Kindedo from everyone at Monkton. A big thank you to Kindedo pupil Will who lent his Kindedo to this card, it's very usefull for children, join kindedo for better future.",
        author: 'Norma J. Johnston',
        clrClass: 'theme-bg-6',
        authorImg: img1,
        rating: 5,
    },
    {
        id: 7,
        review: 'Your child will laugh, play and explore at Summer at MLS. From soccer, water play, art, music, theater and science, Shabbat celebrations, cooking, they will love our academy, kindedo is best.',
        author: 'Mateo D. Daniel',
        clrClass: 'clr-3 theme-bg-7',
        authorImg: img2,
        rating: 5,
    },
    {
        id: 8,
        review: "Happy Christmas to the whole Kindedo from everyone at Monkton. A big thank you to Kindedo pupil Will who lent his Kindedo to this card, it's very usefull for children, join kindedo for better future.",
        author: 'Michael M. Mason',
        clrClass: 'theme-bg-6',
        authorImg: img3,
        rating: 5,
    },
    //page data
    {
        id: 9,
        review: 'From 1873 until 1877, St. Louis stood as the sole representative of free kindergarten work in the country. In 1877, Mrs. Quincy A. Shaw opened two kindergartens in the vicinity of Boston, Mass.',
        author: 'Norma J. Johnston',
        authorImg: img1,
        delay: '.4s',
        rating: 5,
    },
    {
        id: 10,
        review: 'In the summer of I878, Prof. Felix Adler, of New York, founder of the Society for Ethical Culture, spoke forcibly and effectively at a meeting of influential citizens of San Francisco, urging the.',
        author: 'Hillary H. Morse',
        authorImg: img2,
        delay: '.5s',
        rating: 5,
    },
    {
        id: 11,
        review: 'Growing work called for growing funds to meet expenses. City councils were petitioned, and the amount of five thousand dollars was granted for two successive years In the next year.',
        author: 'Robert M. Allen',
        authorImg: img3,
        delay: '.6s',
        rating: 5,
    },
    {
        id: 12,
        review: 'The Milwaukee Mission Kindergarten Association, still in its infancy, was established in i885, and has already under its charge, in its three kindergartens, one hundred and fifty.',
        author: 'John N. McGee',
        authorImg: img4,
        delay: '.7s',
        rating: 4,
    },
    {
        id: 13,
        review: 'To the question, “What is the apparent influence of the kindergarten upon the children?” comes a deluge of answers, their burden being, without exception, that the effects have been only.',
        author: 'Ines R. Duong',
        authorImg: img5,
        delay: '.8s',
        rating: 5,
    },
    {
        id: 14,
        review: '“Nearly every trade and art has its place in Froebel’s system, which gives the child the alphabet of them all by calling upon him to master the materials and principles common to.',
        author: 'Lenora C. Rivera',
        authorImg: img6,
        delay: '.9s',
        rating: 5,
    }
]
export default testimonialData;