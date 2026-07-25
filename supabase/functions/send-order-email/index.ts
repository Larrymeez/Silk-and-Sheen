import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const BUSINESS_EMAIL = "meezlarry@gmail.com";

const LOGO_URL =
  "https://hpzsfhdrrhtvhisxxajj.supabase.co/storage/v1/object/public/silk-sheen-assets/logo.jpg";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const formatPrice = (price: number) => {
  return Number(price || 0).toLocaleString("en-KE");
};

const escapeHtml = (value: unknown) => {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

Deno.serve(async (req) => {
  // Handle browser preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const order = await req.json();

    const {
      order_reference,
      customer_name,
      customer_email,
      customer_phone,
      delivery_location,
      notes,
      installation,
      installation_fee,
      subtotal,
      total,
      items,
    } = order;

    // Basic validation
    if (
      !order_reference ||
      !customer_name ||
      !customer_email ||
      !customer_phone ||
      !delivery_location ||
      !Array.isArray(items)
    ) {
      return new Response(
        JSON.stringify({
          error: "Missing required order information",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    /*
    ============================================================
    CUSTOMER ORDER ITEMS
    ============================================================
    */

    const customerItemsHtml = items
      .map(
        (item: any) => `
          <tr>
            <td style="
              padding: 16px 12px;
              border-bottom: 1px solid #eeeeee;
              color: #333333;
              font-size: 14px;
            ">
              <strong>${escapeHtml(item.name)}</strong>
            </td>

            <td style="
              padding: 16px 12px;
              border-bottom: 1px solid #eeeeee;
              color: #555555;
              font-size: 14px;
            ">
              ${escapeHtml(item.inches)}"
            </td>

            <td style="
              padding: 16px 12px;
              border-bottom: 1px solid #eeeeee;
              color: #555555;
              font-size: 14px;
            ">
              ${escapeHtml(item.quantity)}
            </td>
          </tr>
        `
      )
      .join("");

    /*
    ============================================================
    CUSTOMER EMAIL
    ============================================================
    */

    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Silk & Sheen Order Confirmation</title>
        </head>

        <body style="
          margin: 0;
          padding: 0;
          background-color: #f5f3ef;
          font-family: Arial, Helvetica, sans-serif;
          color: #222222;
        ">

          <div style="
            width: 100%;
            padding: 40px 15px;
            box-sizing: border-box;
          ">

            <div style="
              max-width: 650px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 14px;
              overflow: hidden;
              box-shadow: 0 4px 20px rgba(0,0,0,0.06);
            ">

              <!-- HEADER -->

              <div style="
                background-color: #111111;
                padding: 30px 25px;
                text-align: center;
              ">

                <img
                  src="${LOGO_URL}"
                  alt="Silk & Sheen"
                  style="
                    max-width: 150px;
                    height: auto;
                    display: block;
                    margin: 0 auto 18px auto;
                  "
                />

                <div style="
                  color: #d4af37;
                  font-size: 12px;
                  letter-spacing: 3px;
                  text-transform: uppercase;
                ">
                  Confidence in Every Strand
                </div>

              </div>

              <!-- CONTENT -->

              <div style="
                padding: 35px 30px;
              ">

                <p style="
                  margin: 0 0 8px 0;
                  color: #b08d24;
                  font-size: 13px;
                  letter-spacing: 2px;
                  text-transform: uppercase;
                  font-weight: bold;
                ">
                  Order Received
                </p>

                <h1 style="
                  margin: 0 0 20px 0;
                  font-size: 28px;
                  color: #222222;
                  font-weight: 600;
                ">
                  Thank You, ${escapeHtml(customer_name)}
                </h1>

                <p style="
                  color: #555555;
                  font-size: 15px;
                  line-height: 1.7;
                  margin-bottom: 25px;
                ">
                  Thank you for choosing Silk & Sheen. We have successfully
                  received your order and our team will review the details
                  shortly.
                </p>

                <!-- ORDER REFERENCE -->

                <div style="
                  background-color: #faf8f2;
                  border-left: 4px solid #c9a227;
                  padding: 18px 20px;
                  margin-bottom: 30px;
                ">

                  <div style="
                    font-size: 12px;
                    color: #777777;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 6px;
                  ">
                    Order Reference
                  </div>

                  <div style="
                    font-size: 20px;
                    font-weight: bold;
                    color: #222222;
                    letter-spacing: 1px;
                  ">
                    ${escapeHtml(order_reference)}
                  </div>

                </div>

                <!-- ORDER ITEMS -->

                <h2 style="
                  font-size: 18px;
                  margin: 0 0 15px 0;
                  color: #222222;
                ">
                  Your Order
                </h2>

                <table style="
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 25px;
                ">

                  <thead>

                    <tr style="
                      background-color: #f7f5f0;
                    ">

                      <th style="
                        text-align: left;
                        padding: 13px 12px;
                        font-size: 12px;
                        color: #777777;
                        text-transform: uppercase;
                      ">
                        Item
                      </th>

                      <th style="
                        text-align: left;
                        padding: 13px 12px;
                        font-size: 12px;
                        color: #777777;
                        text-transform: uppercase;
                      ">
                        Length
                      </th>

                      <th style="
                        text-align: left;
                        padding: 13px 12px;
                        font-size: 12px;
                        color: #777777;
                        text-transform: uppercase;
                      ">
                        Qty
                      </th>

                    </tr>

                  </thead>

                  <tbody>
                    ${customerItemsHtml}
                  </tbody>

                </table>

                <!-- ORDER SUMMARY -->

                <div style="
                  border-top: 1px solid #eeeeee;
                  padding-top: 20px;
                ">

                  <p style="
                    font-size: 14px;
                    color: #666666;
                  ">
                    <strong>Subtotal:</strong>
                    KES ${formatPrice(subtotal)}
                  </p>

                  <p style="
                    font-size: 14px;
                    color: #666666;
                  ">
                    <strong>Installation:</strong>
                    ${
                      installation
                        ? `KES ${formatPrice(installation_fee)}`
                        : "Not selected"
                    }
                  </p>

                  <div style="
                    border-top: 2px solid #222222;
                    padding-top: 16px;
                    margin-top: 15px;
                  ">

                    <strong style="
                      font-size: 20px;
                      color: #222222;
                    ">
                      Total:
                    </strong>

                    <strong style="
                      font-size: 22px;
                      color: #b08d24;
                      float: right;
                    ">
                      KES ${formatPrice(total)}
                    </strong>

                  </div>

                </div>

                <!-- DELIVERY DETAILS -->

                <div style="
                  margin-top: 35px;
                  padding-top: 25px;
                  border-top: 1px solid #eeeeee;
                ">

                  <h2 style="
                    font-size: 18px;
                    color: #222222;
                  ">
                    Delivery Details
                  </h2>

                  <p style="
                    font-size: 14px;
                    color: #555555;
                  ">
                    <strong>Phone:</strong>
                    ${escapeHtml(customer_phone)}
                  </p>

                  <p style="
                    font-size: 14px;
                    color: #555555;
                  ">
                    <strong>Location:</strong>
                    ${escapeHtml(delivery_location)}
                  </p>

                  ${
                    notes
                      ? `
                        <p style="
                          font-size: 14px;
                          color: #555555;
                          line-height: 1.6;
                        ">
                          <strong>Additional Notes:</strong><br />
                          ${escapeHtml(notes)}
                        </p>
                      `
                      : ""
                  }

                </div>

                <!-- NEXT STEPS -->

                <div style="
                  margin-top: 30px;
                  background-color: #faf8f2;
                  padding: 20px;
                  border-radius: 8px;
                ">

                  <h3 style="
                    margin: 0 0 10px 0;
                    color: #222222;
                    font-size: 16px;
                  ">
                    What Happens Next?
                  </h3>

                  <p style="
                    margin: 0;
                    color: #666666;
                    font-size: 14px;
                    line-height: 1.7;
                  ">
                    Our team will review your order and contact you shortly
                    regarding confirmation, payment, and delivery arrangements.
                  </p>

                </div>

                <p style="
                  margin-top: 30px;
                  color: #555555;
                  font-size: 14px;
                  line-height: 1.7;
                ">
                  If you have any questions about your order, simply reply to
                  this email and our team will be happy to assist you.
                </p>

              </div>

              <!-- FOOTER -->

              <div style="
                background-color: #111111;
                padding: 25px;
                text-align: center;
              ">

                <div style="
                  color: #d4af37;
                  font-size: 15px;
                  font-weight: bold;
                  margin-bottom: 8px;
                ">
                  SILK & SHEEN
                </div>

                <div style="
                  color: #999999;
                  font-size: 12px;
                ">
                  Confidence in every strand.
                </div>

              </div>

            </div>

          </div>

        </body>
      </html>
    `;

    /*
    ============================================================
    BUSINESS ORDER ITEMS
    ============================================================
    */

    const businessItemsHtml = items
      .map(
        (item: any) => `
          <tr>

            <td style="
              padding: 12px;
              border-bottom: 1px solid #eeeeee;
            ">
              ${escapeHtml(item.name)}
            </td>

            <td style="
              padding: 12px;
              border-bottom: 1px solid #eeeeee;
            ">
              ${escapeHtml(item.inches)}"
            </td>

            <td style="
              padding: 12px;
              border-bottom: 1px solid #eeeeee;
            ">
              ${escapeHtml(item.quantity)}
            </td>

            <td style="
              padding: 12px;
              border-bottom: 1px solid #eeeeee;
            ">
              KES ${formatPrice(
                Number(item.basePrice || 0) +
                  (Number(item.inches || 0) -
                    Number(item.startingLength || 0)) *
                    Number(item.pricePerExtraInch || 0)
              )}
            </td>

          </tr>
        `
      )
      .join("");

    /*
    ============================================================
    BUSINESS EMAIL
    ============================================================
    */

    const businessEmailHtml = `
      <!DOCTYPE html>
      <html>

        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>New Silk & Sheen Order</title>
        </head>

        <body style="
          margin: 0;
          padding: 0;
          background-color: #f5f3ef;
          font-family: Arial, Helvetica, sans-serif;
          color: #222222;
        ">

          <div style="
            max-width: 750px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
          ">

            <!-- HEADER -->

            <div style="
              background-color: #111111;
              padding: 25px;
              text-align: center;
            ">

              <img
                src="${LOGO_URL}"
                alt="Silk & Sheen"
                style="
                  max-width: 140px;
                  height: auto;
                "
              />

              <h1 style="
                color: #d4af37;
                font-size: 22px;
                margin: 15px 0 0 0;
              ">
                New Order Received
              </h1>

            </div>

            <!-- MAIN CONTENT -->

            <div style="
              padding: 30px;
            ">

              <div style="
                background-color: #faf8f2;
                border-left: 4px solid #c9a227;
                padding: 18px;
                margin-bottom: 25px;
              ">

                <strong>
                  Order Reference:
                </strong>

                <span style="
                  font-size: 18px;
                  margin-left: 8px;
                ">
                  ${escapeHtml(order_reference)}
                </span>

              </div>

              <!-- CUSTOMER INFORMATION -->

              <h2 style="
                font-size: 18px;
                border-bottom: 1px solid #eeeeee;
                padding-bottom: 10px;
              ">
                Customer Information
              </h2>

              <p>
                <strong>Name:</strong>
                ${escapeHtml(customer_name)}
              </p>

              <p>
                <strong>Email:</strong>
                <a href="mailto:${escapeHtml(customer_email)}">
                  ${escapeHtml(customer_email)}
                </a>
              </p>

              <p>
                <strong>Phone:</strong>
                ${escapeHtml(customer_phone)}
              </p>

              <p>
                <strong>Delivery Location:</strong>
                ${escapeHtml(delivery_location)}
              </p>

              <!-- ORDER -->

              <h2 style="
                font-size: 18px;
                border-bottom: 1px solid #eeeeee;
                padding-bottom: 10px;
                margin-top: 30px;
              ">
                Order Items
              </h2>

              <table style="
                width: 100%;
                border-collapse: collapse;
              ">

                <thead>

                  <tr style="
                    background-color: #f7f5f0;
                  ">

                    <th style="
                      text-align: left;
                      padding: 12px;
                    ">
                      Item
                    </th>

                    <th style="
                      text-align: left;
                      padding: 12px;
                    ">
                      Length
                    </th>

                    <th style="
                      text-align: left;
                      padding: 12px;
                    ">
                      Qty
                    </th>

                    <th style="
                      text-align: left;
                      padding: 12px;
                    ">
                      Price
                    </th>

                  </tr>

                </thead>

                <tbody>
                  ${businessItemsHtml}
                </tbody>

              </table>

              <!-- FINANCIAL SUMMARY -->

              <div style="
                margin-top: 25px;
                padding: 20px;
                background-color: #faf8f2;
              ">

                <p>
                  <strong>Subtotal:</strong>
                  KES ${formatPrice(subtotal)}
                </p>

                <p>
                  <strong>Installation:</strong>
                  ${
                    installation
                      ? `KES ${formatPrice(installation_fee)}`
                      : "Not selected"
                  }
                </p>

                <h2 style="
                  color: #b08d24;
                ">
                  Total: KES ${formatPrice(total)}
                </h2>

              </div>

              ${
                notes
                  ? `
                    <div style="
                      margin-top: 25px;
                      padding: 18px;
                      background-color: #fff9e8;
                      border-left: 4px solid #d4af37;
                    ">

                      <strong>
                        Customer Notes
                      </strong>

                      <p>
                        ${escapeHtml(notes)}
                      </p>

                    </div>
                  `
                  : ""
              }

            </div>

            <!-- FOOTER -->

            <div style="
              background-color: #111111;
              color: #999999;
              text-align: center;
              padding: 20px;
              font-size: 12px;
            ">

              Silk & Sheen Order Management

            </div>

          </div>

        </body>

      </html>
    `;

    /*
    ============================================================
    SEND CUSTOMER EMAIL
    ============================================================
    */

    const customerResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },

        body: JSON.stringify({
          from: "Silk & Sheen <onboarding@resend.dev>",
          to: [customer_email],
          subject: `Order Confirmation - ${order_reference}`,
          html: customerEmailHtml,
        }),
      }
    );

    const customerResult = await customerResponse.json();

    /*
    ============================================================
    SEND BUSINESS EMAIL
    ============================================================
    */

    const businessResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },

        body: JSON.stringify({
          from: "Silk & Sheen <onboarding@resend.dev>",
          to: [BUSINESS_EMAIL],
          subject: `New Order Received - ${order_reference}`,
          html: businessEmailHtml,
        }),
      }
    );

    const businessResult = await businessResponse.json();

    /*
    ============================================================
    CHECK RESULTS
    ============================================================
    */

    if (!customerResponse.ok || !businessResponse.ok) {
      console.error("Customer email result:", customerResult);
      console.error("Business email result:", businessResult);

      return new Response(
        JSON.stringify({
          success: false,
          customerEmailSent: customerResponse.ok,
          businessEmailSent: businessResponse.ok,
          customerEmailResult: customerResult,
          businessEmailResult: businessResult,
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Customer and business emails sent successfully",
        customerEmail: customerResult,
        businessEmail: businessResult,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("EMAIL FUNCTION ERROR:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});