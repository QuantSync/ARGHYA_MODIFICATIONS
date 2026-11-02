import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      orderId,
      name,
      phone,
      email,
      houseFlat,
      locality,
      city,
      state,
      pincode,
      productName,
      productSlug,
      size,
      basePrice,
      deliveryCharge,
      totalAmount,
      createdAt,
    } = data;

    // Validate required fields
    if (!name || !phone || !houseFlat || !locality || !city || !state || !pincode) {
      return NextResponse.json(
        { success: false, error: 'Please provide all required delivery details' },
        { status: 400 }
      );
    }

    // Google Sheets Webhook URL (from environment variable)
    const googleSheetWebhookUrl =
      process.env.GOOGLE_SHEET_COD_URL ||
      process.env.NEXT_PUBLIC_GOOGLE_SHEET_COD_URL ||
      '';

    let forwardedToSheet = false;

    if (googleSheetWebhookUrl && googleSheetWebhookUrl.startsWith('http')) {
      try {
        const response = await fetch(googleSheetWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderId: orderId || `ARG-COD-${Date.now()}`,
            name,
            phone,
            email: email || 'N/A',
            houseFlat,
            locality,
            city,
            state,
            pincode,
            productName: productName || 'Blossom Floral Printed Kurti',
            productSlug: productSlug || '',
            size: size || 'Free Size',
            amount: data.amountText || (totalAmount ? `Rs ${basePrice || (totalAmount - 25)} + Rs ${deliveryCharge || 25} = Rs ${totalAmount}` : `Rs ${totalAmount || 444}`),
            basePrice: basePrice,
            deliveryCharge: deliveryCharge || 25,
            totalAmount: totalAmount,
            paymentMode: 'Cash On Delivery (Pay On Delivery)',
            createdAt: createdAt || new Date().toISOString(),
          }),
          redirect: 'follow',
        });

        if (response.ok) {
          forwardedToSheet = true;
        } else {
          console.warn('Google Sheet webhook responded with status:', response.status);
        }
      } catch (sheetError) {
        console.error('Error forwarding order to Google Sheet webhook:', sheetError);
        // Do not fail order placement if sheet webhook is temporarily unreachable
      }
    } else {
      console.log('COD Order received (Google Sheet URL not configured yet):', {
        orderId,
        productName,
        name,
        phone,
        city,
        pincode,
        totalAmount,
      });
    }

    return NextResponse.json({
      success: true,
      orderId: orderId || `ARG-COD-${Date.now()}`,
      forwardedToSheet,
      message: 'Order placed successfully',
    });
  } catch (error: any) {
    console.error('COD Order Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Server error processing order' },
      { status: 500 }
    );
  }
}
