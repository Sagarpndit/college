export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const gender = [
    {
        name: 'Male',
        value: 'Male'
    },
    {
        name: 'Female',
        value: 'Female'
    },
    {
        name: 'Other',
        value: 'Other'
    }
];

export const grade = [
    {
        name: 'School',
        value: 'School'
    },
    {
        name: 'High School',
        value: 'High School'
    },
    {
        name: 'College / University',
        value: 'College / University'
    }
];

export const higherQualification = [
    {
        name: 'Graduation',
        value: 'Graduation'
    },
    {
        name: 'Post Graduation',
        value: 'Post Graduation'
    },
    {
        name: 'PhD',
        value: 'PhD'
    }
];

export const experience = [
    {
        name: 'Fresher',
        value: 0
    },
    {
        name: '1 Year',
        value: 1
    },
    {
        name: '2 Years',
        value: 2
    },
    {
        name: '3 Years',
        value: 3
    },
    {
        name: '4 Years',
        value: 4
    },
    {
        name: '5 Years',
        value: 5
    },
    {
        name: '6 Years',
        value: 6
    },
    {
        name: '7 Years',
        value: 7
    },
    {
        name: '8 Years',
        value: 8
    },
    {
        name: '9 Years',
        value: 9
    },
    {
        name: '10 Years',
        value: 9
    },
    {
        name: '11 Years',
        value: 11
    },
    {
        name: '12 Years',
        value: 12
    },
    {
        name: '13 Years',
        value: 13
    },
    {
        name: '14 Years',
        value: 14
    },
    {
        name: '15 Years',
        value: 15
    },
    {
        name: '16 Years',
        value: 16
    },
    {
        name: '17 Years',
        value: 17
    },
    {
        name: '18 Years',
        value: 18
    },
    {
        name: '19 Years',
        value: 19
    },
    {
        name: '20 Years',
        value: 20
    }
];

export const perHoursPriceUSD = [
    {
        name: '1$',
        value: 1
    },
    {
        name: '2$',
        value: 2
    },
    {
        name: '3$',
        value: 3
    },
    {
        name: '4$',
        value: 4
    },
    {
        name: '5$',
        value: 5
    },
    {
        name: '6$',
        value: 6
    },
    {
        name: '7$',
        value: 7
    },
    {
        name: '8$',
        value: 8
    },
    {
        name: '9$',
        value: 9
    },
    {
        name: '10$',
        value: 10
    },
    {
        name: '11$',
        value: 11
    },
    {
        name: '12$',
        value: 12
    },
    {
        name: '13$',
        value: 13
    },
    {
        name: '14$',
        value: 14
    },
    {
        name: '15$',
        value: 15
    },
    {
        name: '16$',
        value: 16
    },
    {
        name: '17$',
        value: 17
    },
    {
        name: '18$',
        value: 18
    },
    {
        name: '19$',
        value: 19
    },
    {
        name: '20$',
        value: 20
    },
    {
        name: '25$',
        value: 25
    },
    {
        name: '30$',
        value: 30
    },
    {
        name: '35$',
        value: 35
    },
    {
        name: '40$',
        value: 40
    },
    {
        name: '45$',
        value: 45
    },
    {
        name: '50$',
        value: 50
    }
];

export const perHoursPriceINR = [
    {
        name: '100 ₹',
        value: 100
    },
    {
        name: '200 ₹',
        value: 200
    },
    {
        name: '300 ₹',
        value: 300
    },
    {
        name: '400 ₹',
        value: 400
    },
    {
        name: '500 ₹',
        value: 500
    },
    {
        name: '600 ₹',
        value: 600
    },
    {
        name: '700 ₹',
        value: 700
    },
    {
        name: '800 ₹',
        value: 800
    },
    {
        name: '900 ₹',
        value: 900
    },
    {
        name: '1000 ₹',
        value: 1000
    },
    {
        name: '1100 ₹',
        value: 1100
    },
    {
        name: '1200 ₹',
        value: 1200
    },
    {
        name: '1300 ₹',
        value: 1300
    },
    {
        name: '1400 ₹',
        value: 1400
    },
    {
        name: '1500 ₹',
        value: 1500
    },
    {
        name: '1600 ₹',
        value: 1600
    },
    {
        name: '1700 ₹',
        value: 1700
    },
    {
        name: '1800 ₹',
        value: 1800
    },
    {
        name: '1900 ₹',
        value: 1900
    },
    {
        name: '2000 ₹',
        value: 2000
    },
    {
        name: '2500 ₹',
        value: 2500
    },
    {
        name: '3000 ₹',
        value: 3000
    },
    {
        name: '3500 ₹',
        value: 3500
    },
    {
        name: '4000 ₹',
        value: 4000
    },
    {
        name: '4500 ₹',
        value: 4500
    },
    {
        name: '5000 ₹',
        value: 5000
    }
];

export const avaliableTime = [
    {
        name: '00:00 - 02:00',
        value: '00:00 - 02:00'
    },
    {
        name: '02:00 - 04:00',
        value: '02:00 - 04:00'
    },
    {
        name: '04:00 - 06:00',
        value: '04:00 - 06:00'
    },
    {
        name: '06:00 - 08:00',
        value: '06:00 - 08:00'
    },
    {
        name: '08:00 - 10:00',
        value: '08:00 - 10:00'
    },
    {
        name: '10:00 - 12:00',
        value: '10:00 - 12:00'
    },
    {
        name: '12:00 - 14:00',
        value: '12:00 - 14:00'
    },
    {
        name: '14:00 - 16:00',
        value: '14:00 - 16:00'
    },
    {
        name: '16:00 - 18:00',
        value: '16:00 - 18:00'
    },
    {
        name: '18:00 - 20:00',
        value: '18:00 - 20:00'
    },
    {
        name: '20:00 - 22:00',
        value: '20:00 - 22:00'
    },
    {
        name: '22:00 - 24:00',
        value: '22:00 - 24:00'
    }
];
