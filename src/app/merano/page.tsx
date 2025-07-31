'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as Icon from 'phosphor-react'
import HeaderOne from '@/components/Header/HeaderOne'
import HeaderTwo from '@/components/Header/HeaderTwo'
import Footer from '@/components/Footer/Footer'
import tentData from '@/data/Tent.json'
import testimonialData from '@/data/Testimonial.json'
import { TentType } from '@/type/TentType'
import { useSearchParams } from 'next/navigation'
import dynamic from "next/dynamic"
const ExploreCamp = dynamic(() => import("@/components/Other/ExploreCamp"), { ssr: false })

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Rate from '@/components/Other/Rate'
import StickyBox from 'react-sticky-box';
import HeaderThree from '@/components/Header/HeaderThree'
import DemoBook from '@/components/DemoBook/DemoBook'

interface GuestType {
    adult: number;
    children: number;
    infant: number;
    pet: number;
}

const Merano = () => {
    const params = useSearchParams()
    let tentId = params.get('id')
    const [viewMoreDesc, setViewMoreDesc] = useState<boolean>(false)
    const [openDate, setOpenDate] = useState(false)
    const [openGuest, setOpenGuest] = useState(false)
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    if (tentId === null || undefined) {
        tentId = '1'
    }

    const tentMain = tentData.find(tent => tent.id === tentId) as TentType

    const [guest, setGuest] = useState<GuestType>(
        {
            adult: 0,
            children: 0,
            infant: 0,
            pet: 0
        }
    );

    const settings = {
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        touchThreshold: 100,
        swipe: true,
        swipeToSlide: true,
        draggable: true,
        useTransform: false,
        centerMode: true,
        centerPadding: '300px',
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '24px',
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '160px',
                }
            },
            {
                breakpoint: 1340,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
        ]
    };

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

    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    const images = [
      { src: "/images/allimg/rooms/Merano/5.png", alt: "Image 1" },
      { src: "/images/allimg/rooms/Merano/2.png", alt: "Image 2" },
      { src: "/images/allimg/rooms/Merano/3.png", alt: "Image 3" },
      { src: "/images/allimg/rooms/Merano/4.png", alt: "Image 4" },
      { src: "/images/allimg/rooms/Merano/1.png", alt: "Image 5" },
      { src: "/images/allimg/rooms/Merano/6.png", alt: "Image 5" },
    ];
  
    const handlePrev = () => {
      if (currentIndex !== null) {
        setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
      }
    };
  
    const handleNext = () => {
      if (currentIndex !== null) {
        setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
      }
    };
  
    const closeModal = () => setCurrentIndex(null);
    return (
        <>
           <HeaderTwo/>
            <div className='ten-detail  lg:ml-10 lg:mr-10' >
                {/* <HeaderOne /> */}
             
                {/* <HeaderThree /> */}
                <div className="content-detail pt-8 pb-2 lg:ml-[30px] ">
                     <div className="content-detail">
                    <div className="container">
                        <div className="flex max-lg:flex-col-reverse gap-y-10 justify-between">
                            <div className="content xl:w-3/3 lg:w-[100%] lg:pr-[15px] w-full">

                                <div className="flex items-center  gap-6">
                                    <div className="heading5">
                                    <h2 style={{color:'black'}}>Chic 1BHK Apartment in Business Bay – DAMAC | Sleeps 4</h2>
                                    </div>
                                  
                                </div>
                                <div className="flex items-center  gap-6">
                                    <div className="heading7">
                                    <h2 style={{color:'black'}}>4 Guests 
                                        <span
                                         style={{
                                         fontSize: '14px',
                                         marginLeft: '4px',
                                         marginRight: '4px',
                                         display: 'inline-block'
                                         }}
                                         aria-hidden="true">
                                         ·
                                         </span>1 Bedroom<span
                                         style={{
                                         fontSize: '14px',
                                         marginLeft: '4px',
                                         marginRight: '4px',
                                         display: 'inline-block'
                                         }}
                                         aria-hidden="true">
                                         ·
                                         </span>1 Bed
                                         <span
                                         style={{
                                         fontSize: '14px',
                                         marginLeft: '4px',
                                         marginRight: '4px',
                                         display: 'inline-block'
                                         }}
                                         aria-hidden="true">
                                         ·
                                         </span>  2 Bathrooms</h2>
                                    </div>
                                  
                                </div>
                                
                            </div>
                            </div>
                            </div>
                            </div>
                    <div className="container ">    
                        <div className="flex max-lg:flex-col-reverse gap-y-10 justify-between ">
                            <div className="content xl:w-3/3 lg:w-[100%] lg:pr-[15px] w-full">

                                {/* <div className="flex items-center  gap-6">
                                    <div className="heading3">
                                    <h1 style={{fontSize:'26px',color:'black'}}>Merano 1710 </h1>
                                    </div>
                                  
                                </div> */}
                                
                            </div>
                            </div>
                            </div>
                            </div>

                            {/* <div className="grid grid-cols-4 grid-rows-4 gap-2 hidden md:grid " style={{marginLeft:'20px',marginRight:'20px',height:'340px'}}>
  <div className="col-span-2 row-span-4">
    <img src="/images/allimg/rooms/1.png" alt="Image 1" className="w-full h-full object-cover "  style={{borderTopLeftRadius:'20px',borderBottomLeftRadius:'20px'}}/>
  </div>
  <div className="row-span-2 col-start-3">
    <img src="/images/allimg/rooms/2.png" alt="Image 2" className="w-full h-full object-cover " />
  </div>
  <div className="row-span-2 col-start-4">
    <img src="/images/allimg/rooms/3.png" alt="Image 3" className="w-full h-full object-cover " style={{borderTopRightRadius:'20px'}}/>
  </div>
  <div className="row-span-2 col-start-3 row-start-3">
    <img src="/images/allimg/rooms/4.png" alt="Image 4" className="w-full h-full object-cover " />
  </div>
  <div className="row-span-2 col-start-4 row-start-3">
    <img src="/images/allimg/rooms/5.png" alt="Image 5" className="w-full h-full object-cover" style={{borderBottomRightRadius:'20px'}}/>
  </div>
</div> */}

<div className="content-detail pt-2 w-full ">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row gap-y-10 justify-between w-full">
          <div className="content w-full lg:pr-[15px]">
            <div className="flex items-center gap-6 pb-4 w-full">
              <div className="heading6 w-full">
                <div
                  className="grid grid-cols-4 grid-rows-4 gap-2 hidden md:grid w-full"
                  style={{ height: "380px" }}
                >
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={
                        index === 0
                          ? "col-span-2 row-span-4"
                          : index === 1
                          ? "row-span-2 col-start-3"
                          : index === 2
                          ? "row-span-2 col-start-4"
                          : index === 3
                          ? "row-span-2 col-start-3 row-start-3"
                          : "row-span-2 col-start-4 row-start-3"
                      }
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        onClick={() => setCurrentIndex(index)}
                        className="w-full h-full object-cover cursor-pointer"
                        style={{
                          borderTopLeftRadius: index === 0 ? "20px" : "",
                          borderBottomLeftRadius: index === 0 ? "20px" : "",
                          borderTopRightRadius: index === 2 ? "20px" : "",
                          borderBottomRightRadius: (index >= 4 && index <= 13) ? "20px" : "",

                        }}
                      />
                    </div>
                  ))}
                </div>

