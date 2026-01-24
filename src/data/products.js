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
    description: `Product Description
In a time where blind boxes have become a global trend, we wanted to reimagine the experience in a more heartfelt way. While surprise collectibles continue to grow, we noticed something missing—a handmade blind box filled with meaning.

Each crochet bear comes as a surprise, allowing every recipient to experience a moment of joy, anticipation, and uniqueness. We believe that no one receives a bear by accident—each one is meant for its person. More than just a gift, it's a small blessing wrapped in surprise, designed to bring comfort, love, and a reminder that someone, somewhere, stitched this just for you.

Product Information
Collection Name : Bearsi Valentine's Collection
Designer : DGMD
Material : 100% Acrylic Yarn
Keychain : Metal
Eyes : Plastic
Safety Note : Not suitable for persons under 3 years.

Special Notes
Limited Edition. Each bear is handmade; due to the nature of hand-making and variations in lighting or display, products may have slight differences in color or size.`,
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
    description: `Product Description
In a time where blind boxes have become a global trend, we wanted to reimagine the experience in a more heartfelt way. While surprise collectibles continue to grow, we noticed something missing—a handmade blind box filled with meaning.

Each crochet bear comes as a surprise, allowing every recipient to experience a moment of joy, anticipation, and uniqueness. We believe that no one receives a bear by accident—each one is meant for its person. More than just a gift, it's a small blessing wrapped in surprise, designed to bring comfort, love, and a reminder that someone, somewhere, stitched this just for you.

Product Information
Collection Name : Bearsi Valentine's Collection
Designer : DGMD
Material : 100% Acrylic Yarn
Keychain : Metal
Eyes : Plastic
Safety Note : Not suitable for persons under 3 years.

Special Notes
Limited Edition. Each bear is handmade; due to the nature of hand-making and variations in lighting or display, products may have slight differences in color or size.`,
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
