import { createPayPalClient } from "@/lib/utils";
import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.order_price || !body.user_id) {
      return NextResponse.json(
        { success: false, message: "Please provide order_price and user_id" },
        { status: 400 }
      );
    }

    const PayPalClient = createPayPalClient();
    const request = new paypal.orders.OrdersCreateRequest();
    request.headers["prefer"] = "return=representation";
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: body.order_price.toString(),
          },
        },
      ],
    });

    const response = await PayPalClient.execute(request);

    if (!response || !response.result || response.statusCode !== 201) {
      console.error("❌ PayPal Response Error:", response);
      return NextResponse.json(
        { success: false, message: "Error Creating Order" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { order: { id: response.result.id } },
    });
  } catch (error) {
    console.error("❌ Error in createorder:", error.message);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}