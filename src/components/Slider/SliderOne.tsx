import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import * as Icon from 'phosphor-react'
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface GuestType {
    adult: number;
    children: number;
    infant: number;
    pet: number;
}

const SliderOne = () => {
    const router = useRouter()
    const [openDate, setOpenDate] = useState(false)
    const [openGuest, setOpenGuest] = useState(false)
    const [location, setLocation] = useState('')
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    const [guest, setGuest] = useState<GuestType>(
        {
            adult: 0,
            children: 0,
            infant: 0,
            pet: 0
        }
    );

    const handleOpenDate = () => {
        setOpenDate(!openDate)
        setOpenGuest(false)
    }

    const handleOpenGuest = () => {
        setOpenGuest(!openGuest)
        setOpenDate(false)
    }

    // Check if the click event occurs outside the popup.
    const handleClickOutsideDatePopup: EventListener = useCallback((event) => {
        // Cast event.target to Element to use the closest method.
        const targetElement = event.target as Element;

        if (openDate && !targetElement.closest('.form-date-picker')) {
            setOpenDate(false)
        }
    }, [openDate]);

    // Check if the click event occurs outside the popup.
    const handleClickOutsideGuestPopup: EventListener = useCallback((event) => {
        // Cast event.target to Element to use the closest method.
        const targetElement = event.target as Element;

        if (openGuest && !targetElement.closest('.sub-menu-guest')) {
            setOpenGuest(false)
        }
    }, [openGuest]);

    useEffect(() => {
        // Add a global click event to track clicks outside the popup.
        document.addEventListener('click', handleClickOutsideDatePopup);
        document.addEventListener('click', handleClickOutsideGuestPopup);

        // Cleanup to avoid memory leaks.
        return () => {
            document.removeEventListener('click', handleClickOutsideDatePopup);
            document.removeEventListener('click', handleClickOutsideGuestPopup);
        };
    }, [handleClickOutsideDatePopup, handleClickOutsideGuestPopup])


    // Increase number
    const increaseGuest = (type: keyof GuestType) => {
        setGuest((prevGuest) => ({
            ...prevGuest,
            [type]: prevGuest[type] + 1
        }));
    };

    // Decrease number
    const decreaseGuest = (type: keyof GuestType) => {
        if (guest[type] > 0) {
            setGuest((prevGuest) => ({
                ...prevGuest,
                [type]: prevGuest[type] - 1
            }));
        }
    };

    const handleSearch = () => {
        router.push(`/camp/topmap-grid?location=${location}&startDate=${state[0].startDate.toLocaleDateString()}&endDate=${state[0].endDate.toLocaleDateString()}&adult=${guest.adult}&children=${guest.children}&infant=${guest.infant}&pet=${guest.pet}`)
    }

    return (
        <>
           <div className="slider-block style-one relative h-[620px] " style={{marginTop:'-9px'}}>
  <div className="bg-img absolute top-0 left-0 w-full h-full">
    {/* Background Image */}
    <Image
      src={'/images/allimg/banner.webp'}
      width={4000}
      height={3000}
      alt="slider"
      priority={true}
      className="w-full h-full object-cover"
    />

    {/* Black Tint Overlay */}
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10"></div>
  </div>

  {/* Content Block */}
  <div className="container py-[196px] relative z-20">
    <div className="content w-full">
      <div className="heading flex-col items-center justify-center">
        <div className="heading2 text-white text-center">
          A Standard of Luxury Living Awaits You in Dubai with Aizah Hospitality
        </div>
        <div className="heading6 text-white text-center mt-3">
          Elegant Rooms in the Heart of Dubai
        </div>
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default SliderOne