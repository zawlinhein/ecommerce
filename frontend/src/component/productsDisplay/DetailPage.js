import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, allProducts, cartItems } from "../slice/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import CommentSection from "./CommentSection"; // Import CommentSection

const DetailPage = () => {
  const { productId } = useParams();
  const products = useSelector(allProducts);
  const itemsInCart = useSelector(cartItems);
  const selectedProduct = products.find((item) => item._id === productId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetailItem = {
    images: [
      {
        original: selectedProduct.images[0],
      },
    ],
    title: selectedProduct.title,
    availability: !!selectedProduct.stock,
    brand: selectedProduct.brand,
    category: selectedProduct.category,
    sku: selectedProduct.sku,
    price: selectedProduct.price,
    description: selectedProduct.description,
  };

  const addToCartAction = (e) => {
    const productInCart = itemsInCart.find(
      (item) => item._id === selectedProduct._id
    );
    if (!productInCart) {
      dispatch(addToCart(selectedProduct));
      navigate("/");
    } else {
      alert("Product is already in the cart");
      navigate("/");
    }
  };

  return (
    <section className="container mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
      {/* Image gallery */}
      <div className="px-4">
        <ReactImageGallery
          showThumbnails={false}
          showBullets={false}
          showFullscreenButton={false}
          showPlayButton={false}
          items={productDetailItem.images}
        />
      </div>
      {/* Description */}
      <div className="px-5 lg:px-5">
        <h2 className="pt-3 text-2xl font-bold lg:pt-0">
          {productDetailItem.title}
        </h2>
        <div className="mt-1">
          <div className="flex items-center">
            <Rater
              style={{ fontSize: "20px" }}
              total={5}
              interactive={false}
              rating={selectedProduct.rating}
            />
            <p className="ml-3 text-sm text-gray-400">
              ({selectedProduct.rating})
            </p>
          </div>
        </div>
        <p className="mt-5 font-bold">
          Availability:{" "}
          {productDetailItem.availability ? (
            <span className="text-green-600">
              In Stock ({selectedProduct.stock})
            </span>
          ) : (
            <span className="text-red-600">Expired</span>
          )}
        </p>
        <p className="font-bold">
          Brand: <span className="font-normal">{productDetailItem.brand}</span>
        </p>
        <p className="font-bold">
          Category:{" "}
          <span className="font-normal">{productDetailItem.category}</span>
        </p>
        <p className="font-bold">
          SKU: <span className="font-normal">{productDetailItem.sku}</span>
        </p>
        <p className="mt-4 text-4xl font-bold text-violet-900">
          ${productDetailItem.price}{" "}
          <span className="text-xs text-gray-400 line-through">
            ${productDetailItem.previousPrice}
          </span>
        </p>
        <p className="pt-5 text-sm leading-5 text-gray-500">
          {productDetailItem.description}
        </p>

        <div className="mt-7 flex flex-row items-center gap-6">
          <button
            className="flex h-12 w-1/3 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800"
            onClick={addToCartAction}
          >
            <BiShoppingBag className="mx-2" />
            Add to cart
          </button>
          <button className="flex h-12 w-1/3 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300">
            <AiOutlineHeart className="mx-2" />
            Wishlist
          </button>
        </div>
      </div>

      {/* Comment Section */}
      <div className="col-span-2">
        <CommentSection />
      </div>
    </section>
  );
};

export default DetailPage;
