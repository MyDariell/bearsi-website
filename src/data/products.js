/**
 * Product data repository
 * Central source of truth for all product information
 *
 * Images are automatically loaded from product folders using Vite's glob import
 */

// Dynamically import all product images using Vite's glob import
const vdayBlindBoxImages = import.meta.glob('../assets/images/products/vday_collection/vday_blindbox/*.png', { eager: true })
const vdayBlindBoxCouplesImages = import.meta.glob('../assets/images/products/vday_collection/vday_blindbox_couples/*.png', { eager: true })

/**
 * Helper function to convert glob imports to array of image URLs
 * @param {Object} globImports - Object from import.meta.glob
 * @returns {Array} Array of image URLs
 */
const getImagesFromGlob = (globImports) => {
  return Object.values(globImports).map(module => module.default)
}

// Convert glob imports to image arrays
const vdayBlindBoxImageArray = getImagesFromGlob(vdayBlindBoxImages)
const vdayBlindBoxCouplesImageArray = getImagesFromGlob(vdayBlindBoxCouplesImages)

export const PRODUCTS = [
  {
    id: 1,
    slug: 'vday-blind-box',
    name: "Valentine's Day Blind Box",
    price: 20.00,
    priceFormatted: 'CA $ 20.00',
    stock: 'in_stock',
    stockMessage: 'Currently In Stock',
    description: 'Get any of the following bears:',
    bears: ['Bingsu', 'Pip', 'Powda', 'Sunset'],
    images: vdayBlindBoxImageArray,
    thumbnail: vdayBlindBoxImageArray[0]  // First image as thumbnail
  },
  {
    id: 2,
    slug: 'vday-blind-box-couples',
    name: "Valentine's Day Blind Box Couple Package",
    price: 35.00,
    priceFormatted: 'CA $ 35.00',
    stock: 'in_stock',
    stockMessage: 'Currently In Stock',
    description: 'Get any of the following bears:',
    bears: ['Bingsu', 'Pip', 'Powda', 'Sunset'],
    images: vdayBlindBoxCouplesImageArray,
    thumbnail: vdayBlindBoxCouplesImageArray[0]  // First image as thumbnail
  }
]

/**
 * Get product by slug
 * @param {string} slug - Product slug identifier
 * @returns {Object|null} Product object or null if not found
 */
export const getProductBySlug = (slug) => {
  return PRODUCTS.find(product => product.slug === slug) || null
}

/**
 * Get product by ID
 * @param {number} id - Product ID
 * @returns {Object|null} Product object or null if not found
 */
export const getProductById = (id) => {
  return PRODUCTS.find(product => product.id === id) || null
}

/**
 * Get all available products
 * @returns {Array} Array of all products
 */
export const getAllProducts = () => {
  return PRODUCTS.filter(product => product.stock === 'in_stock')
}
