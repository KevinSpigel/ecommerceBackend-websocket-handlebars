const fs = require('fs/promises');
const { existsSync } = require('fs');



class ProductManager {

    static lastProductId = 0;

    constructor(path) {
        this.path = path;
    }

    async loadProducts() {
        if (existsSync(this.path)) {
            const dataProducts = await fs.readFile(this.path, 'utf-8');
            const allProducts = JSON.parse(dataProducts);
            return allProducts;
        }
        else {
            return [];
        }
    }

    async saveProducts() {
        await fs.writeFile(this.path, JSON.stringify(allProducts, null, '\t'));
    }


    async addProduct(title, description, price, thumbnail, code, stock) {

        const data = await this.getProducts();

        if (!this.data.find(product => product.code === code) && (title && description && code && price && thumbnail && stock)) {
            ProductManager.lastProductId++;

            const newProduct = {
                id: ProductManager.lastProductId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };

            data.push(newProduct);

            await this.saveProducts();
        }
    }


    async getProducts() {
        if (existsSync(this.path)) {
            return await this.loadProducts();
        }
        else {
            console.error("Not found");
        }
    };

    async getProductById(id) {
        const productById = await this.getProducts().find((product) => product.id === id);
        if (productById) {
            return productById //no deberia parsear porque allProduct ya esta parseado.
        } else {
            console.error("Not found")
        }
    }


    async updateProduct(id, newProductProperties) {
        const products = await this.getProducts()
        const foundProduct = await this.getProductById(id)

        const productUpdated = { ...foundProduct, ...newProductProperties }

        const updatedList = products.map(elem => {
            if (elem.id === productUpdated.id) {
                return productUpdated
            } else {
                return elem
            }
        })

        const stringList = await fs.writeFile(this.path, JSON.stringify(updatedList, null, '\t')) //no pude reutilizar la funcion saveProduct().

        return stringList
    }


    async deleteProduct(id) {
        const products = await this.getProducts();
        const filteredById = products.filter((product) => product.id !== id);
        this.saveProducts(filteredById);
        return filteredById
    }


};

module.exports = ProductManager;
