function ProductCard({ products, color1, color2 }) {
    const { addToCart } = useCart();

    // State to track loading status for all products
    const [imageLoadedStates, setImageLoadedStates] = useState({});

    const handleImageLoad = (productId) => {
        setImageLoadedStates((prev) => ({ ...prev, [productId]: true }));
    };

    const handleImageError = (productId) => {
        console.error(`Failed to load image for product: ${productId}`);
        setImageLoadedStates((prev) => ({ ...prev, [productId]: true }));
    };

    return (
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-5">
            {products.map((product) => {
                if (product?.status && product?.stockStatus) {
                    const isImageLoaded = imageLoadedStates[product._id] || false;

                    return (
                        <div
                            key={product._id}
                            className="relative w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md"
                        >
                            <Link className="hover:opacity-75" to={`/product/${product._id}`}>
                                {!isImageLoaded && (
                                    <div
                                        className="h-48 flex items-center justify-center bg-gray-200"
                                        style={{ borderRadius: '0.375rem 0.375rem 0 0' }}
                                    >
                                        <span>Loading...</span>
                                    </div>
                                )}
                                <img
                                    className={`h-fit w-auto rounded-t-lg object-cover ${
                                        !isImageLoaded ? 'hidden' : ''
                                    }`}
                                    src={product.images.featuredImage}
                                    alt="product image"
                                    loading="lazy"
                                    onLoad={() => handleImageLoad(product._id)}
                                    onError={() => handleImageError(product._id)}
                                />
                            </Link>
                            {product?.salePrice < product?.originalPrice && (
                                <span
                                    className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 text-center text-sm"
                                    style={{ backgroundColor: color1, color: color2 }}
                                >
                                    Sale
                                </span>
                            )}
                            <div className="mt-4 px-3 lg:px-5 pb-5">
                                <Link to={`/product/${product._id}`}>
                                    <h5
                                        className="text-base lg:text-xl font-semibold tracking-tight truncate"
                                        style={{ color: color1 }}
                                    >
                                        {product.name}
                                    </h5>
                                </Link>
                                <div className="lg:flex items-center justify-between mt-3">
                                    <p className="mb-4 lg:mb-0">
                                        <span
                                            className="text-2xl font-bold"
                                            style={{ color: color1 }}
                                        >
                                            &#8377;{product.salePrice}
                                        </span>
                                        &nbsp;
                                        <span
                                            className="text-sm line-through"
                                            style={{ color: color1 }}
                                        >
                                            &#8377;{product.originalPrice}
                                        </span>
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => addToCart({ ...product, quantity: 1 })}
                                        className="flex items-center w-full lg:w-auto justify-center rounded-md px-5 py-3 text-center text-sm font-medium hover:opacity-75 focus:outline-none"
                                        style={{
                                            color: color2,
                                            backgroundColor: color1,
                                        }}
                                    >
                                        <img
                                            className="h-5 lg:block hidden"
                                            src="./cart.svg"
                                            alt=""
                                        />
                                        &nbsp;
                                        <span>Add to cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
}
