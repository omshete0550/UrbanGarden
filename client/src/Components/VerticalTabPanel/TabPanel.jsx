import { useEffect, useState } from "react";
import UserAddressBox from "../UserAddressBox/UserAddressBox";
import {
  MapPin,
  Package,
  User,
  Mail,
  Phone,
  CalendarDays,
  CreditCard,
  Store,
  Tags,
  Leaf,
  Plus,
  X,
  Pencil,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import "./TabPanel.css";
import { useDispatch } from "react-redux";
import { update } from "../../redux/apiCalls";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { API_BASE_URL } from "../../lib/apiBase";

const DEFAULT_AVATAR =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const tabs = [
  {
    id: 0,
    label: "Overview",
    icon: Leaf,
  },
  {
    id: 1,
    label: "Order History",
    icon: Package,
  },
  {
    id: 2,
    label: "Addresses",
    icon: MapPin,
  },
  {
    id: 3,
    label: "Profile",
    icon: User,
  },
];

const paymentMethods = ["Cash On Delivery", "Online Payment"];

const formatLocation = (user) =>
  [user.city, user.country].filter(Boolean).join(", ");

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const ProductOrder = ({ product }) => {
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/products/${product.productId}`,
          {
            withCredentials: true,
          },
        );

        if (mounted) {
          setProductData(response.data);
        }
      } catch (err) {
        console.error("Unable to load order product:", err);

        if (mounted) {
          setError(true);
        }
      }
    };

    fetchProduct();

    return () => {
      mounted = false;
    };
  }, [product.productId]);

  if (!productData) {
    return (
      <div className="ug-order-product ug-order-product-loading">
        <div className="ug-product-placeholder" />

        <div className="ug-order-product-info">
          <div className="ug-skeleton ug-skeleton-title" />
          <div className="ug-skeleton ug-skeleton-line" />
          <div className="ug-skeleton ug-skeleton-line short" />
        </div>
      </div>
    );
  }

  const quantity = Number(product.quantity) || 0;
  const price = Number(productData.price) || 0;
  const total = price * quantity;

  return (
    <div className="ug-order-product">
      <img
        src={
          productData.photos?.[0] ||
          "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=300&q=80"
        }
        alt={productData.name || "Ordered product"}
      />

      <div className="ug-order-product-info">
        <div className="ug-order-product-main">
          <h4>{productData.name || "Product"}</h4>

          <p>
            {(
              productData.description ||
              productData.desc ||
              "No description added."
            ).slice(0, 90)}
            {(productData.description || productData.desc || "").length > 90
              ? "..."
              : ""}
          </p>
        </div>

        <div className="ug-order-product-meta">
          <span>
            Price
            <strong>₹{price}</strong>
          </span>

          <span>
            Qty
            <strong>{quantity}</strong>
          </span>

          <span>
            Total
            <strong>₹{total}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

const Orders = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className="ug-empty-state">
        <div className="ug-empty-icon">
          <ShoppingBag size={28} />
        </div>

        <h3>No orders yet</h3>

        <p>
          Your plant orders will appear here after you complete your first
          purchase.
        </p>
      </div>
    );
  }

  return (
    <div className="ug-orders-list">
      {orders.map((order) => {
        const products = Array.isArray(order.products) ? order.products : [];

        return (
          <article className="ug-order-card" key={order._id}>
            <div className="ug-order-header">
              <div>
                <span className="ug-order-label">Order placed</span>
                <strong>{formatDate(order.createdAt)}</strong>
              </div>

              <div>
                <span className="ug-order-label">Total</span>
                <strong>₹{order.amount || 0}</strong>
              </div>

              <div>
                <span className="ug-order-label">Payment</span>
                <strong>{paymentMethods[order.method] || "Payment"}</strong>
              </div>

              <div>
                <span className="ug-order-label">Ship to</span>
                <strong>{order.customerName || "Customer"}</strong>
              </div>
            </div>

            <div className="ug-order-body">
              <div className="ug-order-body-heading">
                <div>
                  <span>Order ID</span>
                  <strong>#{String(order._id).slice(-8).toUpperCase()}</strong>
                </div>

                <span className="ug-order-status">
                  Order updated {formatDate(order.updatedAt)}
                </span>
              </div>

              <div className="ug-order-products">
                {products.map((product) => (
                  <ProductOrder key={product.productId} product={product} />
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default function VerticalTabs({ user }) {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);
  const [modal, setModal] = useState(null);

  const [profileForm, setProfileForm] = useState({
    username: user.username || "",
    email: user.email || "",
    phone: user.phone || "",
  });

  const { data } = useFetch(`/orders/find/${user._id}`);

  const orders = Array.isArray(data) ? data : [];

  const avatar = user.img || DEFAULT_AVATAR;
  const location = formatLocation(user);

  const nurseryId = user.nurseryId || user.nursuries;
  const isNurseryOwner = Boolean(user.isAdmin || nurseryId);

  const openProfileModal = () => {
    setProfileForm({
      username: user.username || "",
      email: user.email || "",
      phone: user.phone || "",
    });

    setModal("profile");
  };

  const closeModal = () => {
    setModal(null);
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfileForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    const { username, email, phone } = profileForm;

    if (!username.trim() || !email.trim() || !phone.trim()) {
      alert("Please complete all profile fields.");
      return;
    }

    try {
      await update(dispatch, {
        username: username.trim(),
        email: email.trim(),
        phone: phone.trim(),
        id: user._id,
      });

      closeModal();
    } catch (err) {
      console.error("Unable to update profile:", err);
      alert("Unable to update your profile.");
    }
  };

  const overviewCards = [
    {
      icon: Package,
      value: orders.length,
      label: "Orders",
      description: "Track your plant purchases",
    },
    {
      icon: ShoppingBag,
      value: "Saved",
      label: "Wishlist",
      description: "Keep favourite plants nearby",
    },
    {
      icon: MapPin,
      value: location || "Add location",
      label: "Location",
      description: "Manage delivery information",
    },
  ];

  if (isNurseryOwner) {
    overviewCards.push({
      icon: Store,
      value: "Owner",
      label: "Nursery",
      description: "Manage your nursery listings",
    });
  }

  const profileFields = [
    {
      icon: User,
      label: "Name",
      value: user.username || "Not added",
    },
    {
      icon: Phone,
      label: "Mobile number",
      value: user.phone || "Not added",
    },
    {
      icon: Mail,
      label: "Email address",
      value: user.email || "Not added",
    },
    {
      icon: MapPin,
      label: "Location",
      value: location || "Not added",
    },
  ];

  return (
    <>
      <section className="ug-profile-dashboard">
        {/* Sidebar */}
        <aside className="ug-profile-sidebar">
          <div className="ug-profile-user">
            <div className="ug-profile-avatar">
              <img src={avatar} alt={`${user.username || "User"} profile`} />

              <span className="ug-online-dot" />
            </div>

            <div className="ug-profile-user-copy">
              <span>Welcome back</span>
              <strong>{user.username || "Garden User"}</strong>
            </div>
          </div>

          <nav className="ug-profile-nav" aria-label="Profile navigation">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`ug-profile-nav-item ${active ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="ug-profile-nav-icon">
                    <Icon size={18} />
                  </span>

                  <span>{tab.label}</span>

                  <ChevronRight className="ug-profile-nav-arrow" size={16} />
                </button>
              );
            })}
          </nav>

          <div className="ug-sidebar-footer">
            <span className="ug-sidebar-leaf">
              <Leaf size={16} />
            </span>

            <div>
              <strong>Urban Garden</strong>
              <span>Grow something beautiful.</span>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="ug-profile-content">
          {/* OVERVIEW */}
          {activeTab === 0 && (
            <section className="ug-profile-section">
              <div className="ug-section-heading">
                <div>
                  <span className="ug-section-kicker">Your garden</span>

                  <h2>Overview</h2>

                  <p>
                    Everything you need to manage your Urban Garden account.
                  </p>
                </div>

                <button
                  type="button"
                  className="ug-outline-button"
                  onClick={openProfileModal}
                >
                  <Pencil size={16} />
                  Edit profile
                </button>
              </div>

              <div className="ug-welcome-card">
                <div className="ug-welcome-background" />

                <div className="ug-welcome-content">
                  <div className="ug-welcome-avatar">
                    <img
                      src={avatar}
                      alt={`${user.username || "User"} profile`}
                    />
                  </div>

                  <div>
                    <span>Welcome to your garden</span>

                    <h3>Hello, {user.username || "Garden Lover"}!</h3>

                    <p>
                      Keep your plants, purchases and delivery details organized
                      in one place.
                    </p>
                  </div>
                </div>
              </div>

              <div className="ug-stat-grid">
                {overviewCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <div className="ug-stat-card" key={card.label}>
                      <div className="ug-stat-icon">
                        <Icon size={20} />
                      </div>

                      <div className="ug-stat-copy">
                        <span>{card.label}</span>
                        <strong>{card.value}</strong>
                        <p>{card.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="ug-overview-bottom">
                <div className="ug-quick-card">
                  <div className="ug-card-heading">
                    <div>
                      <span>Account</span>
                      <h3>Personal details</h3>
                    </div>

                    <button type="button" onClick={() => setActiveTab(3)}>
                      View
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <div className="ug-mini-details">
                    <div>
                      <Mail size={17} />
                      <span>{user.email || "No email added"}</span>
                    </div>

                    <div>
                      <Phone size={17} />
                      <span>{user.phone || "No phone added"}</span>
                    </div>

                    <div>
                      <MapPin size={17} />
                      <span>{location || "No location added"}</span>
                    </div>
                  </div>
                </div>

                <div className="ug-quick-card ug-garden-card">
                  <div className="ug-garden-decoration">
                    <Leaf size={42} />
                  </div>

                  <span>Keep growing</span>

                  <h3>Your garden journey starts here.</h3>

                  <p>
                    Explore plants, seeds and gardening essentials for your next
                    green project.
                  </p>
                </div>
              </div>

              {isNurseryOwner && (
                <div className="ug-owner-section">
                  <div className="ug-section-heading compact">
                    <div>
                      <span className="ug-section-kicker">Nursery</span>
                      <h2>Owner tools</h2>
                    </div>
                  </div>

                  <div className="ug-owner-actions">
                    <a href="/AddProductControl">
                      <Plus size={18} />
                      Add Product
                      <ChevronRight size={16} />
                    </a>

                    <a href="/AddNursery-Control">
                      <Store size={18} />
                      Manage Nursery
                      <ChevronRight size={16} />
                    </a>

                    <a href="/Profile">
                      <Tags size={18} />
                      View Listings
                      <ChevronRight size={16} />
                    </a>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ORDERS */}
          {activeTab === 1 && (
            <section className="ug-profile-section">
              <div className="ug-section-heading">
                <div>
                  <span className="ug-section-kicker">Shopping activity</span>

                  <h2>Your orders</h2>

                  <p>Review your previous plant and gardening purchases.</p>
                </div>

                <div className="ug-order-count">
                  <Package size={16} />
                  {orders.length} {orders.length === 1 ? "order" : "orders"}
                </div>
              </div>

              <Orders orders={orders} />
            </section>
          )}

          {/* ADDRESSES */}
          {activeTab === 2 && (
            <section className="ug-profile-section">
              <div className="ug-section-heading">
                <div>
                  <span className="ug-section-kicker">Delivery</span>

                  <h2>Saved addresses</h2>

                  <p>Manage the places where you receive your garden orders.</p>
                </div>

                <button
                  type="button"
                  className="ug-primary-button"
                  onClick={() => setModal("address")}
                >
                  <Plus size={17} />
                  Add address
                </button>
              </div>

              <div className="ug-address-wrapper">
                <UserAddressBox user={user} />
              </div>
            </section>
          )}

          {/* PROFILE */}
          {activeTab === 3 && (
            <section className="ug-profile-section">
              <div className="ug-section-heading">
                <div>
                  <span className="ug-section-kicker">Account settings</span>

                  <h2>Profile details</h2>

                  <p>Keep your personal information up to date.</p>
                </div>

                <button
                  type="button"
                  className="ug-primary-button"
                  onClick={openProfileModal}
                >
                  <Pencil size={16} />
                  Edit profile
                </button>
              </div>

              <div className="ug-profile-details-card">
                <div className="ug-profile-details-top">
                  <div className="ug-large-avatar">
                    <img
                      src={avatar}
                      alt={`${user.username || "User"} profile`}
                    />
                  </div>

                  <div>
                    <span className="ug-profile-role">
                      Urban Garden Customer
                    </span>

                    <h3>{user.username || "Garden User"}</h3>

                    <p>Member of the Urban Garden community</p>
                  </div>
                </div>

                <div className="ug-profile-field-grid">
                  {profileFields.map((field) => {
                    const Icon = field.icon;

                    return (
                      <div className="ug-profile-field" key={field.label}>
                        <div className="ug-profile-field-icon">
                          <Icon size={18} />
                        </div>

                        <div>
                          <span>{field.label}</span>
                          <strong>{field.value}</strong>
                        </div>
                      </div>
                    );
                  })}

                  <div className="ug-profile-field">
                    <div className="ug-profile-field-icon">
                      <CalendarDays size={18} />
                    </div>

                    <div>
                      <span>Member type</span>
                      <strong>Urban Garden Customer</strong>
                    </div>
                  </div>

                  <div className="ug-profile-field">
                    <div className="ug-profile-field-icon">
                      <CreditCard size={18} />
                    </div>

                    <div>
                      <span>Payment</span>
                      <strong>Cash on delivery & online payment</strong>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </section>

      {/* PROFILE MODAL */}
      {modal === "profile" && (
        <div
          className="ug-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="ug-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-profile-title"
          >
            <div className="ug-modal-header">
              <div>
                <span className="ug-section-kicker">Account</span>

                <h2 id="edit-profile-title">Edit profile</h2>

                <p>Update your personal information.</p>
              </div>

              <button
                type="button"
                className="ug-modal-close"
                onClick={closeModal}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <form className="ug-modal-form" onSubmit={handleProfileSubmit}>
              <div className="ug-form-avatar">
                <img src={avatar} alt={`${user.username || "User"} profile`} />

                <div>
                  <strong>{user.username || "Garden User"}</strong>
                  <span>Profile information</span>
                </div>
              </div>

              <label>
                <span>Name</span>

                <div className="ug-input-wrapper">
                  <User size={17} />

                  <input
                    type="text"
                    name="username"
                    value={profileForm.username}
                    onChange={handleProfileChange}
                    autoComplete="name"
                  />
                </div>
              </label>

              <label>
                <span>Email address</span>

                <div className="ug-input-wrapper">
                  <Mail size={17} />

                  <input
                    type="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    autoComplete="email"
                  />
                </div>
              </label>

              <label>
                <span>Mobile number</span>

                <div className="ug-input-wrapper">
                  <Phone size={17} />

                  <input
                    type="tel"
                    name="phone"
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                    autoComplete="tel"
                  />
                </div>
              </label>

              <div className="ug-modal-actions">
                <button
                  type="button"
                  className="ug-secondary-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="ug-primary-button">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADDRESS MODAL */}
      {modal === "address" && (
        <div
          className="ug-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="ug-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-address-title"
          >
            <div className="ug-modal-header">
              <div>
                <span className="ug-section-kicker">Delivery</span>

                <h2 id="add-address-title">Add new address</h2>

                <p>Add a delivery address for your future orders.</p>
              </div>

              <button
                type="button"
                className="ug-modal-close"
                onClick={closeModal}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="ug-address-notice">
              <MapPin size={18} />

              <p>
                Address management is ready for your existing address component.
                Connect the form below to your address API when you persist
                addresses on the backend.
              </p>
            </div>

            <div className="ug-modal-actions">
              <button
                type="button"
                className="ug-secondary-button"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="ug-primary-button"
                onClick={closeModal}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
