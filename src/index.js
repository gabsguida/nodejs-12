const {products} = require('./data/products.json');
const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];
/* 
1. Qual a quantidade de categorias presentes no carrinho? 
2. A promoção é definida pela quantidade de categorias 
	1 categoria = Single look
	2 categorias = double look
	3 categorias = triple look
	4 categorias = full look
3. Verificar a promoção no looks dos produtos que estão no carrinho
4. identificar o preço promocional
5. calcular o valor total dos produtos no carrinho (com descontos adicionados)
6. calcular o desconto total
7. calcular a porcentagem do desconto total
*/

const getProductInfo = (productId, productList) => {
	let product = productList.filter((product) => (product.id == productId));
	return product.length != 0 ? product[0] : false;
}

const getPromotion = (categoryCount) => {
	return promotions[categoryCount - 1];
}

const getShoppingCart = (ids, productsList) => {
	let productList = [];
	let categoryList = [];
	
	for(let i=0; i<ids.length; i++){
		let product = getProductInfo(ids[i], productsList);
		productList.push(product);
		if(!categoryList.includes(product.category)){
			categoryList.push(product.category);
		}
	}
	
	let promotion = getPromotion(categoryList.length);
	let totalPrice = 0;
	let totalPriceWithoutDiscount = 0;
	
	for(let x=0; x<productList.length; x++){
		let productPrice = null;
		for(let y=0; y<productList[x].promotions.length; y++){
			if(productList[x].promotions[y].looks.includes(promotion)){
				productPrice = productList[x].promotions[y].price;
			}
		}
		totalPriceWithoutDiscount += productList[x].regularPrice;
		totalPrice += (productPrice == null) ? productList[x].regularPrice : productPrice;
	}
	
	let discountValue = totalPriceWithoutDiscount - totalPrice;
	let discount = (discountValue*100)/totalPriceWithoutDiscount;

	let list = productList.map((product) => {
		return {
			name: product.name,
			category: product.category
		}
	})
	
	let cart = {
		products: list,
		promotion: promotion,
		totalPrice: totalPrice.toFixed(2),
		discountValue: discountValue.toFixed(2),
		discount: discount.toFixed(2) + '%'
	}
	
	return cart;
}

module.exports = {
	getShoppingCart
} 

