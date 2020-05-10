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
	return product.length ? product[0] : false;
}

const getPromotion = categoryCount => promotions[categoryCount - 1];

const getProductList = (ids, productsList) => 
	productsList.filter((product) => ids.includes(product.id));


const getCategoryList = (productList) => 
	[...(new Set(productList.map((product) => product.category)))];

const getProductPrice = (product, promotionName) => {
	let productPromotion = product.promotions.filter((promotion) => promotion.looks.includes(promotionName));
	return productPromotion.length == 1 ? productPromotion[0].price : getProductRegularPrice(product);	
}

const getProductRegularPrice = (product) => product.regularPrice;

const getProductListSummary = (productList) => 
	productList.map((product) => {
		return {
			name: product.name,
			category: product.category
		}
	})
	
const getShoppingCart = (ids, productsList) => {

	const productList = getProductList(ids, productsList);
	const categoryList = getCategoryList(productList);
	const promotion = getPromotion(categoryList.length);
	let totalPrice = 0;
	let totalPriceWithoutDiscount = 0;
	
	productList.forEach((product) => {
		const price = getProductPrice(product, promotion);
		const regularPrice = getProductRegularPrice(product);
		totalPriceWithoutDiscount += regularPrice;
		totalPrice += price;
	})
	
	const discountValue = totalPriceWithoutDiscount - totalPrice;
	const discount = (discountValue*100)/totalPriceWithoutDiscount;
	
	const cart = {
		products: getProductListSummary(productList),
		promotion,
		totalPrice: totalPrice.toFixed(2),
		discountValue: discountValue.toFixed(2),
		discount: `${discount.toFixed(2)}%`
	}

	return cart;
}

module.exports = {
	getShoppingCart
} 
