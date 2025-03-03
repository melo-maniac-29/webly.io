import Lookup from '@/data/Lookup';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PricingModel() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [selectedOption, setSelectedOption] = useState();

  const UpdateToken = useMutation(api.users.UpdateToken);
  useEffect(() => {
    console.log(userDetail);
  }, [userDetail]);

  const paypalCreateOrder = async (data) => {

    console.log("data  : ", data);

    console.log("user detail  : ", userDetail._id);
    console.log("price : ", selectedOption.price);
    try {
      let response = await axios.post('/api/paypal/createorder', {
        user_id: userDetail._id,
        order_price: selectedOption.price
      })

      console.log("response from the create order  : ", response.data.data.order.id);

      return response.data.data.order.id;
    } catch (err) {
      // Your custom code to show an error like showing a toast:
      // toast.error('Some Error Occured')
      return null
    }
  }

  const paypalCaptureOrder = async orderID => {
    try {
      let response = await axios.post('/api/paypal/captureorder', {
        orderID
      })

      console.log("response from payment capture : ", response.data);
      if (response.data.success) {
          toast.success("Payment successful!");
        // Order is successful
        // Your custom code

        // Like showing a success toast:
        // toast.success('Amount Added to Wallet')

        // And/Or Adding Balance to Redux Wallet
        // dispatch(setWalletBalance({ balance: response.data.data.wallet.balance }))
      }
    }
    catch (err) {
      toast.error("Payment failed!");
      console.log("error occured in pricing : ", err);
      console.error(err);
      // Order is not successful
      // Your custom code

      // Like showing an error toast
      // toast.error('Some Error Occured')
      }
  }

  const onPaymentSuccess = async (pric, usr) => {
    console.log(selectedOption);
    console.log(pric);
    console.log(usr);
    const token = Number(usr?.token) + Number(pric?.value);
    console.log(token);
    await UpdateToken({
      token: token,
      userId: userDetail?._id,
    });
  };


  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
      {Lookup.PRICING_OPTIONS.map((pricing, index) => (
        <div
          className="flex flex-col gap-6 border rounded-xl p-10 justify-between"
          key={index}
        >
          <h2 className="font-bold text-4xl">{pricing.name}</h2>
          <h2 className="font-medium text-lg">{pricing.tokens} Tokens</h2>
          <p className="text-gray-400">{pricing.desc}</p>
          <h2 className="font-bold text-4xl text-center mt-6">
            {pricing.price}$
          </h2>
          {/* <Button>Upgrade to {pricing.name}</Button>
           */}
          {userDetail && (
            <div
              onClick={() => {
                setSelectedOption(pricing);
                console.log(pricing);
              }}
            >
              <PayPalButtons
                style={{ layout: 'horizontal' }}
                disabled={!userDetail}
                onCancel={() => console.log('payment cancel')}
                
                onClick={() => {
                  setSelectedOption(pricing);
                  console.log(pricing);
                }}

                createOrder={async (data, actions) => {
                  let order_id = await paypalCreateOrder(data)
                  console.log("create order  : ", order_id);
                  return order_id + ''
                }}

                onApprove={async (data, actions) => {
                  console.log("onapprove Data  : ", data);
                  let response = await paypalCaptureOrder(data.orderID);
                  console.log("response of approve : ", response);
                  return response; // Explicit return
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PricingModel;