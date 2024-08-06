const ProductCard = ({ image, name, oldPrice, newPrice, rating }: any) => (
  <div className="border p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
    <div className="overflow-hidden rounded mb-4">
      <img
        src={`https://plantsbd.com/public/uploads/product/1716998133-amrapali-indian-500x539.jpg`}
        alt={name}
        className="h-40 w-full object-cover"
      />
    </div>
    <h3 className="text-lg font-bold mb-2">{name}</h3>
    <div className="flex items-center mb-2">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={index < rating ? "text-yellow-500" : "text-gray-300"}
        >
          ★
        </span>
      ))}
      <span className="ml-2">({rating}.0)</span>
    </div>
    <div className="text-lg mb-2">
      <span className="line-through text-gray-500 mr-2">{oldPrice}</span>
      <span className="text-green-500">{newPrice}</span>
    </div>
    <button className="bg-green-500 text-white py-2 px-4 rounded w-full">
      ORDER NOW
    </button>
  </div>
);

const ProductGrid = () => {
  const products = [
    {
      image: "path/to/image1.jpg", // replace with actual image paths
      name: "ভিয়েতনাম নারিকেল চারা",
      oldPrice: "৳3000",
      newPrice: "৳2200",
      rating: 5,
    },
    {
      image: "path/to/image2.jpg",
      name: "Apple Mango Tree Plant",
      oldPrice: "৳600",
      newPrice: "৳400",
      rating: 5,
    },
    {
      image: "path/to/image3.jpg",
      name: "Amrapali Mango Plant",
      oldPrice: "৳300",
      newPrice: "৳150",
      rating: 5,
    },
    {
      image: "path/to/image4.jpg",
      name: "Miracle Berry Fruit",
      oldPrice: "৳1900",
      newPrice: "৳1020",
      rating: 5,
    },
    {
      image: "path/to/image5.jpg",
      name: "Tinophol Or Mishori Dumur",
      oldPrice: "৳300",
      newPrice: "৳0",
      rating: 0,
    },
    {
      image: "path/to/image5.jpg",
      name: "Tinophol Or Mishori Dumur",
      oldPrice: "৳300",
      newPrice: "৳0",
      rating: 0,
    },
    {
      image: "path/to/image5.jpg",
      name: "Tinophol Or Mishori Dumur",
      oldPrice: "৳300",
      newPrice: "৳0",
      rating: 0,
    },
    {
      image: "path/to/image5.jpg",
      name: "Tinophol Or Mishori Dumur",
      oldPrice: "৳300",
      newPrice: "৳0",
      rating: 0,
    },
    {
      image: "path/to/image5.jpg",
      name: "Tinophol Or Mishori Dumur",
      oldPrice: "৳300",
      newPrice: "৳0",
      rating: 0,
    },
    {
      image: "path/to/image5.jpg",
      name: "Tinophol Or Mishori Dumur",
      oldPrice: "৳300",
      newPrice: "৳0",
      rating: 0,
    },
    {
      image: "path/to/image5.jpg",
      name: "Tinophol Or Mishori Dumur",
      oldPrice: "৳300",
      newPrice: "৳0",
      rating: 0,
    },
    {
      image: "path/to/image5.jpg",
      name: "Tinophol Or Mishori Dumur",
      oldPrice: "৳300",
      newPrice: "৳0",
      rating: 0,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mx-3 bg-blue-800 mt-3">
        <div className="bg-green-400 p-2 pr-10 ml-3 rounded-tr-full">
          <h1 className="text-2xl text-gray-100 font-bold">All Plants</h1>
        </div>
        <div className="text-gray-100 flex items-center mr-3">
          <h1 className="text-xl lg:text-2xl">Available now:</h1>
          <div className="text-2xl bg-green-400 p-1 rounded-md ml-1">12</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
