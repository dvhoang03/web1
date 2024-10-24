import React, { useContext, useState } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
    const [sortedProducts, setSortedProducts] = useState(all_product);
    const [sortBy, setSortBy] = useState("default"); // Initial sort order

    const handleSortChange = (event) => {
        const selectedSort = event.target.value;
        let newProducts = [...all_product]; // Create a copy to avoid mutation

        if (selectedSort === "price-low-to-high") {
            newProducts.sort((a, b) => a.new_price - b.new_price);
        } else if (selectedSort === "price-high-to-low") {
            newProducts.sort((a, b) => b.new_price - a.new_price);
        } else { // Default sorting (no change)
            newProducts = newProducts;
        }

        setSortedProducts(newProducts);
        setSortBy(selectedSort);
    };

    return (
        <div className="shop-category">
            <img className="shopcategory-banner" src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="shopcategory-sort">
                    Sort by
                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="default">Default</option>
                        <option value="price-low-to-high">Price: Low to High</option>
                        <option value="price-high-to-low">Price: High to Low</option>
                    </select>
                </div>
            </div>
            <div className="shopcategory-products">
                {sortedProducts.map((item, i) => {
                    if (props.category === item.category) {
                        return (
                            <Item
                                key={i}
                                id={item.id}
                                name={item.name}
                                image={item.image}
                                new_price={item.new_price}
                                old_price={item.old_price}
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    );
};

export default ShopCategory;