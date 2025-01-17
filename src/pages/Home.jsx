import { useDispatch, useSelector } from "react-redux";
import StockList from "../features/stocks/StockList";
import { useEffect } from "react";
import { useGetUserSubscriptionDataQuery } from "../Apis/subscriptionApi";
import { setSubscriptions } from "../Storage/Redux/subscriptionSlice";
import SubscriptionList from "../features/subscriptions/SubscriptionList";
import StockSearchBarWrapper from "../features/stocks/StockSearchBarWrapper";

const Home = () => {
  const subscriptionData = useSelector((state) => state.subscriptionStore);
  var subStoreKeys = Object.keys(subscriptionData);
  const userData = useSelector((state) => state.userAuthStore);
  const dispatch = useDispatch();
  var isLoggedIn = userData.email.length > 0 ? true : false;
  console.log("logged in: " + isLoggedIn);
  const { data, error, isLoading } = useGetUserSubscriptionDataQuery(null, {
    skip: !isLoggedIn,
  });

  useEffect(() => {
    if (!isLoading && !error && data) {
      console.log("subscription response data " + data);

      dispatch(setSubscriptions(data.value));
    }
  }, [data]);

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <StockSearchBarWrapper />{" "}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          graphical display of current top 5 stock prices
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error occurred.</p>}
      {data && subscriptionData.subscriptions.length > 0 && (
        <>
          {subscriptionData.subscriptions !== undefined && (
            <div className="row">
              <div className="col-md-12">
                <SubscriptionList
                  subscriptions={subscriptionData.subscriptions}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
