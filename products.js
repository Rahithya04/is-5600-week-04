const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')

module.exports = {
  list,
  get,
  updateProduct,
  deleteProduct,
}

/**
 * List all products
 * @returns {Promise<Array>}
 */
async function list(options = {}) {
    const { offset = 0, limit = 25, tag } = options;
    const data = await fs.readFile(productsFile)
  
    return JSON.parse(data)
    .filter(product => {
        if(!tag){
            return product
        }
        return product.tags.find((_tag) => _tag.title == tag)

    })
    .slice(offset, offset + limit) // Slice the products
  }

async function get (id) {
const products = JSON.parse(await fs.readFile(productsFile))

// Loop through the products and return the product with the matching id
for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
    return products[i]
    }
}

    // If no product is found, return null
return null;
}



/**
 * Simulate updating a product
 * @param {string} id
 * @param {Object} updatedData
 * @returns {Promise<void>}
 */
async function updateProduct(id, updatedData) {
    const products = JSON.parse(await fs.readFile(productsFile));
  
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error(`Product with ID ${id} not found.`);
    }
  
    products[index] = { ...products[index], ...updatedData }; // Update product data
  
    await fs.writeFile(productsFile, JSON.stringify(products, null, 2));
  }
  
  /**
   * Simulate deleting a product
   * @param {string} id
   * @returns {Promise<void>}
   */
  async function deleteProduct(id) {
    const products = JSON.parse(await fs.readFile(productsFile));
  
    const newProducts = products.filter(product => product.id !== id);
    if (newProducts.length === products.length) {
      throw new Error(`Product with ID ${id} not found.`);
    }
  
    await fs.writeFile(productsFile, JSON.stringify(newProducts, null, 2));
  }