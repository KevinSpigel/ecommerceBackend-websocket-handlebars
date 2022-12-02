
class ProductManager {

    static lastProductId = 0;

    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if (!this.products.find(product => product.code === code) && (title && description && code && price && thumbnail && stock)) {
            ProductManager.id++;

            const newProduct = {
                id: ProductManager.lastProductId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };

            this.products.push(newProduct);
        }
    }


    getProducts() {
        return this.products;
    };

    getProductById(productId) {
        const productById = this.products.find((product) => product.id === productById);
        if (productById) {
            console.log(productById)
        } else {
            console.error("Not found")
        }

    }

};

