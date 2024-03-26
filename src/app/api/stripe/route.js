import AuthUser from "@/middleware/AuthUser";
import { NextResponse } from "next/server";

const stripe =
  require("stripe")(process.env.STRIPE_SECRET_KEY) || ("stripe_secret_key");

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const isAuthUser = await AuthUser(req);

    if (isAuthUser) {
      const res = await req.json();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: res,
        mode: "payment",
        success_url: "https://e-commerce-app-by-amit-mishra.vercel.app/checkout" + "?status=success",
        cancel_url: "https://e-commerce-app-by-amit-mishra.vercel.app/checkout" + "?status=cancel",
      });

      return NextResponse.json({
        success: true,
        id: session.id,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authenticated",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
}
