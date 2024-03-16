const Components = {
    Basic : (experience, attendance) => {experience * 1000000},
    Bonus : (experience, attendance) => {attendance * 1000},
    Housing_Allowance : (experience, attendance) => {100000},
    Tax : (experience, attendance) => {
        if(experience * 1000000 < 2000000) {
            return 5;
        }
        else if(experience * 1000000 > 2000000) {
            if(experience * 1000000 < 6000000) {
                return 8;
            }
            return 12;
        }
        return 6;
    },
};

export default Components;