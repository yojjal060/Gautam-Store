import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51RRaLTGX1mGTJWxQxGQNHpELJTXXYaf146FwtGHp5hUtQm836kiU050UfAzAQG2TCjbZp4oWuSzcdaqJLiA9ufI400ZmtTmq06"
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        // Create simple shipping options instead of using specific IDs
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: { amount: 0, currency: "npr" },
              display_name: "Free shipping",
              delivery_estimate: {
                minimum: { unit: "business_day", value: 5 },
                maximum: { unit: "business_day", value: 7 },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: { amount: 15000, currency: "npr" },
              display_name: "Next day air",
              delivery_estimate: {
                minimum: { unit: "business_day", value: 1 },
                maximum: { unit: "business_day", value: 1 },
              },
            },
          },
        ],
        line_items: req.body.map((item) => {
          let productImage = "/vercel.svg"; // Default image if none available

          // Use the urlFor function logic directly here to get a proper product image
          if (
            item.image &&
            item.image[0] &&
            item.image[0].asset &&
            item.image[0].asset._ref
          ) {
            // Simply using our placeholder for now since we don't have actual product images
            productImage =
              "https://lh3.googleusercontent.com/pw/ABLVV86NuGk88rlRGCkzTjXNhwrXBmf4u93WmO9jR85pPWrQvCnU9oL7a9Gu8tc6v22J-rufpb-bUt_u-Y-QiMmr6WMAM2-qrqPJZhAhUDkqGr4ZnQPB1A63LIeODXgfegpMDuP0v7jyjEYipdVJcI6-jCCk=w1079-h1079-s-no";
          }

          return {
            price_data: {
              currency: "npr", // Nepali Rupees
              product_data: {
                name: item.name,
                images: [productImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/successPay`,
        cancel_url: `${req.headers.origin}/cart`,
      };

      console.log("Creating checkout session...");
      const session = await stripe.checkout.sessions.create(params);
      console.log("Session created:", session.id);

      res.status(200).json(session);
    } catch (err) {
      console.error("Stripe error:", err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
