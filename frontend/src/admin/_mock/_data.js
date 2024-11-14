export const _myAccount = {
    displayName: 'Jaydon Frankie',
    email: 'jaydonfr@gmail.com',
    photoURL: '/assets/images/avatar/avatar-25.webp',
};

export const _id = (index) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index}`;

export const _fullNames = (index) => [
    'Billy Stoltenberg', 'Eloise Ebert', 'Teresa Luettgen', 'Salvador Mayert',
    'Dr. Guadalupe Rath', 'Kelvin Pouros', 'Thelma Langworth', 'Kristen Wunsch',
    'Steve Welch', 'Brian Jacobs', 'Lillie Schultz', 'Mr. Conrad Spinka',
    'Charlene Krajcik', 'Kerry Kuhlman', 'Betty Hammes', 'Tony Paucek PhD',
    'Sherri Davis', 'Angel Rolfson-Kulas', 'Dr. Lee Doyle-Grant', 'Cheryl Romaguera',
    'Billy Braun', 'Adam Trantow', 'Brandon Von', 'Willis Ankunding'
][index];

export const _emails = (index) => [
    'billy.stoltenberg@example.com', 'eloise.ebert@example.com', 'teresa.luettgen@example.com', 'salvador.mayert@example.com',
    'guadalupe.rath@example.com', 'kelvin.pouros@example.com', 'thelma.langworth@example.com', 'kristen.wunsch@example.com',
    'steve.welch@example.com', 'brian.jacobs@example.com', 'lillie.schultz@example.com', 'conrad.spinka@example.com',
    'charlene.krajcik@example.com', 'kerry.kuhlman@example.com', 'betty.hammes@example.com', 'tony.paucek@example.com',
    'sherri.davis@example.com', 'angel.rolfson@example.com', 'lee.doyle@example.com', 'cheryl.romaguera@example.com',
    'billy.braun@example.com', 'adam.trantow@example.com', 'brandon.von@example.com', 'willis.ankunding@example.com'
][index];

export const _phoneNumbers = (index) => [
    '123-456-7890', '234-567-8901', '345-678-9012', '456-789-0123',
    '567-890-1234', '678-901-2345', '789-012-3456', '890-123-4567',
    '901-234-5678', '012-345-6789', '123-456-7800', '234-567-8900',
    '345-678-9000', '456-789-0101', '567-890-1202', '678-901-2303',
    '789-012-3404', '890-123-4505', '901-234-5606', '012-345-6707',
    '123-456-7808', '234-567-8909', '345-678-9010', '456-789-0111'
][index];

export const _users = [...Array(24)].map((_, index) => ({
    id: _id(index),
    avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
    name: _fullNames(index),
    email: _emails(index),
    phonenumber: _phoneNumbers(index),
    status: index % 4 ? 'active' : 'banned',
    role: index % 24 ? 'user' : 'admin'
}));




