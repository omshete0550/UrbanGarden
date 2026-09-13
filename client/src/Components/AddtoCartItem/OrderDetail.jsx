import { useState } from "react";
import "./OrderDetail.css";
import { useSelector } from "react-redux";
import { MapPin, Phone, ShieldCheck, Truck, User } from "lucide-react";

const OrderDetail = ({ createOrder, onClose, total }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const products = Array.isArray(cart.products) ? cart.products : [];

  const [customer, setCustomer] = useState(user?.details?.username || "");
  const [phone, setPhone] = useState(user?.details?.phone || "");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const success = await createOrder({
      customerName: customer || user?.details?.username,
      customerId: user?.details?._id,
      products: products.map((item) => ({
        productId: item._id,
        nurseryId: item.nurseryId,
        quantity: item.quantity,
      })),
      address,
      phone,
      amount: total,
      method: 0,
    });

    if (!success) setIsSubmitting(false);
  };

  return (
    <section className="checkout-delivery" aria-labelledby="delivery-title">
      <header className="checkout-delivery__header">
          <div className="checkout-dialog__heading">
            <span className="checkout-delivery__icon" aria-hidden="true">
              <Truck size={21} />
            </span>
            <div>
              <p className="checkout-delivery__eyebrow">Cash on delivery</p>
              <h2 id="delivery-title">Delivery details</h2>
              <p>
                Add your details so your garden order reaches you safely.
              </p>
            </div>
          </div>

      </header>

      <form className="checkout-delivery__form" onSubmit={handleSubmit}>
          <div className="checkout-delivery__amount">
            <span>Amount payable</span>
            <strong>{"\u20B9"}{Number(total || 0).toLocaleString("en-IN")}</strong>
          </div>

          <div className="checkout-delivery__fields">
            <label className="checkout-field">
              <span>Full name</span>
              <div className="checkout-field__control">
                <User size={18} aria-hidden="true" />
                <input
                  value={customer}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  onChange={(event) => setCustomer(event.target.value)}
                  required
                />
              </div>
            </label>

            <label className="checkout-field">
              <span>Mobile number</span>
              <div className="checkout-field__control">
                <Phone size={18} aria-hidden="true" />
                <input
                  type="tel"
                  value={phone}
                  placeholder="10-digit mobile number"
                  autoComplete="tel"
                  inputMode="numeric"
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
              </div>
            </label>

            <label className="checkout-field">
              <span>Delivery address</span>
              <div className="checkout-field__control checkout-field__control--textarea">
                <MapPin size={18} aria-hidden="true" />
                <textarea
                  value={address}
                  placeholder="House / flat number, street, area, city and PIN code"
                  rows={3}
                  autoComplete="street-address"
                  onChange={(event) => setAddress(event.target.value)}
                  required
                />
              </div>
            </label>
          </div>

          <p className="checkout-delivery__security-note">
            <ShieldCheck size={17} aria-hidden="true" />
            Your contact details are used only to process this order.
          </p>

          <footer className="checkout-delivery__actions">
            <button
              type="button"
              className="checkout-delivery__button checkout-delivery__button--secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="checkout-delivery__button checkout-delivery__button--primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Placing order\u2026" : "Place order"}
            </button>
          </footer>
      </form>
    </section>
  );
};

export default OrderDetail;