<div className="hidden sm:flex justify-end -mt-[50px] mr-[10px]">
  <div className="inline-block bg-white border border-gray-300 rounded-[10px] px-3 py-1">
    <button
      className="flex items-center gap-2 text-[#32548e] text-[16px]"
      onClick={() => setCurrentIndex(0)}
    >
      <span className="fi fi-rr-grip-dots text-[24px]"></span>
      Show all photos
    </button>
  </div>
</div>
                {/* Modal */}
                {currentIndex !== null && (
  <div
    className="fixed inset-0 bg-transparent bg-opacity-80 z-50 flex justify-center items-center px-4"
    onClick={closeModal}
  >
    <div
      className="relative flex flex-col items-center"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Image */}
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="rounded-xl object-cover"
        style={{
          width: '100%',
          maxWidth: '400px',
          height: '400px',
        }}
      />

      {/* Prev/Next Buttons under the image */}
      <div className="flex justify-between items-center w-full max-w-[400px] mt-4 px-4">
        <button
          onClick={handlePrev}
          className="text-white text-lg font-bold bg-black bg-opacity-60 px-4 py-2 rounded-lg"
          style={{marginTop:'-150px'}}
        >
          &#8592; 
        </button>
        <button
          onClick={handleNext}
          className="text-white text-lg font-bold bg-black bg-opacity-60 px-4 py-2 rounded-lg"
          style={{marginTop:'-150px'}}
        >
           &#8594;
        </button>
      </div>

      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
      >
        &times;
      </button>
    </div>
  </div>
)}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

{/* Mobile screen */}
<div className="md:hidden flex overflow-x-auto gap-4 px-2">
  {images.map((image, index) => (
    <div
      key={index}
      className="min-w-[100%] max-w-[100%] flex-shrink-0"
      onClick={() => setCurrentIndex(index)}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-60 object-cover rounded-lg cursor-pointer"
      />
    </div>
  ))}
