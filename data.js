// id: the unique ID for each product - number
// name: the name of the product - string
// size: S or M or L - string

// ***IMPORTANT
// category: ["women", "men", "unisex", "kids", "s-a", "clothes", "products"]
// array of string: to choose and combine category

// ***IMPORTANT
// is_deal: having deal or not - boolean
// If is_deal = false, we will not show the sale price. If is_deal = true, we will show the sale price and the original price.

// original_price: the price before discount - number
// sale_price: the price after discount - number
// description: the details of the product - string
// image: the path of the image - string

const productList = [
  {
    id: 1,
    name: "Elegant Evening Dress",
    size: "M",
    category: ["women", "clothes", "products"],
    is_deal: true,
    original_price: 30.99,
    sale_price: 15.99,
    description: "Beautiful cream-colored dress with a thin layer of tulle on top.",
    image: "images/womens/1.png",
  },
  {
    id: 2,
    name: "Men's Classic Blue Jeans",
    size: "L",
    category: ["men", "clothes", "products"],
    is_deal: true,
    original_price: 39.99,
    sale_price: 29.99,
    description: "A classic pair of blue jeans for men.",
    image: "images/mens/men_jean.png",
  },
  {
    id: 3,
    name: "Running Shoes",
    size: "L",
    category: ["s-a", "unisex", "products"],
    is_deal: true,
    original_price: 49.99,
    sale_price: 39.99,
    description: "High-performance ruuning shoes for all athletes.",
    image: "images/shoe.jpg",
  },
  {
    id: 4,
    name: "Tulle Maxi Skirt",
    size: "S",
    category: ["women", "clothes", "products"],
    is_deal: true,
    original_price: 14.99,
    sale_price: 9.99,
    description: "A maxi-length skirt with an effortless silhouette.",
    image: "images/womens/2.png",
  },
  {
    id: 5,
    name: "Unisex's Sunglasses",
    size: "M",
    category: ["s-a", "unisex", "products"],
    is_deal: false,
    original_price: 14.99,
    sale_price: 9.99,
    description: "Stylish sunglasses for unisex with UV protection.",
    image: "images/sunglass.png",
  },
  {
    id: 6,
    name: "Kid's Button Up Shirt",
    size: "M",
    category: ["kids", "clothes", "products"],
    is_deal: false,
    original_price: 9.99,
    sale_price: 7.99,
    description: "Kid's Blue Button Up Shirt.",
    image: "images/kid_shirt.png",
  },
  {
    id: 7,
    name: "Sport Shoes",
    size: "S",
    category: ["s-a", "unisex", "products"],
    is_deal: true,
    original_price: 39.99,
    sale_price: 19.99,
    description: "High-performance sport shoes for all.",
    image: "images/shoe_2.jpg",
  },
  {
    id: 8,
    name: "Unisex Relax Tshirt",
    size: "M",
    category: ["unisex", "clothes", "products"],
    is_deal: true,
    original_price: 19.99,
    sale_price: 9.99,
    description: "Good quality for all season.",
    image: "images/Tshirt.jpg",
  },
  {
    id: 9,
    name: "Rib Knit Bell Sleeve Crop Top",
    size: "S",
    category: ["women", "clothes", "products"],
    is_deal: true,
    original_price: 15.99,
    sale_price: 10.99,
    description: "Cute and classy top.",
    image: "images/womens/3.png",
  },
  {
    id: 10,
    name: "Curved Hem Drawstring Hoodie",
    size: "M",
    category: ["women", "clothes", "products"],
    is_deal: true,
    original_price: 30.99,
    sale_price: 15.99,
    description: "Grey cotton hoodie.",
    image: "images/womens/4.png",
  },
  {
    id: 11,
    name: "Daisy Bubble Dress",
    size: "S",
    category: ["women", "clothes", "products"],
    is_deal: true,
    original_price: 35.99,
    sale_price: 16.99,
    description: "Cute and comfy summer dress.",
    image: "images/womens/5.jpg",
  },
  {
    id: 12,
    name: "A-Line Midi Dress",
    size: "M",
    category: ["women", "clothes", "products"],
    is_deal: true,
    original_price: 32.99,
    sale_price: 14.99,
    description: "Beautiful, light green summer dress.",
    image: "images/womens/6.png",
  },
];

export default productList;
