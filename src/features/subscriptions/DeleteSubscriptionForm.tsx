import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteSubscriptionMutation } from "../../Apis/subscriptionApi";
import { deleteSubscription } from "../../Storage/Redux/subscriptionSlice";
import { useNavigate } from "react-router-dom";
import { SubscriptionResponse } from "../../models/subscription";

interface DeleteSubscriptionFormProps {
  subscription: SubscriptionResponse;
}
const DeleteSubscriptionForm: React.FC<DeleteSubscriptionFormProps> = ({
  subscription,
}) => {
  const [isPopupVisible, setPopupVisible] = useState(false); // For showing/hiding the popup
  const [subscriptionData, setSubscriptionData] = useState({
    threshold: subscription.threshold.toFixed(2),
    position: subscription.position == 0 ? "Above" : "Below",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteSubscriptionMutation] = useDeleteSubscriptionMutation();
  const positions = ["Above", "Below"];

  // Close the popup
  const handleClosePopup = () => {
    setPopupVisible(false);
    //setSubscriptionData({ threshold: "", position: "" });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleDeleteThresholdClick = () => {
    console.log("add threshold button clicked");
    setPopupVisible(!isPopupVisible);
  };
  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("sub id: " + subscription.id);
    const response = await deleteSubscriptionMutation({
      id: subscription.id.toUpperCase(),
    });

    if (response.data) {
      console.log(Object.keys(response.data));
      console.log("delete sub response: " + response.data.value);
      dispatch(deleteSubscription(subscription.id));
      navigate("/");
    }
    handleClosePopup();
  };
  return (
    <div>
      <button
        onClick={handleDeleteThresholdClick}
        style={{ padding: "8px", cursor: "pointer" }}
      >
        Delete Threshold
      </button>{" "}
      {/* Popup Form */}
      {isPopupVisible && (
        <div style={popupStyles.overlay}>
          <div style={popupStyles.content}>
            <h2>Delete Subscription for {subscription.tickerSymbol}</h2>
            <form style={popupStyles.form} onSubmit={handleFormSubmit}>
              <label>
                Threshold:
                <input
                  type="text"
                  name="threshold"
                  value={subscriptionData.threshold}
                  onChange={handleInputChange}
                  disabled
                />
              </label>
              <label>
                Position:
                <select
                  name="position"
                  value={subscriptionData.position}
                  onChange={handleInputChange}
                  disabled
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
              <button type="submit">Delete Subscription</button>
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

export default DeleteSubscriptionForm;
