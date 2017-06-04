import '../dev/flowers.json'

export default (request, callback) => {
    fetch(request, {method: 'GET'})
    .then(response => {
        return response.json();
    })
    .then(json => {
        const flowersDescriber = [];
        json.forEach(e => {
            flowersDescriber.push({
                id: e.ID,
                name: e.Name,
                category: e.Category,
                description: e.Description,
                price: e.Price,
                inStock: e.InStock,
                imgPath: './img/promo2.jpeg'
            });
        });
        return flowersDescriber;
    })
    .then(flowersDescriber => {
        if(callback) callback(flowersDescriber);
    });
};
