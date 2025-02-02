import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditSubscriptionMutation } from "../../Apis/subscriptionApi";
import { editSubscription } from "../../Storage/Redux/subscriptionSlice";
import { useNavigate } from "react-router-dom";
import { SubscriptionResponse } from "../../models/subscription";

interface EditSubscriptionFormProps {
  subscription: SubscriptionResponse;
}
const EditSubscriptionForm: React.FC<EditSubscriptionFormProps> = ({
  subscription,
}) => {
  const [isPopupVisible, setPopupVisible] = useState(false); // For showing/hiding the popup
  const [subscriptionData, setSubscriptionData] = useState({
    threshold: subscription.threshold.toFixed(2),
    position: subscription.position == 0 ? "Above" : "Below",
  });

  const email = useSelector((state) => state.userAuthStore.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editSubscriptionMutation] = useEditSubscriptionMutation();
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
  const handleAddThresholdClick = () => {
    console.log("add threshold button clicked");
    setPopupVisible(!isPopupVisible);
  };
  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("sub id: " + subscription.id);
    const response = await editSubscriptionMutation({
      id: subscription.id,
      email: email,
      threshold: Number(subscriptionData.threshold),
      ticker: subscription.tickerSymbol,
      position: subscriptionData.position == "Above" ? 0 : 1,
    });

    if (response.data) {
      console.log(Object.keys(response.data));
      console.log("edit sub response: " + response.data.value);
      dispatch(editSubscription(response.data.value));
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
        Edit Threshold
      </button>{" "}
      {/* Popup Form */}
      {isPopupVisible && (
        <div style={popupStyles.overlay}>
          <div style={popupStyles.content}>
            <h2>Edit Subscription for {subscription.tickerSymbol}</h2>
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
              <button type="submit">Update Subscription</button>
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

export default EditSubscriptionForm;