</div>
<div className="md:hidden flex justify-end -mt-[40px] mr-[10px]  ">
  <div className="inline-block bg-white border border-g ray-300 rounded-[10px] px-3 py-1">
    <button className="flex items-center gap-2 text-[#32548e] text-[12px]"   onClick={() => setCurrentIndex(0)}>
      <span className="fi fi-rr-grip-dots text-[18px]"></span>
      Show all photos
    </button>
  </div>
</div>

                <div className="list-img-detail overflow-hidden">
                    
                    {/* <Slider {...settings} className="h-full">
                        {tentMain.listImage.map((img, index) => (
                            <div className="bg-img w-full aspect-[4/3]" key={index}>
                                <Image
                                    src={img}
                                    width={3000}
                                    height={3000}
                                    alt={img}
                                    priority={true}
                                    className='w-full h-full object-cover rounded-[20px]'
                                />
                            </div>
                        ))}
                    </Slider> */}
                </div>
                
                <div className="content-detail lg:py-8 md:py-14 py-10">
                    <div className="container">
                        <div className="flex max-lg:flex-col-reverse gap-y-10 justify-between">
                            <div className="content xl:w-2/3 lg:w-[60%] lg:pr-[15px] w-full">

                            <div className="content-detail mb-4">
                    <div className="container">
                        <div className="flex max-lg:flex-col-reverse gap-y-10 justify-between">
                            <div className="content xl:w-3/3 lg:w-[100%] lg:pr-[15px] w-full">

                                <div className="flex items-center  gap-6">
                                    <div className="heading5">
                                    <h2 style={{color:'black'}}>Chic 1BHK Apartment in Business Bay – DAMAC | Sleeps 4</h2>
                                    </div>
                                  
                                </div>
                                <div className="flex items-center  gap-6">
                                    <div className="heading7">
                                    <h2 style={{color:'black'}}>4 Guests 
                                        <span
                                         style={{
                                         fontSize: '14px',
                                         marginLeft: '4px',
                                         marginRight: '4px',
                                         display: 'inline-block'
                                         }}
                                         aria-hidden="true">
                                         ·
                                         </span>1 Bedroom<span
                                         style={{
                                         fontSize: '14px',
                                         marginLeft: '4px',
                                         marginRight: '4px',
                                         display: 'inline-block'
                                         }}
                                         aria-hidden="true">
                                         ·
                                         </span>1 Bed
                                         <span
                                         style={{
                                         fontSize: '14px',
                                         marginLeft: '4px',
                                         marginRight: '4px',
                                         display: 'inline-block'
                                         }}
                                         aria-hidden="true">
                                         ·
                                         </span>  2 Bathrooms</h2>
                                    </div>
                                  
                                </div>
                                
                            </div>
                            </div>
                            </div>
                            </div>

<div className="content-detail   pt-2">
                    <div className="container">
                        <div className="flex max-lg:flex-col-reverse gap-y-10 justify-between">
                            <div className="content xl:w-3/3 lg:w-[100%] lg:pr-[15px] w-full">

                                <div className="flex items-center  gap-6 pb-4">
                                    <div className="heading6">
                                    <div className="heading6">Description</div>
                                    <div className="body2 text-variant mt-3" >Experience modern luxury in the heart of Dubai with our chic and spacious 1-bedroom apartment in Business Bay. Designed for both leisure and business travelers, this fully furnished home comfortably accommodates up to 4 guests with a plush bedroom and additional sofa beds in the living area.</div>
                                    <div className="body2 text-variant mt-3" >Whether you're in town for a few days or planning an extended stay, you'll love the two stylish washrooms, a fully equipped kitchen for home-cooked meals, and two private balconies with stunning city views—perfect for morning coffee or unwinding at sunset.</div>
                                    <div className="body2 text-variant mt-3" >Located just minutes from Downtown Dubai with easy access to the metro, enjoy seamless connectivity to the city's top attractions. After a day out, return to a cozy and elegant living space, complete with modern amenities and thoughtful touches to make your stay unforgettable.
</div>
                                    </div>
                                  
                                </div>
                                
                            </div>
                            </div>
                            </div>
                            </div>

<div className="heading6 text-center">Check-in: <span className='text-[#32548e] heading6'>3:00 PM </span>| Check-out:<span className='text-[#32548e] heading6'> 11:00 AM</span> </div>

