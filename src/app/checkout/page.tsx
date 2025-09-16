'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format, differenceInDays } from 'date-fns';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaDownload, FaCheckCircle, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import HeaderTwo from '@/components/Header/HeaderTwo';
import Footer from '@/components/Footer/Footer';

interface BillingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  zipCode: string;
}

interface StripeCardFormProps {
  billingData: BillingData;
  totalPrice: number;
  roomname: string;
  formattedStartDate: string;
  formattedEndDate: string;
  children: string;
  guests: string;
  totalNights: number;
  roomPrice: string;
  tourismFee: number;
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentError: (message: string) => void;
  stripeApiKey: string;
}

const StripeCardForm: React.FC<StripeCardFormProps> = ({
  billingData,
  totalPrice,
  roomname,
  formattedStartDate,
  formattedEndDate,
  children,
  guests,
  totalNights,
  roomPrice,
  tourismFee,
  onPaymentSuccess,
  onPaymentError,
  stripeApiKey
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      const paymentIntentResponse = await fetch(`https://api.aizahhospitality.com/api/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalPrice * 100,
          currency: 'aed',
          description: `Booking payment from ${billingData.firstName} ${billingData.lastName}`,
          metadata: {
            firstName: billingData.firstName,
            lastName: billingData.lastName,
            email: billingData.email,
            roomName: roomname,
            checkIn: formattedStartDate,
            checkOut: formattedEndDate
          }
        }),
      });

      const { clientSecret } = await paymentIntentResponse.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: `${billingData.firstName} ${billingData.lastName}`,
            email: billingData.email,
            phone: billingData.phone,
            address: {
              line1: billingData.streetAddress,
              city: billingData.city,
              postal_code: billingData.zipCode,
            },
          },
        },
      });

      if (error) {
        onPaymentError(error.message || 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {
        const success = await sendBookingData(paymentIntent.id);
        if (success) {
          onPaymentSuccess(paymentIntent.id);
        } else {
          onPaymentError('Payment succeeded but failed to save booking');
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      onPaymentError(error instanceof Error ? error.message : 'Payment error occurred');
    } finally {
      setLoading(false);
    }
  };

  const sendBookingData = async (paymentId: string) => {
    try {
      const response = await fetch(`https://api.aizahhospitality.com/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fname: billingData.firstName,
          lname: billingData.lastName,
          phone: billingData.phone,
          city: billingData.city,
          code: billingData.zipCode,
          email: billingData.email,
          checkin: formattedStartDate,
          checkout: formattedEndDate,
          children: children,
          paymentID: paymentId,
          guests: guests,
          totalprice: totalPrice,
          night: totalNights,
          price: roomPrice,
          roomname: roomname,
          tourismFee: tourismFee,
        }),
      });
      return response.ok;
    } catch (error) {
      console.error('Error sending booking:', error);
      return false;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border p-4 rounded mb-4 bg-gray-50">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
              invalid: { color: '#9e2146' },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-32 bg-transparent hover:bg-[#32548E] text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

const Checkout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [paymentID, setPaymentID] = useState('');
  const [stripeApiKey, setStripeApiKey] = useState('');
  const [keyId, setKeyId] = useState('');
  const [billingData, setBillingData] = useState<BillingData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    zipCode: '',
  });

  // Extract query params
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const guests = searchParams.get('guests') || '0';
  const adults = searchParams.get('adults') || '0';
  const children = searchParams.get('children') || '0';
  const pets = searchParams.get('pets') || '0';
  const roomPrice = searchParams.get('price') || '0';
  const roomname = searchParams.get('roomname') || '';

  const formattedStartDate = startDate ? format(new Date(startDate), 'd-MMM-yyyy') : '';
  const formattedEndDate = endDate ? format(new Date(endDate), 'd MMM yyyy') : '';
  const totalNights = startDate && endDate ? differenceInDays(new Date(endDate), new Date(startDate)) : 1;

  const tourismFee = totalNights * 20;
  const roomTotal = parseInt(roomPrice, 10) * totalNights;
  const totalPrice = roomTotal + tourismFee;

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await axios.get(`https://api.aizahhospitality.com/api/keyview`);
        const keyData = response.data?.data?.[0];
        if (keyData) {
          setStripeApiKey(keyData.key);
          setKeyId(keyData._id);
        }
      } catch (error) {
        console.error("Error fetching API key:", error);
      }
    };

    fetchApiKey();
  }, []);

  const handleSubmitCOD = async () => {
    if (!billingData.firstName || !billingData.email || !billingData.phone) {
      alert('Please fill at least First Name, Email, and Phone fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://api.aizahhospitality.com/api/checkoutSubmit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
          price: roomPrice,
          roomname: roomname,
          tourismFee: tourismFee,
        }),
      });

      if (response.ok) {
        setBookingSuccess(true);
        setShowPopup(true);
      } else {
        alert('Failed to submit COD booking. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting COD booking:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStripePaymentSuccess = (paymentId: string) => {
    setPaymentID(paymentId);
    setBookingSuccess(true);
    setShowPopup(true);
  };

  const handleStripePaymentError = (message: string) => {
    alert(`Payment error: ${message}`);
  };

  const downloadBookingDetails = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();

      doc.setFontSize(24);
      doc.setTextColor(40, 53, 147);
      doc.text('AIZAH HOSPITALITY', 105, 20, { align: 'center' });
      doc.setFontSize(18);
      doc.text('BOOKING RECEIPT', 105, 30, { align: 'center' });

      doc.setDrawColor(200, 200, 200);
      doc.line(20, 40, 190, 40);

      doc.setFontSize(14);
      doc.setTextColor(40, 53, 147);
      doc.text('Guest Information:', 20, 50);
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Name: ${billingData.firstName} ${billingData.lastName}`, 20, 60);
      doc.text(`Email: ${billingData.email}`, 20, 70);
      doc.text(`Phone: ${billingData.phone}`, 20, 80);
      doc.text(`Address: ${billingData.streetAddress}, ${billingData.city}, ${billingData.zipCode}`, 20, 90);

      doc.setFontSize(14);
      doc.setTextColor(40, 53, 147);
      doc.text('Booking Details:', 20, 110);
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Room: ${roomname}`, 20, 120);
      doc.text(`Check-in: ${formattedStartDate}`, 20, 130);
      doc.text(`Check-out: ${formattedEndDate}`, 20, 140);
      doc.text(`Nights: ${totalNights}`, 20, 150);
      doc.text(`Guests: ${guests} (Adults: ${adults}, Children: ${children})`, 20, 160);

      doc.setFontSize(14);
      doc.setTextColor(40, 53, 147);
      doc.text('Payment Information:', 20, 180);
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Payment Method: ${paymentMethod === 'card' ? 'Credit Card' : 'Pay at Site'}`, 20, 190);
      if (paymentMethod === 'card') {
        doc.text(`Payment ID: ${paymentID}`, 20, 200);
      }
      doc.text(`Tourism Fee: AED ${tourismFee}`, 20, 220);
      doc.text(`Total Amount: AED ${totalPrice}`, 20, 230);

      doc.setFontSize(12);
      doc.setTextColor(102, 102, 102);
      doc.text('Thank you for your booking!', 105, 250, { align: 'center' });

      doc.save(`AizahBooking_${billingData.firstName}_${formattedStartDate}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate receipt. Please try again.');
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    router.push('/');
  };

  const stripePromise = loadStripe(stripeApiKey || 'pk_test_51RsKw4KIWDATgeBanxyTUrHxJCopXwexvP1I3U9o4OQULrDU5Y8JwCHp7NGYkzZRkHvxXxKAiZnqzzuW3BTATUBr00qnBQnbod');

  return (
    <>
      <HeaderTwo />
      <div className="max-w-12xl mx-auto px-4 py-10 flex flex-col items-center lg:items-start lg:flex-row gap-8 lg:ml-10 lg:mr-10">
        <div className="w-full flex-1 bg-white shadow-md p-6 rounded-2xl" style={{
          boxShadow: 'rgba(10, 10, 10, 0.22) 0px 3px 9px',
          border: '1px solid rgb(221, 221, 221)',
          borderRadius: '20px',
        }}>
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
                        onChange={(e) => setBillingData({ ...billingData, firstName: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="border border-[#3274BD] p-3 rounded-md w-full"
                        value={billingData.lastName}
                        onChange={(e) => setBillingData({ ...billingData, lastName: e.target.value })}
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="border border-[#3274BD] p-3 rounded-md w-full"
                        value={billingData.email}
                        onChange={(e) => setBillingData({ ...billingData, email: e.target.value })}
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        className="border border-[#3274BD] p-3 rounded-md w-full"
                        value={billingData.phone}
                        onChange={(e) => setBillingData({ ...billingData, phone: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Street Address"
                        className="border border-[#3274BD] p-3 rounded-md w-full sm:col-span-2"
                        value={billingData.streetAddress}
                        onChange={(e) => setBillingData({ ...billingData, streetAddress: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="City"
                        className="border border-[#3274BD] p-3 rounded-md w-full"
                        value={billingData.city}
                        onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Zip Code"
                        className="border border-[#3274BD] p-3 rounded-md w-full"
                        value={billingData.zipCode}
                        onChange={(e) => setBillingData({ ...billingData, zipCode: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
              stripeApiKey ? (
                <Elements stripe={stripePromise}>
                  <StripeCardForm
                    billingData={billingData}
                    totalPrice={totalPrice}
                    roomname={roomname}
                    formattedStartDate={formattedStartDate}
                    formattedEndDate={formattedEndDate}
                    children={children}
                    guests={guests}
                    totalNights={totalNights}
                    roomPrice={roomPrice}
                    tourismFee={tourismFee}
                    onPaymentSuccess={handleStripePaymentSuccess}
                    onPaymentError={handleStripePaymentError}
                    stripeApiKey={stripeApiKey}
                  />
                </Elements>
              ) : (
                <p>Loading payment gateway...</p>
              )
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

        <div className="lg:w-[32%] w-full max-lg:w-full max-lg:mr-4 rounded-2xl shadow-md bg-white px-6 py-10" style={{
          boxShadow: 'rgba(10, 10, 10, 0.22) 0px 3px 9px',
          border: '1px solid rgb(221, 221, 221)',
        }}>
          <h3 className="font-semibold text-xl mb-6">Summary</h3>
          <div className="flex justify-between mb-4">
            <p className="font-semibold">Room Type</p>
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
          <div className="flex justify-between mb-4">
            <p className="font-semibold">
              Tourism Fee
              <br />
              <span className="text-[12px]">({totalNights} night X 20 AED)</span>
            </p>
            <p>AED {tourismFee}</p>
          </div>
          <div className="flex justify-between mb-4 border-b pb-6">
            <p className="font-semibold">Room Price</p>
            <p>AED {roomTotal}</p>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <p>Total</p>
            <p>AED {totalPrice}</p>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full relative">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-800 hover:text-black"
            >
              <FaTimes className="text-xl" />
            </button>

            <div className="text-center">
              <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">
                {bookingSuccess ? 'Booking Confirmed!' : 'Payment Successful!'}
              </h2>
              <p className="mb-6">
                {paymentMethod === 'card'
                  ? `Your payment of AED ${totalPrice} has been processed successfully.`
                  : 'Your booking has been confirmed. Please pay at check-in.'}
              </p>

              <div className="bg-gray-100 p-4 rounded mb-6 text-left">
                <h3 className="font-semibold mb-2">Booking Details:</h3>
                <p>
                  <span className="font-medium">Room:</span> {roomname}
                </p>
                <p>
                  <span className="font-medium">Dates:</span> {formattedStartDate} to {formattedEndDate}
                </p>
                <p>
                  <span className="font-medium">Guests:</span> {guests} (Adults: {adults}, Children: {children})
                </p>
                <p>
                  <span className="font-medium">Total Nights:</span> {totalNights}
                </p>
                <p>
                  <span className="font-medium">Room Price:</span> AED {roomTotal}
                </p>
                <p>
                  <span className="font-medium">Tourism Fee:</span> AED {tourismFee}
                </p>
                <p>
                  <span className="font-medium">Total Amount:</span> AED {totalPrice}
                </p>
                {paymentMethod === 'card' && (
                  <p>
                    <span className="font-medium">Payment ID:</span> {paymentID}
                  </p>
                )}
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={downloadBookingDetails}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded"
                >
                  <FaDownload /> Download Receipt
                </button>
                <button 
                  onClick={closePopup} 
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Checkout;