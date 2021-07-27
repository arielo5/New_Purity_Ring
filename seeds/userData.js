const { User } = require('../models');

const userdata = [
    {
        first_name: 'Jon',
        last_name: 'Smith',
        email: 'jonsmith@gmail.com',
        password: 'password',
        is_coach: false,
    },
    {
        first_name: 'Bob',
        last_name: 'Smith',
        email: 'bobsmith@gmail.com',
        password: 'password',
        is_coach: true,
    },
    {
        first_name: 'Mike',
        last_name: 'Jones',
        email: 'mike@gmail.com',
        password: 'password',
        is_coach: false,
    },
    {
        first_name: 'Bill',
        last_name: 'Olsen',
        email: 'bill@gmail.com',
        password: 'password',
        is_coach: true,
    },
    {
        first_name: 'Sam',
        last_name: 'Oscar',
        email: 'sam@gmail.com',
        password: 'password',
        is_coach: false,
    },
    {
        first_name: 'Will',
        last_name: 'Olsen',
        email: 'will@gmail.com',
        password: 'password',
        is_coach: false,
    },
    {
        first_name: 'Tim',
        last_name: 'Olsen',
        email: 'tim@gmail.com',
        password: 'password',
        is_coach: false,
    },
];

const seedUsers = () => User.bulkCreate(userdata);

module.exports = seedUsers;