import React, { useState, useCallback, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import { addDays, differenceInDays, getMonth, isWithinInterval, parseISO } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import StickyBox from 'react-sticky-box';
import { useSearchParams } from 'next/navigation';
import testimonialData from '@/data/Testimonial.json';
import * as Icon from 'phosphor-react';
import { useRouter } from 'next/navigation';

interface GuestType {
    adult: number;
    children: number;
    infant: number;
    pet: number;
}

interface RangeData {
    startDate: string;
    endDate: string;
    price: number;
    _id: string;
}

interface MonthData {
    basePrice: number;
    ranges: RangeData[];
    _id: string;
}

interface PriceData {
    jan: MonthData;
    feb: MonthData;
    mar: MonthData;
    apr: MonthData;
    may: MonthData;
    jun: MonthData;
    jul: MonthData;
    aug: MonthData;
    sep: MonthData;
    oct: MonthData;
    nov: MonthData;
    dec: MonthData;
}

interface BookedDate {
    checkin: string;
    checkout: string;
}

interface BookingResponse {
    checkin: string;
    checkout: string;
    guests?: number;
    children?: number;
    price?: number;
    totalPrice?: number;
    roomname?: string;
}

const Merano29Book = () => {
    const router = useRouter();
    const params = useSearchParams();
    let tentId = params.get('id');
    const [openDate, setOpenDate] = useState(false);
    const [openGuest, setOpenGuest] = useState(false);
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: 'selection'
        }
    ]);
    const [priceData, setPriceData] = useState<PriceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bookedDates, setBookedDates] = useState<BookedDate[]>([]);

    const tentMain = testimonialData.find(tent => tent.id === tentId);
    const [guest, setGuest] = useState<GuestType>({
        adult: 1,
        children: 0,
        infant: 0,
        pet: 0
    });

    // Fetch price data from backend
    useEffect(() => {
        const fetchPriceData = async () => {
            try {
                const response = await fetch(`http://localhost:7000/api/priceView/6889c040d635154295de94f8`);
                if (!response.ok) {
                    throw new Error('Failed to fetch price data');
                }
                const data = await response.json();
                setPriceData(data.prices);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setLoading(false);
            }
        };

        fetchPriceData();
        const priceInterval = setInterval(() => {
            fetchPriceData();
        }, 5000);
        return () => clearInterval(priceInterval);
    }, []);

    // Fetch booked dates from backend and filter for "merano" room only
    const fetchBookedDates = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:7000/api/chekoutview`);
            if (!response.ok) {
                throw new Error('Failed to fetch booked dates');
            }
            const data = await response.json();
            if (data.data && Array.isArray(data.data)) {
                // Filter bookings for "merano" room only
                const meranoBookings = data.data.filter((booking: BookingResponse) => 
                    booking.roomname === "merano-2906"
                );
                
                const formattedDates = meranoBookings.map((booking: BookingResponse) => ({
                    checkin: new Date(booking.checkin).toISOString(),
                    checkout: new Date(booking.checkout).toISOString()
                }));
                setBookedDates(formattedDates);
            }
        } catch (err) {
            console.error('Error fetching booked dates:', err);
        }
    }, []);

    useEffect(() => {
        // Initial fetch
        fetchBookedDates();
        
        // Set up interval for periodic refresh (every 5 seconds)
        const bookedDatesInterval = setInterval(() => {
            fetchBookedDates();
        }, 5000);
        
        // Clean up interval on component unmount
        return () => clearInterval(bookedDatesInterval);
    }, [fetchBookedDates]);

    // Function to check if a date is booked
    const isDateBooked = (date: Date) => {
        return bookedDates.some(booking => {
            const checkin = new Date(booking.checkin);
            const checkout = new Date(booking.checkout);
            const checkinDate = new Date(checkin.getFullYear(), checkin.getMonth(), checkin.getDate());
            const checkoutDate = new Date(checkout.getFullYear(), checkout.getMonth(), checkout.getDate());
            const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            
            return currentDate >= checkinDate && currentDate <= checkoutDate;
        });
    };

    // Function to get price for specific date considering ALL custom ranges
    const getPriceForDate = (date: Date): number => {
        if (!priceData) return 200;
        
        // Create date-only object for comparison
        const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        
        // Check ALL months for any range that includes this date
        const monthKeys = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        
        for (const monthKey of monthKeys) {
            const monthData = priceData[monthKey as keyof PriceData];
            
            for (const range of monthData.ranges) {
                const startDate = parseISO(range.startDate);
                const endDate = parseISO(range.endDate);
                
                // Create date-only objects for comparison
                const rangeStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
                const rangeEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
                
                // Check if current date is within the range (inclusive)
                if (currentDate >= rangeStart && currentDate <= rangeEnd) {
                    return range.price;
                }
            }
        }
        
        // If no custom range found, get the base price for the month
        const month = getMonth(date);
        const monthKey = monthKeys[month] as keyof PriceData;
        return priceData[monthKey].basePrice;
    };

    // Custom day content renderer for DateRangePicker with price display
    const renderDayContent = (day: Date) => {
        const isBooked = isDateBooked(day);
        const price = getPriceForDate(day);
        
        return (
            <div 
                style={{
                    backgroundColor: isBooked ? '#F8F8F8' : 'transparent',
                    color: isBooked ? '#DEE2E4' : 'inherit',
                    pointerEvents: isBooked ? 'none' : 'auto',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
               
                <div style={{ 
                    fontSize: '14px', 
                    fontWeight: 'bold',
                    marginTop: '2px',
                    color: isBooked ? '#DEE2E4' : 'inherit'
                }}>
                    {day.getDate()}
                </div>
                 <div style={{ fontSize: '8px' ,color:'red'}}>  {price} AED</div>
            </div>
        );
    };

    // Calculate total price for selected date range with detailed breakdown
    const calculateTotalPrice = () => {
        if (!priceData) return { nights: 0, totalBeforeTaxes: 0, priceBreakdown: [] };

        let total = 0;
        let currentDate = new Date(state[0].startDate);
        const endDate = new Date(state[0].endDate);
        const priceBreakdown: {date: Date, price: number}[] = [];
        
        while (currentDate < endDate) {
            const price = getPriceForDate(currentDate);
            priceBreakdown.push({
                date: new Date(currentDate),
                price: price
            });
            total += price;
            currentDate = addDays(currentDate, 1);
        }

        const nights = differenceInDays(endDate, state[0].startDate);
        return { nights, totalBeforeTaxes: total, priceBreakdown };
    };

    const { nights, totalBeforeTaxes, priceBreakdown } = calculateTotalPrice();
    const nightlyRate = nights > 0 ? Math.round(totalBeforeTaxes / nights) : 0;

    const handleOpenDate = () => {
        setOpenDate(!openDate);
        setOpenGuest(false);
    };

    const handleOpenGuest = () => {
        setOpenGuest(!openGuest);
        setOpenDate(false);
    };

    const handleDateChange = (item: any) => {
        if (differenceInDays(item.selection.endDate, item.selection.startDate) < 1) {
            item.selection.endDate = addDays(item.selection.startDate, 1);
        }
        
        let currentDate = new Date(item.selection.startDate);
        const endDate = new Date(item.selection.endDate);
        let hasBookedDates = false;
        
        while (currentDate < endDate) {
            if (isDateBooked(currentDate)) {
                hasBookedDates = true;
                break;
            }
            currentDate = addDays(currentDate, 1);
        }
        
        if (!hasBookedDates) {
            setState([item.selection]);
        } else {
            alert('These dates are already booked. Please choose different dates.');
        }
    };

    const handleClickOutsideDatePopup: EventListener = useCallback((event) => {
        const targetElement = event.target as Element;
        if (openDate && !targetElement.closest('.form-date-picker')) {
            setOpenDate(false);
        }
    }, [openDate]);

    const handleClickOutsideGuestPopup: EventListener = useCallback((event) => {
        const targetElement = event.target as Element;
        if (openGuest && !targetElement.closest('.sub-menu-guest')) {
            setOpenGuest(false);
        }
    }, [openGuest]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideDatePopup);
        document.addEventListener('click', handleClickOutsideGuestPopup);
        return () => {
            document.removeEventListener('click', handleClickOutsideDatePopup);
            document.removeEventListener('click', handleClickOutsideGuestPopup);
        };
    }, [handleClickOutsideDatePopup, handleClickOutsideGuestPopup]);

    const increaseGuest = (type: keyof GuestType) => {
        setGuest((prevGuest) => ({
            ...prevGuest,
            [type]: prevGuest[type] + 1
        }));
    };

    const decreaseGuest = (type: keyof GuestType) => {
        if (guest[type] > 0) {
            setGuest((prevGuest) => ({
                ...prevGuest,
                [type]: prevGuest[type] - 1
            }));
        }
    };

    const handleBookNow = async () => {
        let currentDate = new Date(state[0].startDate);
        const endDate = new Date(state[0].endDate);
        let hasBookedDates = false;
        
        while (currentDate < endDate) {
            if (isDateBooked(currentDate)) {
                hasBookedDates = true;
                break;
            }
            currentDate = addDays(currentDate, 1);
        }
        
        if (hasBookedDates) {
            alert('These dates have just been booked. Please choose different dates.');
            await fetchBookedDates();
            return;
        }

        const startDate = state[0].startDate.toISOString();
        const endDateStr = state[0].endDate.toISOString();
        const guests = guest.adult;
        const children = guest.children;
        const price = nightlyRate;
        const totalPrice = totalBeforeTaxes;
        const roomname = "merano-2906";
      
        try {
            await fetchBookedDates();
            
            router.push(
                `/checkout?roomname=${roomname}&startDate=${startDate}&endDate=${endDateStr}&guests=${guests}&children=${children}&price=${price}&totalPrice=${totalPrice}`
            );
        } catch (error) {
            console.error('Booking error:', error);
            alert('Booking failed. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading price information...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="sidebar xl:w-1/3 lg:w-[40%] lg:pl-[45px] w-full">
            <StickyBox offsetTop={100} offsetBottom={20}>
                <div 
                    className="reservation bg-surface p-6 rounded-md" 
                    style={{
                        boxShadow: 'rgba(20, 20, 20, 0.32) 0px 6px 16px',
                        border: '1px solid rgb(221, 221, 221)',
                        borderRadius: '20px'
                    }}
                >
                    <div className="heading6 text-start">Add dates for prices</div>
                    <div className="date-sidebar-detail bg-white border mt-5" style={{borderRadius: '10px'}}>
                        <div className="relative cursor-pointer">
                            <div className="grid grid-cols-2 border-b border-separate" onClick={handleOpenDate}>
                                <div className="left pl-5 py-4 border-r border-separate">
                                    <div className="flex items-center gap-1">
                                        <Icon.CalendarBlank className='text-xl' />
                                        <div className="text-button" style={{fontSize: '12px', fontWeight: 'bolder'}}>Check In</div>
                                    </div>
                                    <div className="body2 mt-1" style={{ fontSize: '12px', fontWeight: 'bolder' }}>
                                        {state[0].startDate.toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </div>
                                </div>
                                <div className="left pr-5 py-4">
                                    <div className="flex items-center justify-end gap-1">
                                        <Icon.CalendarBlank className='text-xl' />
                                        <div className="text-button" style={{fontSize: '12px', fontWeight: 'bolder'}}>Check Out</div>
                                    </div>
                                    <div className="body2 mt-1 text-end" style={{ fontSize: '12px', fontWeight: 'bolder' }}>
                                        {state[0].endDate.toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </div>
                                </div>
                            </div>
                            {openDate && (
                                <DateRangePicker
                                    className={`form-date-picker box-shadow z-1 ${openDate ? 'open' : ''}`}
                                    onChange={handleDateChange}
                                    moveRangeOnFirstSelection={false}
                                    months={2}
                                    ranges={state}
                                    direction="horizontal"
                                    minDate={new Date()}
                                    disabledDay={isDateBooked}
                                    dayContentRenderer={renderDayContent}
                                />
                            )}
                        </div>
                        <div className="guest px-5 py-4 relative cursor-pointer">
                            <div className="flex items-center justify-between" onClick={handleOpenGuest}>
                                <div>
                                    <div className="flex items-center gap-1">
                                        <Icon.Users className='text-xl' />
                                        <div className="text-button" style={{fontSize: '12px', fontWeight: 'bolder'}}>Guest</div>
                                    </div>
                                    <div className="body2 mt-1" style={{fontSize: '12px', fontWeight: 'bolder'}}>
                                        {guest.adult} adults - {guest.children} children
                                    </div>
                                </div>
                                <Icon.CaretDown className='text-2xl' />
                            </div>
                            {openGuest && (
                                <div className={`sub-menu-guest bg-white rounded-b-xl overflow-hidden p-5 absolute top-full -mt-px left-0 w-full box-shadow ${openGuest ? 'open' : ''}`}>
                                    <div className="item flex items-center justify-between pb-4 border-b border-outline">
                                        <div className="left">
                                            <p className="text-button" style={{fontSize: '12px', fontWeight: 'bolder'}}>Adults</p>
                                            <div className="caption1 text-variant1" style={{fontSize: '12px', fontWeight: 'bolder'}}>(12 Years+)</div>
                                        </div>
                                        <div className="right flex items-center gap-5">
                                            <div
                                                className={`minus w-8 h-8 flex items-center justify-center rounded-full border border-outline duration-300 ${guest.adult === 0 ? 'opacity-[0.4] cursor-default' : 'cursor-pointer hover:bg-black hover:text-white'}`}
                                                onClick={() => decreaseGuest('adult')}
                                            >
                                                <Icon.Minus weight='bold' />
                                            </div>
                                            <div className="text-title">{guest.adult}</div>
                                            <div
                                                className="plus w-8 h-8 flex items-center justify-center rounded-full border border-outline cursor-pointer duration-300 hover:bg-black hover:text-white"
                                                onClick={() => increaseGuest('adult')}
                                            >
                                                <Icon.Plus weight='bold' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item flex items-center justify-between pb-4 pt-4 border-b border-outline">
                                        <div className="left">
                                            <p className="text-button" style={{fontSize: '12px', fontWeight: 'bolder'}}>Children</p>
                                            <div className="caption1 text-variant1">(2-12 Years)</div>
                                        </div>
                                        <div className="right flex items-center gap-5">
                                            <div
                                                className={`minus w-8 h-8 flex items-center justify-center rounded-full border border-outline duration-300 ${guest.children === 0 ? 'opacity-[0.4] cursor-default' : 'cursor-pointer hover:bg-black hover:text-white'}`}
                                                onClick={() => decreaseGuest('children')}
                                            >
                                                <Icon.Minus weight='bold' />
                                            </div>
                                            <div className="text-title">{guest.children}</div>
                                            <div
                                                className="plus w-8 h-8 flex items-center justify-center rounded-full border border-outline cursor-pointer duration-300 hover:bg-black hover:text-white"
                                                onClick={() => increaseGuest('children')}
                                            >
                                                <Icon.Plus weight='bold' />
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="button-main w-full text-center"
                                        onClick={() => setOpenGuest(false)}
                                    >
                                        Done
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="price-block mt-5">
                        <div className="heading6 text-start">Price Details</div>
                        <div className="list mt-2">
                            {/* Show detailed price breakdown */}
                            {priceBreakdown.map((day, index) => (
                                <div key={index} className="flex items-center justify-between py-1">
                                    <div className="text-button" style={{fontSize: '12px', fontWeight: 'bolder'}}>
                                        {day.date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                    </div>
                                    <div className="text-button" style={{fontSize: '12px', fontWeight: 'bolder'}}>
                                        AED {day.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="total-block mt-5 pt-5 border-t border-outline flex items-center justify-between">
                            <div className="heading6">Total Price</div>
                            <div className="heading5">AED {totalBeforeTaxes}</div>
                        </div>
                        <div className="button-main w-full text-center mt-5">
                            <button onClick={handleBookNow}>Book Now</button>
                        </div>
                        <a
                            href="https://wa.me/918197723683"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="button-main w-full text-center mt-5 bg-[#DDCE74] hover:bg-success text-white">
                                Enquire on WhatsApp
                            </div>
                        </a>
                    </div>
                </div>
            </StickyBox>
        </div>
    );
};

export default Merano29Book;