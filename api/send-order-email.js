import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const {
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
      order_reference,
    } = req.body;

    const itemsHtml = items
      .map((item) => {
        const itemPrice =
          item.basePrice +
          (item.inches - item.startingLength) *
            item.pricePerExtraInch;

        const itemTotal =
          itemPrice * item.quantity;

        return `
          <tr>
            <td style="padding: 12px 0;">
              ${item.name}
              <br />
              <small>
                Length: ${item.inches}" × ${item.quantity}
              </small>
            </td>

            <td style="padding: 12px 0; text-align: right;">
              KES ${itemTotal.toLocaleString()}
            </td>
          </tr>
        `;
      })
      .join("");

    await resend.emails.send({
      from: "Silk & Sheen <onboarding@resend.dev>",
      to: customer_email,
      subject: `Order Confirmation - ${order_reference}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">

          <h1 style="color: #c9a227;">
            Thank you for your order!
          </h1>

          <p>
            Hi ${customer_name},
          </p>

          <p>
            We have received your Silk & Sheen order.
          </p>

          <h2>
            Order Reference: ${order_reference}
          </h2>

          <hr />

          <h3>Order Items</h3>

          <table style="width: 100%; border-collapse: collapse;">
            ${itemsHtml}
          </table>

          <hr />

          <p>
            <strong>Subtotal:</strong>
            KES ${subtotal.toLocaleString()}
          </p>

          <p>
            <strong>Installation:</strong>
            ${
              installation
                ? `KES ${installation_fee.toLocaleString()}`
                : "None"
            }
          </p>

          <h2>
            Total: KES ${total.toLocaleString()}
          </h2>

          <hr />

          <p>
            <strong>Delivery Location:</strong>
            ${delivery_location}
          </p>

          <p>
            We will review your order and contact you shortly.
          </p>

          <p>
            Thank you for choosing Silk & Sheen.
          </p>

        </div>
      `,
    });

    return res.status(200).json({
      success: true,
    });

  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return res.status(500).json({
      error: "Failed to send email",
    });
  }
}