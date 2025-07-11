
import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";

const ProductCard = ({ product, onClick, minimal = false, showActions = false }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    console.log(`${isFavorited ? 'Removed from' : 'Added to'} wishlist:`, product.name);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    console.log('Added to cart:', product.name);
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  const handleRentClick = (e) => {
    e.stopPropagation();
    console.log(`Navigate to rent page for:`, product.name);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    console.log(`Navigate to checkout for:`, product.name);
  };

  const handleProductClick = () => {
    console.log(`Navigate to /product/${product.id}`);
    onClick();
  };

  if (minimal) {
    return (
      <div
        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer group border border-transparent hover:border-gray-200"
        onClick={handleProductClick}
      >
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-semibold">Out</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-gray-900 truncate group-hover:text-black transition-colors">
            {product.name}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-bold text-gray-900">{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Action Buttons - Show on hover or when showActions is true */}
        <div className={`flex items-center gap-1 transition-all duration-300 ${showActions ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`}>
          <button
            onClick={handleFavoriteClick}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
            title="Add to Wishlist"
          >
            <Heart 
              size={16} 
              className={`transition-colors ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'}`} 
            />
          </button>
          
          {product.inStock && (
            <>
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="p-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                title="Add to Cart"
              >
                <ShoppingCart 
                  size={16} 
                  className={`transition-colors ${isAddingToCart ? 'text-green-500' : 'text-gray-400 hover:text-gray-600'}`} 
                />
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Full card layout for non-minimal view
  return (
    <div
      className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
      onClick={handleProductClick}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-all duration-300"
          title="Add to Wishlist"
        >
          <Heart 
            size={18} 
            className={`transition-colors ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'}`} 
          />
        </button>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-black transition-colors">
          {product.name}
        </h4>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="font-bold text-xl text-gray-900">{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="flex-1 bg-black text-white py-2 px-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Buy Now
            </button>
            
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAddingToCart}
              className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Add to Cart"
            >
              <ShoppingCart 
                size={18} 
                className={`transition-colors ${isAddingToCart ? 'text-green-500' : 'text-gray-600'}`} 
              />
            </button>
          </div>
          
          {product.rentPrice && (
            <button
              onClick={handleRentClick}
              disabled={!product.inStock}
              className="w-full py-2 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Rent for {product.rentPrice}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
