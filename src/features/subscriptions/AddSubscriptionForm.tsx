import React, { useState } from "react";
import { Stock } from "../../models/stock";
import { useDispatch, useSelector } from "react-redux";
import { useAddSubscriptionMutation } from "../../Apis/subscriptionApi";
import { addSubscription } from "../../Storage/Redux/subscriptionSlice";
import { useNavigate } from "react-router-dom";

interface AddSubscriptionFormProps {
  stock: Stock;
}
const AddSubscriptionForm: React.FC<AddSubscriptionFormProps> = ({ stock }) => {
  const [isPopupVisible, setPopupVisible] = useState(false); // For showing/hiding the popup
  const [selectedStock, setSelectedStock] = useState(null); // For tracking the selected stock
  const [subscriptionData, setSubscriptionData] = useState({
    threshold: "",
    position: "",
  });

  const email = useSelector((state) => state.userAuthStore.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addSubscriptionMutation] = useAddSubscriptionMutation();
  const positions = ["Above", "Below"];

  // Close the popup
  const handleClosePopup = () => {
    setPopupVisible(false);
    setSelectedStock(null);
    setSubscriptionData({ threshold: "", position: "" });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAddThresholdClick = () => {
    console.log("add threshold button clicked");
    setPopupVisible(!isPopupVisible);
  };
  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Subscription added:", {
      stock: selectedStock,
      ...subscriptionData,
    });
    const response = await addSubscriptionMutation({
      email: email,
      threshold: Number(subscriptionData.threshold),
      ticker: stock.ticker,
      position: subscriptionData.position == "Above" ? 0 : 1,
    });

    if (response.data) {
      console.log(Object.keys(response.data));
      dispatch(addSubscription(response.data.value));
      navigate("/");
    }
    handleClosePopup();
  };
  return (
    <div>
      <button
        onClick={handleAddThresholdClick}
        style={{ padding: "8px", cursor: "pointer" }}
      >
        Add Threshold
      </button>{" "}
      {/* Popup Form */}
      {isPopupVisible && (
        <div style={popupStyles.overlay}>
          <div style={popupStyles.content}>
            <h2>Add Subscription for {stock.ticker}</h2>
            <form style={popupStyles.form} onSubmit={handleFormSubmit}>
              <label>
                Threshold:
                <input
                  type="text"
                  name="threshold"
                  value={subscriptionData.threshold}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Position:
                <select
                  name="position"
                  value={subscriptionData.position}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    -- Select a position --
                  </option>
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit">Add Subscription</button>
              <button type="button" onClick={handleClosePopup}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const popupStyles: {
  overlay: React.CSSProperties;
  content: React.CSSProperties;
  form: React.CSSProperties;
} = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#fff",
    color: "#0c0c0c",
    padding: "20px",
    borderRadius: "5px",
    width: "50%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

export default AddSubscriptionForm;
