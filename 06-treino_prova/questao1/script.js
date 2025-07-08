const products = [
    {id:1, nome:"Smart TV 55 polegadas 4K", tipo:"Eletrônicos", preco:2800.00},
    {id:2, nome:"Máquina de Lavar Roupa 12kg", tipo:"Eletrodomésticos", preco:1900.00},
    {id:3, nome:"Console de Videogame PlayStation 5", tipo:"Eletrônicos", preco:4500.00},
    {id:4, nome:"Bicicleta Mountain Bike Aro 29", tipo:"Esportes", preco:1600.00},
    {id:5, nome:"Fones de Ouvido Bluetooth Noise Cancelling", tipo:"Eletrônicos", preco:700.00},
    {id:6, nome:"Câmera Fotográfica Mirrorless", tipo:"Eletrônicos", preco:3200.00},
    {id:7, nome:"Panela de Pressão Elétrica", tipo:"Eletrodomésticos", preco:300.00},
    {id:8, nome:"Mochila para Notebook Reforçada", tipo:"Acessórios", preco:150.00},
    {id:9, nome:"Kit Ferramentas Profissional", tipo:"Ferramentas", preco:550.00},
    {id:10, nome:"Caixa de Som Portátil Bluetooth", tipo:"Eletrônicos", preco:250.00}
];

function getProducts(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const random = Math.floor(Math.random() * 100)

            if(random % 2 == 0){
                resolve(products);
            }else{
                reject({
                    "RES": "ERROR",
                    "MSG": "ERRO NO SISTEMA"
                })
            }

        }, 4000)
    });
} 

async function showProducts(){
    let tbody = document.querySelector("#table-products tbody");

    tbody.innerHTML = '';

    tbody.innerHTML = `
        <tr>
            <td colspan="4" style="text-align: center; padding: 20px; font-weight: bold; color: #555;">
                Carregando dados dos produtos...
            </td>
        </tr>
    `;

    try{
        const products = await getProducts()

        tbody.innerHTML = '';

        let tableRows = ''
        let soma = 0
        let maisCaro = products[0]
        let maisBarato = products[0]

        products.forEach((product) =>{
            soma += product.preco
            if(product.preco > maisCaro.preco) {maisCaro = product}
            if(product.preco < maisBarato.preco) {maisBarato = product}
        })

        const media = soma/products.length

        products.forEach((product) => {
            let style = ''

            if (product.id === maisCaro.id) {
                style = 'style="background-color: #ffcccc;"'; // vermelho
            } else if (product.id === maisBarato.id) {
                style = 'style="background-color: #ccffcc;"'; // verde
            } else if (product.preco > media) {
                style = 'style="background-color: #ffffcc;"'; // amarelo
            }

            tableRows += 
                `<tr ${style}>
                    <td>${product.id}</td>
                    <td>${product.nome}</td>
                    <td>${product.tipo}</td>
                    <td>${product.preco}</td>
                </tr>`

        })

        tableRows +=
            `<tr>
                <td colspan="4">
                    <strong>Média:</strong> R$ ${media.toFixed(2).replace('.', ',')} |
                    <strong>Mais caro:</strong> ${maisCaro.nome} (R$ ${maisCaro.preco.toFixed(2).replace('.', ',')}) |
                    <strong>Mais barato:</strong> ${maisBarato.nome} (R$ ${maisBarato.preco.toFixed(2).replace('.', ',')})
                </td>
            </tr>`;
        tbody.innerHTML = tableRows
    }catch(error){
        tbody.innerHTML = 
            `<tr>
                <td colspan="4" >${error.MSG}</td>
            </tr>`
    }
}