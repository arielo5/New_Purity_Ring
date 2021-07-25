const { User } = require('../models');

const userdata = [
    {
        first_Name: 'Jon',
        last_Name: 'Smith',
        email: 'jonsmith@gmail.com',
        password: 'password',
        is_coach: false,
    },
    {
        first_Name: 'Bob',
        last_Name: 'Smith',
        email: 'bobsmith@gmail.com',
        password: 'password',
        is_coach: true,
    },
    {
        first_Name: 'Mike',
        last_Name: 'Jones',
        email: 'mike@gmail.com',
        password: 'password',
        is_coach: false,
    },
    {
        first_Name: 'Bill',
        last_Name: 'Olsen',
        email: 'bill@gmail.com',
        password: 'password',
        is_coach: true,
    },
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;