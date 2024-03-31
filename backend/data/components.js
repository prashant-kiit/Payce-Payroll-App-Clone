const Components = {
    Basic : (experience, attendance) => {return Math.pow(experience, 1) * Math.pow(attendance, 0) * 100000},
    Housing_Allowance : (experience, attendance) => {return Math.pow(experience, 1) * Math.pow(attendance, 0) * 10000},
    Transport_Allowance : (experience, attendance) => {return Math.pow(experience, 1) * Math.pow(attendance, 0) * 100},
    Bonus : (experience, attendance) => {return Math.pow(experience, 0) * Math.pow(attendance, 1) * 1000},
    Tax : (experience, attendance) => {
        if(Math.pow(experience, 1) * Math.pow(attendance, 0) * 100000 < 200000) {
            return 5;
        }
        else if(Math.pow(experience, 1) * Math.pow(attendance, 0) * 100000 > 200000) {
            if(Math.pow(experience, 1) * Math.pow(attendance, 0) * 100000 < 600000) {
                return 8;
            }
            return 12;
        }
        return 6;
    },
};

export default Components;