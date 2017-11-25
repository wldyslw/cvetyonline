//const categoriesArr = ["Букеты", "Цветы", "Горшки", "Наши работы", "Букеты невесты", "Подарки"];

export const categories = [
    { name: 'bouquets', ally: 'Букеты' },
    { name: 'flowers', ally: 'Цветы поштучно' },
    { name: 'pots', ally: 'Цветы в горшках' },
    { name: 'handmade', ally: 'Цветочные композиции' },
    { name: 'wedding', ally: 'Букеты невесты' },
    { name: 'gifts', ally: 'Подарки' },
    //{name: '', ally: 'Фейерверки'}
];

export const lorem = {
    short: 'Lorem ipsum dolor sit amet.',
    mid: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    long: '' 
};

export const backend = {
    hostname: 'http://cvetyonline.by',
    // hostname: 'http://localhost:3000',
    localhostIP: '46.101.155.51',
    requestBasePath: '/api/v1/products',
    postBasePath: '/api/v1/orders'
};
