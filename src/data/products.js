// Import product images
import vdayBlindBoxImage from '../assets/images/products/vday_collection/vday_blindbox/vday_blindbox.png'
import vdayBlindBoxCollection from '../assets/images/products/vday_collection/vday_blindbox/bearsi_collection.png'
import vdayBlindBoxCouplesImage from '../assets/images/products/vday_collection/vday_blindbox_couples/vday_blindbox_couples.png'
import vdayBlindBoxCouplesCollection from '../assets/images/products/vday_collection/vday_blindbox_couples/bearsi_collection.png'

/**
 * Product data repository
 * Central source of truth for all product information
 */

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
    images: [vdayBlindBoxImage, vdayBlindBoxCollection],
    thumbnail: vdayBlindBoxImage
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
    images: [vdayBlindBoxCouplesImage, vdayBlindBoxCouplesCollection],
    thumbnail: vdayBlindBoxCouplesImage
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