<div className="content-detail  border-t border-outline pt-4 pb-4">
                    <div className="container">
                        
                        <div className="flex max-lg:flex-col-reverse gap-y-10 justify-between">
                            <div className="content xl:w-3/3 lg:w-[100%] lg:pr-[15px] w-full">

                                <div className="flex items-center  gap-6">
                                    
                                    <div className="heading5">
                                        
                                    <div className="heading6">Amenities and features</div>
                                    </div>
                                  
                                </div>
                                <div className="list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-4 mt-4">
  {/* Kitchen */}
  <div className="flex items-center gap-3">
    <span className="fi fi-rr-restaurant text-[24px] text-[#32548e]"></span>
    <div className="body2">Fully equipped kitchen & kitchenette</div>
  </div>

  {/* Pool */}
  <div className="flex items-center gap-3">
    <span className="fi fi-rr-swimmer text-[24px] text-[#32548e]"></span>
    <div className="body2">Swimming pool & beach access</div>
  </div>

  {/* Wifi */}
  <div className="flex items-center gap-3">
    <i className="fi fi-rr-wifi text-[24px] text-[#32548e]"></i>
    <div className="body2">Wifi</div>
  </div>

  {/* Parking */}
  <div className="flex items-center gap-3">
    <i className="fi fi-rr-parking-circle text-[24px] text-[#32548e]"></i>
    <div className="body2">Free parking on premises</div>
  </div>

  {/* TV */}
  <div className="flex items-center gap-3">
    <i className="fi fi-rr-computer text-[24px] text-[#32548e]"></i>
    <div className="body2">TV</div>
  </div>

  {/* AC */}
  <div className="flex items-center gap-3">
    <i className="fi fi-rr-air-conditioner text-[24px] text-[#32548e]"></i>
    <div className="body2">Air conditioning</div>
  </div>

  {/* First Aid */}
  <div className="flex items-center gap-3">
    <i className="fi fi-rr-doctor text-[24px] text-[#32548e]"></i>
    <div className="body2">First aid kit</div>
  </div>
  <div className="flex items-center gap-3">
    <i className="fi fi-rr-house-laptop text-[24px] text-[#32548e]"></i>
    <div className="body2">Dedicated workspace</div>
  </div>
  <div className="flex items-center gap-3">
      <i className="fi fi-rr-chart-area text-[24px] text-[#32548e]"></i>
    <div className="body2">Outdoor playing areas</div>
  </div>
  <div className="flex items-center gap-3">
      <i className="fi fi-rr-database text-[24px] text-[#32548e]"></i>
    <div className="body2">Iron & clothes storage
</div>
  </div>
</div>

                                
                            </div>
                            </div>
                            </div>
                            </div>

                                <div className="content-detail  border-outline pt-2">
                    <div className="container">
                        <div className="flex max-lg:flex-col-reverse gap-y-10 justify-between">
                            <div className="content xl:w-3/3 lg:w-[100%] lg:pr-[15px] w-full">
                            <div className="review-block lg:mt-10 mt-6 lg:pt-10 pt-6 border-t border-outline">
                                    <div className="flex items-center justify-between">
                                        <div className="heading5">Guest reviews</div>
                                    </div>
                                  <div className="list-review lg:pt-4 pt-2">
  {testimonialData.slice(0, 2).map((item, index) => (
   <div key={index} className="item flex flex-col sm:flex-row gap-5 md:mt-6 mt-4 w-full">
   <div className="review pb-6 border-b border-outline w-full">
     <div className="flex items-center gap-2">
       <div className="heading5">{item.name}</div>
       <Icon.CheckCircle weight="fill" className="text-success" />
     </div>
     <Rate currentRate={item.star} classname="mt-2" />
     <div
       className="body mt-2"
       style={{ textAlign: "justify", textJustify: "inter-word" }}
     >
       {item.description}
     </div>
   </div>
 </div>
 
  ))}
</div>

                                   
                                </div>
                                
                            </div>
                            </div>
                            </div>
                            </div>

                            </div>

                            <DemoBook/>
                            
                        </div>

                        {/* map */}
                        <div className="content-detail ">
  <div className="container">
    <div className="flex max-lg:flex-col-reverse gap-y-10 justify-between">
      <div className="w-full lg:pr-[15px]">
        <div className="heading5 mb-3">Map</div>
        <div className="relative">
          <iframe
            className="w-full h-[360px] rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.4045427290444!2d55.2603221!3d25.184828099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d05fc5c007%3A0x2244cfc2de3b602d!2sDAMAC%20MERANO%20TOWER%2CBusiness%20Bay!5e1!3m2!1sen!2sin!4v1753678222357!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</div>

                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default Merano