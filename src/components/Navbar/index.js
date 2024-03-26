"use client";

import { GlobalContext } from "@/context";
import { adminNavOption, navOptions } from "@/utils";
import { Fragment, useContext, useEffect, useState } from "react";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal";
import Image from "next/image";

function NavItems({ isModalView = false, isAdminView, router }) {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col md:p-0 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          isModalView ? "border-none" : "border border-grey-100"
        }`}
      >
        {isAdminView
          ? adminNavOption.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 "
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 "
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

function AdminAndClient({
  isModalView = false,
  isAdminView,
  router,
  user,
  isAuthUser,
  cartItemCount,
  setShowCartModal,
}) {
  return (
    <>
      <div
        className={`flex w-full md:flex md:w-auto ${
          isModalView ? "items-start flex-col" : "hidden items-center gap-3"
        }`}
      >
        {!isAdminView && isAuthUser ? (
          <Fragment>
            <div
              className={"tooltip-container"}
              onClick={() => router.push("/account")}
            >
              <Image src="/account.svg" width={45} height={35} />
              <span
                className={
                  "text-xs font-medium uppercase tracking-wide text-black"
                }
              >
                Account
              </span>
            </div>
            <div
              className={"tooltip-container"}
              onClick={() => setShowCartModal(true)}
            >
              <Image src="/shopping-cart.svg" width={45} height={35} />
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
              <span
                className={
                  "text-xs font-medium uppercase tracking-wide text-black"
                }
              >
                Cart
              </span>
            </div>
          </Fragment>
        ) : null}
        {user?.role === "admin" ? (
          isAdminView ? (
            <div
              className={"tooltip-container"}
              onClick={() => router.push("/")}
            >
              <Image src="/client.svg" width={45} height={35} />
              <span
                className={
                  "text-xs font-medium uppercase tracking-wide text-black"
                }
              >
                Client View
              </span>
            </div>
          ) : (
            <div
              className={"tooltip-container"}
              onClick={() => router.push("/admin-view")}
            >
              <Image src="/admin.svg" width={45} height={35} />
              <span
                className={
                  "text-xs font-medium uppercase tracking-wide text-black"
                }
              >
                Admin View
              </span>
            </div>
          )
        ) : null}
      </div>
    </>
  );
}

export default function Navbar() {
  const [cartItemCount, setCartItemCount] = useState(null);

  const {
    showNavModal,
    setShowNavModal,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
    user,
    setUser,
    isAuthUser,
    setIsAuthUser,
  } = useContext(GlobalContext);
  const router = useRouter();
  const pathName = usePathname();
  const isAdminView = pathName.includes("admin-view");

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems && Array.isArray(storedCartItems)) {
      setCartItemCount(storedCartItems?.length);
    }
  }, []);

  useEffect(() => {
    if (
      pathName !== "/admin-view/add-product" &&
      currentUpdatedProduct !== null
    ) {
      setCurrentUpdatedProduct(null);
    }
  }, [pathName]);

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div
            onClick={() => router.push("/")}
            className="flex items-center cursor-pointer"
          >
            <Image
              src="/ecom-logo.svg"
              width={35}
              height={35}
              class="w-8 h-8 md:w-10 md:h-10"
            />
            {/* <Image src="/logo.svg" width={35} height={35} /> */}
            <span className="text-lg sm:text-xl md:text-2xl font-semibold whitespace-nowrap ml-0 md:ml-1">
              E
            </span>
            <span className="text-lg sm:text-xl md:text-2xl font-semibold whitespace-nowrap uppercase text-slate-400">
              Commerce
            </span>
          </div>
          <div className="flex md:order-2">
            <AdminAndClient
              isAdminView={isAdminView}
              router={router}
              user={user}
              isAuthUser={isAuthUser}
              cartItemCount={cartItemCount}
              setShowCartModal={setShowCartModal}
            />
            {isAuthUser ? (
              <div className="tooltip-container" onClick={handleLogout}>
                <Image src="/logout.svg" width={45} height={35} />
                <span
                  className={
                    "text-xs font-medium uppercase tracking-wide text-black"
                  }
                >
                  Logout
                </span>
              </div>
            ) : (
              <div
                className="tooltip-container"
                onClick={() => router.push("/login")}
              >
                <Image src="/login.svg" width={45} height={35} />
                <span
                  className={
                    "text-xs font-medium uppercase tracking-wide text-black"
                  }
                >
                  Login
                </span>
              </div>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(!showNavModal)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems isAdminView={isAdminView} router={router} />
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={
          <>
            <NavItems
              isModalView={true}
              isAdminView={isAdminView}
              router={router}
            />
            <AdminAndClient
              isModalView={true}
              isAdminView={isAdminView}
              router={router}
              user={user}
              isAuthUser={isAuthUser}
              cartItemCount={cartItemCount}
              setShowCartModal={setShowCartModal}
            />
          </>
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal setCartItemCount={setCartItemCount} />}
    </>
  );
}
