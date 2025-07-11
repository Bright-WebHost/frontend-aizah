'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { format, differenceInDays } from 'date-fns';
import HeaderOne from '@/components/Header/HeaderOne';
import Footer from '@/components/Footer/Footer';
import axios from 'axios';
import Link from 'next/link'
// import { useRouter } from 'next/navigation';

const Checkout = () => {
  const [paymentID, setPaymentID] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [keyId, setKeyId] = useState("");

  const [billingData, setBillingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    zipCode: '',
  });

  const searchParams = useSearchParams();
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const guests = searchParams.get('guests');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');
  const pets = searchParams.get('pets');
  const totalPrice = searchParams.get('totalPrice');
  const price = searchParams.get('price');
  const roomname = searchParams.get('roomname');

  const formattedStartDate = startDate ? format(new Date(startDate), 'd-MMM-yyyy') : '';
  const formattedEndDate = endDate ? format(new Date(endDate), 'd MMM yyyy') : '';
  const formattedRange = `${formattedStartDate} – ${formattedEndDate}`;

  const totalNights = startDate && endDate
    ? differenceInDays(new Date(endDate), new Date(startDate))
    : 1;

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Fetch Razorpay API key
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/keyview`);
        const keyData = response.data?.data?.[0];
        if (keyData) {
          setApiKey(keyData.key);
          setKeyId(keyData._id);
        }
      } catch (error) {
        console.error("Error fetching API key:", error);
      }
    };

    fetchApiKey();
  }, []);

  // Send booking data to backend for card payments
  const sendBookingToBackend = async (paymentId?: string) => {
    const payload = {
      fname: billingData.firstName,
      lname: billingData.lastName,
      phone: billingData.phone,
      city: billingData.city,
      code: billingData.zipCode,
      email: billingData.email,
      checkin: formattedStartDate,
      checkout: formattedEndDate,
      children: children,
      paymentID: paymentId || 'COD',
      guests: guests,
      totalprice: totalPrice,
      night: totalNights,
      price: price,
      roomname:roomname,
      booking: {
        startDate,
        endDate,
        guests,
        adults,
        children,
        pets,
        totalPrice,
        formattedStartDate,
        formattedEndDate,
        roomname,
      }
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) throw new Error('Failed to send booking data');
      return true;
    } catch (error) {
      console.error('Error sending booking:', error);
      return false;
    }
  };

  // Send COD booking data to the new endpoint
  const sendCODBookingToBackend = async () => {
    const payload = {
      fname: billingData.firstName,
      lname: billingData.lastName,
      phone: billingData.phone,
      city: billingData.city,
      code: billingData.zipCode,
      email: billingData.email,
      checkin: formattedStartDate,
      checkout: formattedEndDate,
      children: children,
      paymentID: 'COD',
      guests: guests,
      totalprice: totalPrice,
      night: totalNights,
      price: price,
      roomname:roomname,
      booking: {
        startDate,
        endDate,
        guests,
        adults,
        children,
        pets,
        totalPrice,
        formattedStartDate,
        formattedEndDate,
        roomname,
      }
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkoutSubmit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) throw new Error('Failed to submit COD booking');
      return true;
    } catch (error) {
      console.error('Error submitting COD booking:', error);
      return false;
    }
  };

  // Handle Razorpay payment
  const handleRazorpayPayment = async () => {
    if (!billingData.firstName || !billingData.email || !billingData.phone) {
      alert('Please fill at least First Name, Email, and Phone fields.');
      return;
    }

    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load.');
      return;
    }

    setLoading(true);

    const orderAmount = totalPrice ? parseInt(totalPrice) * 100 : 10000;

    const options = {
      key: apiKey,
      amount: orderAmount,
      currency: 'INR',
      name: 'AIZAH HOSPITALITY',
      description: 'Booking Payment',
      handler: async function (response: any) {
        try {
          const paymentID = response.razorpay_payment_id;
          setPaymentID(paymentID);
          
          const success = await sendBookingToBackend(paymentID);
          
          if (success) {
            alert(`Payment successful! Payment ID: ${paymentID}`);
            setShowPopup(true);
          } else {
            alert('Payment succeeded but failed to save booking. Please contact support.');
          }
        } catch (error) {
          console.error('Error handling payment:', error);
          alert('Error processing payment. Please contact support.');
        } finally {
          setLoading(false);
        }
      },
      prefill: {
        name: `${billingData.firstName} ${billingData.lastName}`,
        email: billingData.email,
        contact: billingData.phone,
      },
      theme: {
        color: '#32548E',
      },
    };

    const rzp = new (window as any).Razorpay(options);
    
    rzp.on('payment.failed', function (response: any) {
      alert(`Payment failed: ${response.error.description}`);
      setLoading(false);
    });

    rzp.open();
  };

  // Handle COD submission
  const handleSubmitCOD = async () => {
    if (!billingData.firstName || !billingData.email || !billingData.phone) {
      alert('Please fill at least First Name, Email, and Phone fields.');
      return;
    }
    
    setLoading(true);
    try {
      const success = await sendCODBookingToBackend();
      if (success) {
        alert('COD booking submitted successfully!');
        // You can add additional success handling here if needed
      } else {
        alert('Failed to submit COD booking. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting COD booking:', error);
      alert('An error occurred while submitting the booking.');
    } finally {
      setLoading(false);
    }
  };
  //  const router = useRouter();
  return (
    <>
      <HeaderOne />
{/*        
       <div className="button-main text-center mt-5 ml-16">
      <button
        type="button"
        onClick={() => router.back()}
        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        Go Back
      </button>
    </div> */}
      <div>
        <div className="max-w-12xl mx-auto px-4 py-10 flex flex-col items-center lg:items-start lg:flex-row gap-8 lg:ml-10 lg:mr-10">
          {/* Left Section */}
          <div
            className="w-full flex-1 bg-white shadow-md p-6 rounded-2xl"
            style={{
              boxShadow: 'rgba(10, 10, 10, 0.22) 0px 3px 9px',
              border: '1px solid rgb(221, 221, 221)',
              borderRadius: '20px',
            }}
          >
            {/* Billing Address */}
            <div className="content-detail border-b border-outline pt-0">
              <div className="container">
                <div className="flex max-lg:flex-col-reverse gap-y-10 justify-between">
                  <div className="content xl:w-3/3 lg:w-[100%] lg:pr-[15px] w-full">
                    <div className="border-b pb-4 mb-6 mt-4">
                      <h2 className="font-semibold text-lg mb-4">Billing Address</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          placeholder="First Name"
                          className="border border-[#3274BD] p-3 rounded-md w-full"
                          value={billingData.firstName}
                          onChange={(e) =>
                            setBillingData((prev) => ({ ...prev, firstName: e.target.value }))
                          }
                          required
                        />
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="border border-[#3274BD] p-3 rounded-md w-full"
                          value={billingData.lastName}
                          onChange={(e) =>
                            setBillingData((prev) => ({ ...prev, lastName: e.target.value }))
                          }
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          className="border border-[#3274BD] p-3 rounded-md w-full"
                          value={billingData.email}
                          onChange={(e) =>
                            setBillingData((prev) => ({ ...prev, email: e.target.value }))
                          }
                          required
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          className="border border-[#3274BD] p-3 rounded-md w-full"
                          value={billingData.phone}
                          onChange={(e) =>
                            setBillingData((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          required
                        />
                        <input
                          type="text"
                          placeholder="Street Address"
                          className="border border-[#3274BD] p-3 rounded-md w-full sm:col-span-2"
                          value={billingData.streetAddress}
                          onChange={(e) =>
                            setBillingData((prev) => ({ ...prev, streetAddress: e.target.value }))
                          }
                        />
                        <input
                          type="text"
                          placeholder="City"
                          className="border border-[#3274BD] p-3 rounded-md w-full"
                          value={billingData.city}
                          onChange={(e) =>
                            setBillingData((prev) => ({ ...prev, city: e.target.value }))
                          }
                        />
                        <input
                          type="text"
                          placeholder="Zip Code"
                          className="border border-[#3274BD] p-3 rounded-md w-full"
                          value={billingData.zipCode}
                          onChange={(e) =>
                            setBillingData((prev) => ({ ...prev, zipCode: e.target.value }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="pt-4">
              <h2 className="font-semibold text-lg mb-4">Payment Options</h2>
              <div className="flex gap-6 mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <span>Payment By Card</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <span>Pay at Check-in</span>
                </label>
              </div>

              {paymentMethod === 'card' ? (
                <button
                  onClick={handleRazorpayPayment}
                  disabled={loading}
                  className="w-32 bg-transparent hover:bg-[#32548E] text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  {loading ? 'Processing...' : 'Pay Now'}
                </button>
              ) : (
                <button
                  onClick={handleSubmitCOD}
                  disabled={loading}
                  className="w-32 bg-transparent hover:bg-[#32548E] text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              )}
            </div>
          </div>

          {/* Right Section - Booking Summary */}
          <div
            className="lg:w-[32%] w-full max-lg:w-full max-lg:mr-4 rounded-2xl shadow-md bg-white px-6 py-10"
            style={{
              boxShadow: 'rgba(10, 10, 10, 0.22) 0px 3px 9px',
              border: '1px solid rgb(221, 221, 221)',
            }}
          >
            <div>
              <h3 className="font-semibold text-xl mb-6">Summary</h3>
              <div className="flex justify-between mb-4">
                <p className="font-semibold">Check In</p>
                <p>{roomname}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="font-semibold">Check In</p>
                <p>{formattedStartDate}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="font-semibold">Check Out</p>
                <p>{formattedEndDate}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="font-semibold">Guests</p>
                <p>{guests}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="font-semibold">Children</p>
                <p>{children}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="font-semibold">Nights</p>
                <p>{totalNights}</p>
              </div>
              <div className="flex justify-between mb-6 border-b border-gray-300 pb-6">
                <p className="font-semibold">Price per Night</p>
                <p>₹{price}</p>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <p>Total</p>
                <p>₹{totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;