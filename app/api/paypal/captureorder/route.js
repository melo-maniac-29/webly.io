import { createPayPalClient } from '@/lib/utils';
import paypal from '@paypal/checkout-server-sdk';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.orderID) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid order ID' },
        { status: 400 }
      );
    }

    const PayPalClient = createPayPalClient();
    const request = new paypal.orders.OrdersCaptureRequest(body.orderID);
    request.requestBody({});

    const response = await PayPalClient.execute(request);

    if (!response || response.statusCode !== 201) {
      console.error('❌ PayPal Capture Error:', response);
      return NextResponse.json(
        { success: false, message: 'Error capturing PayPal order' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: response.result,
    });
  } catch (error) {
    console.error('❌ Error in captureorder:', error.message);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}