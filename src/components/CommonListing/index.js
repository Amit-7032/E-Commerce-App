"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductButton from "./ProductButtons";
import ProductTile from "./ProductTile";
import Notification from "../Notification";

export default function CommonListing({ data }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page");
    if (pageParam) {
      setCurrentPage(Number(pageParam));
    }
  }, [router.asPath]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    router.push(`?page=${newPage}`, undefined, {
      shallow: true,
      state: { page: newPage },
    });
  };
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-8">
          {data
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item) => (
              <article
                key={item.id}
                className="relative flex flex-col overflow-hidden border cursor-pointer transition duration-300 transform hover:scale-105"
              >
                <ProductTile item={item} />
                <ProductButton item={item} />
              </article>
            ))}
        </div>
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center space-x-3 w-full bg-white fixed bottom-0 p-3">
          <button
            disabled={currentPage > 1 ? false : true}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={`pagination-button pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
          >
            {/* {"<"} */}
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage < totalPages ? false : true}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className={`pagination-button pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
          >
            Next
            {/* {">"} */}
          </button>
        </div>
      )}
      <Notification />
    </section>
  );
}
