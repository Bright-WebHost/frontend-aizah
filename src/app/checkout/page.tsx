'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { format, differenceInDays } from 'date-fns';
import HeaderOne from '@/components/Header/HeaderOne';
import Footer from '@/components/Footer/Footer';
import axios from 'axios';
import { FaDownload, FaCheckCircle, FaTimes } from 'react-icons/fa';

const Checkout = () => {
  const router = useRouter();
  const [paymentID, setPaymentID] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [keyId, setKeyId] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

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
  const roomPrice = searchParams.get('price') || '0';
  const roomname = searchParams.get('roomname');

  const formattedStartDate = startDate ? format(new Date(startDate), 'd-MMM-yyyy') : '';
  const formattedEndDate = endDate ? format(new Date(endDate), 'd MMM yyyy') : '';
  const formattedRange = `${formattedStartDate} – ${formattedEndDate}`;

  const totalNights = startDate && endDate
    ? differenceInDays(new Date(endDate), new Date(startDate))
    : 1;

  // Calculate tourism fee (AED 20 per night)
  const tourismFee = totalNights * 20;
  // Calculate room total (price per night * number of nights)
  const roomTotal = parseInt(roomPrice) * totalNights;
  // Calculate total price (room total + tourism fee)
  const totalPrice = roomTotal + tourismFee;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/keyview`);
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
      price: roomPrice,
      roomname: roomname,
      tourismFee: tourismFee,
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
      
      const data = await res.json();
      setBookingDetails(data.data);
      return true;
    } catch (error) {
      console.error('Error sending booking:', error);
      return false;
    }
  };

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
      price: roomPrice,
      roomname: roomname,
      tourismFee: tourismFee,
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
      
      const data = await res.json();
      setBookingDetails(data.data);
      
      return true;
    } catch (error) {
      console.error('Error submitting COD booking:', error);
      return false;
    }
  };

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

    const orderAmount = totalPrice * 100; // Convert to paise

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
            setBookingSuccess(true);
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

  const handleSubmitCOD = async () => {
    if (!billingData.firstName || !billingData.email || !billingData.phone) {
      alert('Please fill at least First Name, Email, and Phone fields.');
      return;
    }
    
    setLoading(true);
    try {
      const success = await sendCODBookingToBackend();
      if (success) {
        setBookingSuccess(true);
        setShowPopup(true);
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

  const downloadBookingDetails = async () => {
    try {
      // Use bookingDetails if available, otherwise use form data
      const receiptData = bookingDetails || {
        fname: billingData.firstName,
        lname: billingData.lastName,
        email: billingData.email,
        phone: billingData.phone,
        checkin: formattedStartDate,
        checkout: formattedEndDate,
        guests: guests,
        night: totalNights,
        totalprice: totalPrice,
        price: roomPrice,
        roomname: roomname,
        paymentID: paymentMethod === 'card' ? paymentID : 'COD',
        tourismFee: tourismFee
      };

      // Dynamically import jsPDF
      const { jsPDF } = await import('jspdf');
      
      const doc = new jsPDF();
      
      // Add header
      doc.setFontSize(24);
      doc.setTextColor(40, 53, 147);
      doc.text('AIZAH HOSPITALITY', 105, 20, { align: 'center' });
      doc.setFontSize(18);
      doc.text('BOOKING RECEIPT', 105, 30, { align: 'center' });
      
      // Add line separator
      doc.setDrawColor(200, 200, 200);
      doc.line(20, 40, 190, 40);
      
      // Guest Information
      doc.setFontSize(14);
      doc.setTextColor(40, 53, 147);
      doc.text('Guest Information:', 20, 50);
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Name: ${receiptData.fname} ${receiptData.lname}`, 20, 60);
      doc.text(`Email: ${receiptData.email}`, 20, 70);
      doc.text(`Phone: ${receiptData.phone}`, 20, 80);
      doc.text(`Address: ${billingData.streetAddress}, ${billingData.city}, ${billingData.zipCode}`, 20, 90);
      
      // Booking Details
      doc.setFontSize(14);
      doc.setTextColor(40, 53, 147);
      doc.text('Booking Details:', 20, 110);
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Room: ${receiptData.roomname}`, 20, 120);
      doc.text(`Check-in: ${receiptData.checkin}`, 20, 130);
      doc.text(`Check-out: ${receiptData.checkout}`, 20, 140);
      doc.text(`Nights: ${receiptData.night}`, 20, 150);
      doc.text(`Guests: ${receiptData.guests} (Adults: ${adults || '0'}, Children: ${children || '0'})`, 20, 160);
      
      // Payment Information
      doc.setFontSize(14);
      doc.setTextColor(40, 53, 147);
      doc.text('Payment Information:', 20, 180);
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Payment Method: ${paymentMethod === 'card' ? 'Payment Success' : 'Pay at Site'}`, 20, 190);
      if (paymentMethod === 'card') {
        doc.text(`Payment ID: ${receiptData.paymentID}`, 20, 200);
      }
      // doc.text(`Room Price: ₹${receiptData.price} x ${receiptData.night} nights = ₹${parseInt(receiptData.price) * receiptData.night}`, 20, 210);
      doc.text(`Tourism Fee: AED ${receiptData.tourismFee}`, 20, 220);
      doc.text(`Total Amount: ₹${receiptData.totalprice}`, 20, 230);
      
      // Footer
      doc.setFontSize(12);
      doc.setTextColor(102, 102, 102);
      doc.text('Thank you for your booking!', 105, 250, { align: 'center' });
      
      // Save the PDF
      doc.save(`AizahBooking_${receiptData.fname}_${receiptData.checkin}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate receipt. Please try again.');
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    router.push('/');
  };

  return (
    <>
      <HeaderOne />
      <div>
        <div className="max-w-12xl mx-auto px-4 py-10 flex flex-col items-center lg:items-start lg:flex-row gap-8 lg:ml-10 lg:mr-10">
          {/* Billing Address Form */}
          <div
            className="w-full flex-1 bg-white shadow-md p-6 rounded-2xl"
            style={{
              boxShadow: 'rgba(10, 10, 10, 0.22) 0px 3px 9px',
              border: '1px solid rgb(221, 221, 221)',
              borderRadius: '20px',
            }}
          >
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

          {/* Booking Summary */}
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
                <p className="font-semibold">Tourism Fee</p>
                <p>AED {tourismFee}</p>
              </div>

 <div className="flex justify-between mb-4  border-b pb-6 ">
                <p className="font-semibold">Room Price</p>
                <p>AED {parseInt(roomPrice) * totalNights}</p>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <p>Total</p>
                <p>AED {totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
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
                  ? `Your payment of ₹${totalPrice} has been processed successfully.`
                  : 'Your booking has been confirmed. Please pay at check-in.'}
              </p>
              
              <div className="bg-gray-100 p-4 rounded mb-6 text-left">
                <h3 className="font-semibold mb-2">Booking Details:</h3>
                <p><span className="font-medium">Room:</span> {roomname}</p>
                <p><span className="font-medium">Dates:</span> {formattedStartDate} to {formattedEndDate}</p>
                <p><span className="font-medium">Guests:</span> {guests} (Adults: {adults || '0'}, Children: {children || '0'})</p>
                <p><span className="font-medium">Total Nights:</span> {totalNights}</p>
                <p><span className="font-medium">Room Price:</span> AED {parseInt(roomPrice) * totalNights}</p>
                <p><span className="font-medium">Tourism Fee:</span> AED {tourismFee}</p>
                <p><span className="font-medium">Total Amount:</span> AED {totalPrice}</p>
                {paymentMethod === 'card' && (
                  <p><span className="font-medium">Payment ID:</span> {paymentID}</p>
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
}

export default Checkout;