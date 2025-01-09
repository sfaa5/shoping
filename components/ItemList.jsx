"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSharedState } from "@/context/ItemProvider";

const ItemList = ({sortType}) => {
  const { items, setItems } = useSharedState();
  const [loading, setLoading] = useState(true);
console.log(sortType)
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/shop/items?sort=${sortType}`
        );
        setItems(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, [sortType]);

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/shop/delete/${itemId}`);
      // Remove the deleted item from the state
      setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );

  return (
    <div className=" mx-auto mt-8 ">
      {!items.length ? (
        <p className="text-center text-gray-600 text-lg">No items available</p>
      ) : (
        <div className="card grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-auto">
          {items.map((item) => (
            <div
              key={item._id}
              className="relative bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200 group"
            >
              {/* Delete button - hidden by default and shows on hover */}
              <button
                onClick={() => deleteItem(item._id)}
                className="absolute top-0 right-2 text-red-500 text-2xl group-hover:opacity-100 opacity-0 hover:text-red-700 transition-opacity"
              >
                ×
              </button>

              <div className="flex w-full justify-between">
                <div className="flex items-start gap-3">
                  <h3 className="text-[#3F51B5] font-sans text-[16px] mb-2 ">
                    {item.name}
                  </h3>
                  <p
                    className={`text-[11px] font-medium p-1 rounded-sm text-white ${
                      item.priority === "high"
                        ? "bg-red-500"
                        : item.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {item.priority}
                  </p>
                </div>

                <p className="text-sm">Category: {item.category}</p>
              </div>

              {/* Description with Ellipsis */}
              <p
                className="text-gray-600  sm:max-w-full md:max-w-[450px] lg:max-w-[500px] mx-auto   text-sm mb-2 overflow-hidden text-ellipsis whitespace-norway card"
                title={item.des} // Tooltip for full description
              >
                {item.des}
              </p>

              {/* Date Created */}
              <p className="text-gray-500 absolute right-3 bottom-3 text-sm mt-2 text-end">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;
