'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as Icon from 'phosphor-react'
import HeaderOne from '@/components/Header/HeaderOne'
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
import RevaBook from '@/components/RevaBook/RevaBook'

interface GuestType {
    adult: number;
    children: number;
    infant: number;
    pet: number;
}

const Reva   = () => {
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
      { src: "/images/allimg/rooms/Reva/5.png", alt: "Image 1" },
      { src: "/images/allimg/rooms/Reva/1.png", alt: "Image 2" },
      { src: "/images/allimg/rooms/Reva/2.png", alt: "Image 3" },
      { src: "/images/allimg/rooms/Reva/8.png", alt: "Image 4" },
      { src: "/images/allimg/rooms/Reva/6.png", alt: "Image 5" },
      { src: "/images/allimg/rooms/Reva/4.png", alt: "Image 5" },
      { src: "/images/allimg/rooms/Reva/7.png", alt: "Image 5" },
      { src: "/images/allimg/rooms/Reva/3.png", alt: "Image 5" },
      { src: "/images/allimg/rooms/Reva/9.png", alt: "Image 5" },
      { src: "/images/allimg/rooms/Reva/10.png", alt: "Image 5" },
      { src: "/images/allimg/rooms/Reva/11.png", alt: "Image 5" },
      { src: "/images/allimg/rooms/Reva/13.png", alt: "Image 5" },
      { src: "/images/allimg/rooms/Reva/12.png", alt: "Image 5" },
      { src: "/images/allimg/rooms/Reva/9.png", alt: "Image 5" },
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
            <div className='ten-detail  lg:ml-10 lg:mr-10' >
                <HeaderOne />
                {/* <HeaderThree /> */}
                <div className="content-detail pt-8 pb-2 lg:ml-[30px] ">
                    <div className="container">
                        <div className="flex max-lg:flex-col-reverse gap-y-10 justify-between">
                            <div className="content xl:w-3/3 lg:w-[100%] lg:pr-[15px] w-full">

                                <div className="flex items-center  gap-6">
                                    <div className="heading3">
                                    <h1 style={{fontSize:'26px',color:'black'}}>Reva 1811</h1>
                                    </div>
                                  
                                </div>
                                
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
      onClick={() => setCurrentIndex(index)} // ← this line triggers modal
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
{/* Mobile screen */}











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
                                    <h2 style={{color:'black'}}> Aesthetic 2BHK Apartment Near Dubai Mall | Boho-Chic Living in Business Bay</h2>
                                    </div>
                                  
                                </div>
                                <div className="flex items-center  gap-6">
                                    <div className="heading7">
                                    <h2 style={{color:'black'}}>2 Guests 
                                        <span
                                         style={{
                                         fontSize: '14px',
                                         marginLeft: '4px',
                                         marginRight: '4px',
                                         display: 'inline-block'
                                         }}
                                         aria-hidden="true">
                                         ·
                                         </span>2 Bedroom<span
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
                                         </span>  1 Bathrooms</h2>
                                    </div>
                                  
                                </div>
                                
                            </div>
                            </div>
                            </div>
                            </div>
                                {/* <div className="flex items-center justify-between gap-6">
                                    <div className="heading3">{tentMain.name}</div>
                                    <div className="share w-12 h-12 rounded-full bg-white border border-outline flex-shrink-0 flex items-center justify-center cursor-pointer duration-300 hover:bg-black hover:text-white">
                                        <Icon.ShareNetwork className='text-2xl' />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 flex-wrap gap-y-1 mt-2">
                                    <div className="flex items-center gap-1.5">
                                        <Icon.MapPin className='text-variant1' />
                                        <span className='text-variant1 capitalize'>{tentMain.location}</span>
                                    </div>
                                    <Link href={`http://maps.google.com/?q=${tentMain.locationMap.lat},${tentMain.locationMap.lng}`} target='_blank' className='text-primary underline'>Show on map</Link>
                                </div> */}



<div className="content-detail border-t border-outline pt-2">
                    <div className="container">
                        <div className="flex max-lg:flex-col-reverse gap-y-10 justify-between">
                            <div className="content xl:w-3/3 lg:w-[100%] lg:pr-[15px] w-full">

                                <div className="flex items-center  gap-6 pb-4">
                                    <div className="heading6">
                                    <div className="heading6">Description</div>
                                    <div className="body2 text-variant mt-3" >Description: Discover a beautifully designed bohemian-style 2-bedroom apartment in the vibrant Business Bay, Dubai. This elegant home offers a perfect blend of modern luxury and natural textures, ideal for those who appreciate artistic interiors and urban convenience.</div>
                                    {/* <div className="heading6 mt-6">The space</div> */}
                                    <div className="body2 text-variant mt-3"  >Property Highlights:
                                          <ul>
                                    <li className='list-disc body2 ml-5'>Location: Prime Business Bay, just minutes from Downtown Dubai, Dubai Mall, and Burj Khalifa</li>
                                    <li className='list-disc body2 ml-5'>Style: Boho-inspired with earthy tones, handcrafted décor, and natural textures</li>
                                    <li className='list-disc body2 ml-5'>Views: Floor-to-ceiling windows with breathtaking canal and Dubai skyline vistas</li>
                                    <li className='list-disc body2 ml-5'>Capacity: Sleeps up to 6 guests comfortably</li>
                                    
                                </ul>
                                    </div>






                             
                                    <div className="body2 text-variant mt-3"  >The Space:
                                         <div className="body2 text-variant mt-3" >Step into a warm, inviting atmosphere filled with neutral colors and natural materials that create a relaxed bohemian vibe. The open-plan layout offers plenty of natural light, enhancing the spacious living areas.</div>
                                       <div className="body2 text-variant mt-3"  >Living Room:</div>
                                          <ul>
                                    <li className='list-disc body2 ml-5'>Spacious and stylish with plush seating, rattan accents, and cozy rugs</li>
                                    <li className='list-disc body2 ml-5'>Smart TV and high-speed WiFi – ideal for work or entertainment</li>
                                    <li className='list-disc body2 ml-5'>Private balcony with comfortable seating overlooking stunning city views</li>
                                    
                                </ul>
                                       <div className="body2 text-variant mt-3"  >Kitchen & Dining:</div>
                                          <ul>
                                    <li className='list-disc body2 ml-5'>Fully equipped modern kitchen featuring fridge, oven, microwave, stovetop, dishwasher, and more</li>
                                    <li className='list-disc body2 ml-5'>Boho-inspired dining area for 4 guests, perfect for intimate meals</li>
                                    
                                </ul>



                                 <div className="body2 text-variant mt-3"  >Bedrooms:</div>
                                 <div className="body2 text-variant mt-3"  >Master Bedroom</div>
                                          <ul>
                                    <li className='list-disc body2 ml-5'>King-size bed with luxurious bedding</li>
                                    <li className='list-disc body2 ml-5'>Built-in wardrobes for ample storage</li>
                                    <li className='list-disc body2 ml-5'>En-suite bathroom with spa-like rainfall shower</li>
                                    
                                </ul>
                                 <div className="body2 text-variant mt-3"  >Second Bedroom</div>
                                          <ul>
                                    <li className='list-disc body2 ml-5'>Queen-size bed with soft linens and calming décor</li>
                                    <li className='list-disc body2 ml-5'>Large windows with scenic city views</li>
                                    <li className='list-disc body2 ml-5'>Built-in wardrobes for extra storage</li>
                                    
                                </ul>
                                 <div className="body2 text-variant mt-3"  >Bathrooms:</div>
                                          <ul>
                                    <li className='list-disc body2 ml-5'>Two elegant bathrooms with modern vanities and premium fittings</li>
                                  
                                    
                                </ul>
                                    </div>


                                    


                                     {/* <div className="body2 text-variant mt-3"  >Property Highlights:
                                          <ul>
                                    <li className='list-disc body2 ml-5'>Location: Prime Business Bay, just minutes from Downtown Dubai, Dubai Mall, and Burj Khalifa</li>
                                    
                                </ul>
                                    </div>
                              
                                    <div className="body2 text-variant mt-3 border-t border-outline "  >Inside, the space features a sleek, modern design with a fully equipped kitchen, high-speed WiFi, smart TV, washing machine, and a dedicated workspace — making it ideal for both leisure and business travelers.</div> */}
                                    </div>
                                    
                                  
                                </div>
                               <div className="heading6 text-center">Check-in: <span className='text-[#32548e] heading6'>3:00 PM </span>| Check-out:<span className='text-[#32548e] heading6'> 11:00 AM</span> </div>

                                
                            </div>
                            </div>
                            </div>
                            </div>




















                                {/* <div className="desc lg:mt-5 mt-6 lg:pt-5  border-t border-outline">
                                    <div className="heading5">Description</div>
                                    <div className="body2 text-variant1 mt-3">Enjoy a stylish experience at this centrally located place with a peaceful and luxurious skyscraper view. Particularly fits for both family and party vibe people. You will thank us later for the area and location for sure. If u really want the feel of luxurious space and walking distance to metro station , please don’t miss this place.</div>
                                    <div className={`body2 text-variant1 ${viewMoreDesc ? '' : 'hidden'}`}>{tentMain.description}</div>
                                    <div
                                        className="text-button-sm underline inline-block duration-300 cursor-pointer mt-3 hover:text-primary"
                                        onClick={() => setViewMoreDesc(!viewMoreDesc)}
                                    >

                                        {viewMoreDesc ? (
                                            <>
                                                Hidden less
                                            </>
                                        ) : (
                                            <>
                                                View More
                                            </>
                                        )}
                                    </div>
                                </div> */}
                                {/* <div className="rule lg:mt-8 mt-5">
                                    <div className="heading5">House Rules</div>
                                    <div className="list xl:grid grid-cols-3 xl:gap-16 max-xl:flex max-xl:flex-wrap max-xl:gap-8 max-xl:gap-y-2 xl:gap-y-2 mt-4">
                                        <div className="flex items-center gap-2">
                                            <Icon.Clock className='text-2xl' />
                                            <div className="body2">Check-in: From 1pm</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Icon.Confetti className='text-2xl' />
                                            <div className="body2">Parties and events</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Icon.PawPrint className='text-2xl' />
                                            <div className="body2">Pet allowed</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Icon.Alarm className='text-2xl' />
                                            <div className="body2">Check-out: By 11am</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Icon.ShieldSlash className='text-2xl' />
                                            <div className="body2">No smoking</div>
                                        </div>
                                    </div>
                                </div> */}


                                


<div className="content-detail  border-t border-outline pt-4 pb-4">
                    <div className="container">
                        <div className="flex max-lg:flex-col-reverse gap-y-10 justify-between">
                            <div className="content xl:w-3/3 lg:w-[100%] lg:pr-[15px] w-full">

                                <div className="flex items-center  gap-6">
                                    <div className="heading5">
                                    <div className="heading6">Amenities and features</div>
                                    </div>
                                  
                                </div>
                                <div className="list grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-2">



                                      {/* Pool */}
  <div className="flex items-center gap-3">
    <span className="fi fi-rr-swimmer text-[24px] text-[#32548e]"></span>
    <div className="body2">Swimming pool with sun deck</div>
  </div>
  <div className="flex items-center gap-3">
    <span className="fi fi-rr-time-twenty-four text-[24px] text-[#32548e]"></span>
    <div className="body2">24/7 security and concierge services</div>
  </div>

  {/* Kitchen */}
  <div className="flex items-center gap-3">
    <span className="fi fi-rr-restaurant text-[24px] text-[#32548e]"></span>
    <div className="body2">Kitchen</div>
  </div>


  {/* Wifi */}
  <div className="flex items-center gap-3">
    <i className="fi fi-rr-wifi text-[24px] text-[#32548e]"></i>
    <div className="body2">High-speed WiFi</div>
  </div>

  {/* Parking */}
  <div className="flex items-center gap-3">
    <i className="fi fi-rr-parking-circle text-[24px] text-[#32548e]"></i>
    <div className="body2">Covered parking space</div>
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
    <i className="fi fi-rr-gym text-[24px] text-[#32548e]"></i>
    <div className="body2">Fully equipped gym with modern gear</div>
  </div>
</div>


                                
                            </div>
                            </div>
                            </div>
                            </div>




                                {/* <div className="feature lg:mt-10 mt-6 lg:pt-10 pt-6 border-t border-outline">
                                    <div className="heading5">Amenities and features</div>
                                    <div className="list flex justify-between w-full mt-4">
                                        <div className='w-fit'>
                                            <div className="text-title">Services:</div>
                                            <div className="list flex flex-col gap-2 mt-3">
                                                {tentMain.services.map((item, index) => (
                                                    <div key={index} className="item capitalize">
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='w-fit'>
                                            <div className="text-title">Amenities:</div>
                                            <div className="list flex flex-col gap-2 mt-3">
                                                {tentMain.amenities.map((item, index) => (
                                                    <div key={index} className="item capitalize">
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className='w-fit max-sm:hidden'>
                                            <div className="text-title">Activities:</div>
                                            <div className="list flex flex-col gap-2 mt-3">
                                                {tentMain.activities.map((item, index) => (
                                                    <div key={index} className="item capitalize">
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                      <div className="rule lg:mt-8 mt-5">
                                    <div className="heading5">Amenities and features</div>
                                    <div className="list xl:grid grid-cols-3 xl:gap-16 max-xl:flex max-xl:flex-wrap max-xl:gap-8 max-xl:gap-y-2 xl:gap-y-2 mt-4">
                                        <div className="flex items-center gap-2">
                                            <img src='/images/allimg/icons/kitchen.png'  />
                                            <div className="body2">Kitchen</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                        <img src='/images/allimg/icons/workspace.png'  />
                                            <div className="body2">Dedicated workspace</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                              <img src='/images/allimg/icons/pool.png'  />
                                            <div className="body2">Pool</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                        <img src='/images/allimg/icons/washing.png'  />
                                            <div className="body2">Washing machine</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                        <img src='/images/allimg/icons/Wifi.png'  />
                                            <div className="body2">Wifi</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                        <img src='/images/allimg/icons/parking.png'  />
                                            <div className="body2"> parking </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                        <img src='/images/allimg/icons/TV.png'  />
                                            <div className="body2">TV</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                        <img src='/images/allimg/icons/Air.png'  />
                                            <div className="body2">Air conditioning</div>
                                        </div>
                                        
                                    </div>
                                </div>
                                </div> */}


                                {/* <div className="explore-block lg:mt-10 mt-6 lg:pt-10 pt-6 border-t border-outline">
                                    <div className="heading5">Explore Camp</div>
                                    <div className="bg-img rounded-2xl max-sm:h-[240px] relative overflow-hidden sm:aspect-[2/1] mt-4">
                                        <ExploreCamp />
                                        <div className="icon-block bg-white sm:w-20 w-16 sm:h-20 h-16 rounded-full flex items-center justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 duration-300">
                                            <Image
                                                src={'/images/other/icon-360.png'}
                                                width={400}
                                                height={400}
                                                alt='icon'
                                                priority={true}
                                                className='sm:w-12 w-10 sm:h-12 h-10'
                                            />
                                        </div>
                                    </div>
                                </div> */}


{/* <div className="content-detail border-t border-outline pt-4">
  <div className="container">
    <div className="flex flex-col lg:flex-row-reverse gap-y-10 justify-between">
      
      <div className="content w-full lg:w-[100%] lg:pr-[15px]">
        <div className="flex flex-col gap-4">
          
          <div className="heading6">Dates & Availability</div>

          <div className="bg-img relative w-full mt-1 z-0">
            <DateRangePicker
              className="form-date-picker style-detail w-full border border-outline rounded-none open"
              onChange={item => setState([item.selection] as any)}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={state}
              direction="horizontal"
            />
          </div>

        </div>
      </div>

    </div>
  </div>
</div> */}





                                {/* <div className="date lg:mt-10 mt-6 lg:pt-10 pt-6 border-t border-outline">
                                    <div className="heading5">Dates & Availability</div>
                                    <div className="bg-img relative mt-1">
                                        <DateRangePicker
                                            className={`form-date-picker style-detail w-full border border-outline rounded-none open`}
                                            onChange={item => setState([item.selection] as any)}
                                            
                                            moveRangeOnFirstSelection={false}
                                            months={2}
                                            ranges={state}
                                            direction="horizontal"
                                        />
                                    </div>
                                </div> */}





                                {/* <div className="map lg:mt-10 mt-6 lg:pt-10 pt-6 border-t border-outline">
                                    <div className="heading5">Map</div>
                                    <div className="bg-img relative mt-3">
                                        <iframe
                                            className='w-full h-[360px]'
                                            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d352341.87716351956!2d55.22748795!3d25.076022449999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e1!3m2!1sen!2sin!4v1743760223023!5m2!1sen!2sin`}
                                        ></iframe>
                                    </div>
                                </div> */}
                                {/* <div className="review-block lg:mt-10 mt-6 lg:pt-10 pt-6 border-t border-outline">
                                    <div className="flex items-center justify-between">
                                        <div className="heading5">Guest reviews</div>
                                        <Link href={'#form-review'} className='text-button-sm px-5 py-2 rounded-lg border border-black duration-300 hover:bg-primary hover:text-white hover:border-primary'>Add Reviews</Link>
                                    </div>
                                    <div className="list-review lg:pt-4 pt-2">
                                        {testimonialData.slice(0, 2).map((item, index) => (
                                            <div key={index} className="item flex gap-5 md:mt-6 mt-4">
                                                <div className="avatar w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={item.avatar}
                                                        width={400}
                                                        height={400}
                                                        alt={item.name}
                                                        priority={true}
                                                        className='w-full h-full object-cover'
                                                    />
                                                </div>
                                                <div className='review pb-6 border-b border-outline'>
                                                    <div className="flex items-center gap-2">
                                                        <div className="heading5">{item.name}</div>
                                                        <Icon.CheckCircle weight='fill' className='text-success' />
                                                    </div>
                                                    <div className="date mt-1 text-variant2">{item.date}</div>
                                                    <Rate currentRate={item.star} classname='mt-2' />
                                                    <div className="body2 mt-2">{item.description}</div>
                                                  
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                   
                                </div> */}




                                <div className="content-detail  border-outline pt-2">
                    <div className="container">
                        <div className="flex max-lg:flex-col-reverse gap-y-10 justify-between">
                            <div className="content xl:w-3/3 lg:w-[100%] lg:pr-[15px] w-full">
                            <div className="review-block lg:mt-10 mt-6 lg:pt-10 pt-6 border-t border-outline">
                                    <div className="flex items-center justify-between">
                                        <div className="heading5">Guest reviews</div>
                                        <Link href={'#form-review'} className='text-button-sm px-5 py-2 rounded-lg border duration-300 hover:bg-[#f6dd49] hover:text-white hover:border-white bg-[#32548e] text-white'>Add Reviews</Link>
                                    </div>
                                  <div className="list-review lg:pt-4 pt-2">
  {testimonialData.slice(0, 2).map((item, index) => (
   <div key={index} className="item flex flex-col sm:flex-row gap-5 md:mt-6 mt-4 w-full">
  <div className="avatar w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0">
  <Image
    src={item.avatar}
    width={400}
    height={400}
    alt={item.name}
    priority={true}
    className="w-full h-full object-cover"
  />
</div>

   <div className="review pb-6 border-b border-outline w-full">
     <div className="flex items-center gap-2">
       <div className="heading5">{item.name}</div>
       <Icon.CheckCircle weight="fill" className="text-success" />
     </div>
     <div className="date mt-1 text-variant2">{item.date}</div>
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



                                
{/* <div className="content-detail border-t">
                    <div className="container">
                        <div className="flex max-lg:flex-col-reverse gap-y-10 justify-between">
                            <div className="content xl:w-3/3 lg:w-[100%] lg:pr-[15px] w-full">

                                <div className="flex items-center  gap-6">
                                    <div className="heading6">
                                    <div className="heading5">Map</div>
                                    <div className="body2 text-variant mt-3" ><div className="bg-img relative mt-3">
                                        <iframe
                                            className='w-full h-[360px]'
                                            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d352341.87716351956!2d55.22748795!3d25.076022449999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e1!3m2!1sen!2sin!4v1743760223023!5m2!1sen!2sin`}
                                        ></iframe>
                                    </div></div>
                                    </div>
                                  
                                </div>
                               
                                
                            </div>
                            </div>
                            </div>
                            </div> */}

                            
                            </div>

<RevaBook/>
                            {/* <DemoBook/> */}
                            {/* <div className="sidebar xl:w-1/3 lg:w-[40%] lg:pl-[45px] w-full">
                                <StickyBox offsetTop={100} offsetBottom={20} >
                                    <div className="reservation bg-surface p-6 rounded-md"  style={{boxShadow:' rgba(20, 20, 20, 0.32) 0px 6px 16px',border:'1px solid rgb(221, 221, 221)',borderRadius:'20px'}}>
                                        <div className="heading6 text-start">Add dates for prices</div>
                                        <div className="date-sidebar-detail bg-white border  mt-5 " style={{borderRadius:'10px'}}>
                                            <div className="relative cursor-pointer">
                                                <div className="grid grid-cols-2 border-b border-separate" onClick={handleOpenDate}>
                                                    <div className="left pl-5 py-4 border-r border-separate">
                                                        <div className="flex items-center gap-1">
                                                            <Icon.CalendarBlank className='text-xl' />
                                                            <div className="text-button " style={{fontSize:'12px',fontWeight:'bolder'}}>Check In</div>
                                                        </div>
                                                        <div className="body2 mt-1" style={{fontSize:'12px',fontWeight:'bolder'}}>{state[0].startDate.toLocaleDateString()}</div>
                                                    </div>
                                                    <div className="left pr-5 py-4">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Icon.CalendarBlank className='text-xl' />
                                                            <div className="text-button" style={{fontSize:'12px',fontWeight:'bolder'}}> Check Out</div>
                                                        </div>
                                                        <div className="body2 mt-1 text-end" style={{fontSize:'12px',fontWeight:'bolder'}}>{state[0].endDate.toLocaleDateString()}</div>
                                                    </div>
                                                </div>
                                                <DateRangePicker
                                                    className={`form-date-picker box-shadow ${openDate ? 'open' : ''}`}
                                                    onChange={item => setState([item.selection] as any)}
                                                    moveRangeOnFirstSelection={false}
                                                    months={2}
                                                    ranges={state}
                                                    direction="horizontal"
                                                />
                                            </div>
                                            <div className="guest px-5 py-4 relative cursor-pointer">
                                                <div className="flex items-center justify-between" onClick={handleOpenGuest}>
                                                    <div>
                                                        <div className="flex items-center gap-1">
                                                            <Icon.Users className='text-xl' />
                                                            <div className="text-button" style={{fontSize:'12px',fontWeight:'bolder'}}>Guest</div>
                                                        </div>
                                                        <div className="body2 mt-1" style={{fontSize:'12px',fontWeight:'bolder'}}>{guest.adult} adults - {guest.children} childrens</div>
                                                    </div>
                                                    <Icon.CaretDown className='text-2xl' />
                                                </div>
                                                <div className={`sub-menu-guest bg-white rounded-b-xl overflow-hidden p-5 absolute top-full -mt-px left-0 w-full box-shadow ${openGuest ? 'open' : ''}`}>
                                                    <div className="item flex items-center justify-between pb-4 border-b border-outline">
                                                        <div className="left">
                                                            <p className="text-button" style={{fontSize:'12px',fontWeight:'bolder'}}>Adults</p>
                                                            <div className="caption1 text-variant1" style={{fontSize:'12px',fontWeight:'bolder'}}>(12 Years+)</div>
                                                        </div>
                                                        <div className="right flex items-center gap-5">
                                                            <div
                                                                className={`minus w-8 h-8 flex items-center justify-center rounded-full border border-outline duration-300 ${guest.adult === 0 ? 'opacity-[0.4] cursor-default' : 'cursor-pointer hover:bg-black hover:text-white'}`}
                                                                onClick={() => decreaseGuest('adult')}
                                                            >
                                                                <Icon.Minus weight='bold' />
                                                            </div>
                                                            <div className="text-title" >{guest.adult}</div>
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
                                                            <p className="text-button" style={{fontSize:'12px',fontWeight:'bolder'}}>Children</p>
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
                                                    <div className="item flex items-center justify-between pb-4 pt-4 border-b border-outline">
                                                        <div className="left">
                                                            <p>Infants</p>
                                                            <div className="caption1 text-variant1">(0-2 Years)</div>
                                                        </div>
                                                        <div className="right flex items-center gap-5">
                                                            <div
                                                                className={`minus w-8 h-8 flex items-center justify-center rounded-full border border-outline duration-300 ${guest.infant === 0 ? 'opacity-[0.4] cursor-default' : 'cursor-pointer hover:bg-black hover:text-white'}`}
                                                                onClick={() => decreaseGuest('infant')}
                                                            >
                                                                <Icon.Minus weight='bold' />
                                                            </div>
                                                            <div className="text-title">{guest.infant}</div>
                                                            <div
                                                                className="plus w-8 h-8 flex items-center justify-center rounded-full border border-outline cursor-pointer duration-300 hover:bg-black hover:text-white"
                                                                onClick={() => increaseGuest('infant')}
                                                            >
                                                                <Icon.Plus weight='bold' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="item flex items-center justify-between pb-4 pt-4">
                                                        <div className="left">
                                                            <p className="text-button" style={{fontSize:'12px',fontWeight:'bolder'}}>Pets</p>
                                                        </div>
                                                        <div className="right flex items-center gap-5">
                                                            <div
                                                                className={`minus w-8 h-8 flex items-center justify-center rounded-full border border-outline duration-300 ${guest.pet === 0 ? 'opacity-[0.4] cursor-default' : 'cursor-pointer hover:bg-black hover:text-white'}`}
                                                                onClick={() => decreaseGuest('pet')}
                                                            >
                                                                <Icon.Minus weight='bold' />
                                                            </div>
                                                            <div className="text-title">{guest.pet}</div>
                                                            <div
                                                                className="plus w-8 h-8 flex items-center justify-center rounded-full border border-outline cursor-pointer duration-300 hover:bg-black hover:text-white"
                                                                onClick={() => increaseGuest('pet')}
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
                                            </div>
                                        </div>
                                        <div className="services bg-white px-5 py-4 mt-5 border border-outline">
                                            <div className="text-button">Add Services</div>
                                            <div className="list flex flex-col gap-2 mt-3">
                                                {tentMain.services.map((item, index) => (
                                                    <div className="flex items-center cursor-pointer" key={index}>
                                                        <div className="block-input">
                                                            <input
                                                                type="checkbox"
                                                                name={item}
                                                                id={item}
                                                           
                                                            />
                                                            <Icon.CheckSquare size={20} weight='fill' className='icon-checkbox text-primary' />
                                                        </div>
                                                        <label htmlFor={item} className="amenities-name capitalize pl-2 cursor-pointer">{item}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="price-block mt-5">
                                            <div className="heading6 text-start">Price Details</div>
                                            <div className="list mt-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="text-button" style={{fontSize:'12px',fontWeight:'bolder'}}> AED 200x 5 Nights</div>
                                                    <div className="text-button" style={{fontSize:'12px',fontWeight:'bolder'}}>05 x $200</div>
                                                </div>
                                                <div className="flex items-center justify-between mt-1">
                                                    <div className="text-button" style={{fontSize:'12px',fontWeight:'bolder'}}>Cleaning Fee</div>
                                                    <div className="text-button">$40</div>
                                                </div>
                                                <div className="flex items-center justify-between mt-1">
                                                    <div>Services Fee</div>
                                                    <div className="text-button">$60</div>
                                                </div>
                                            </div>
                                            <div className="total-block mt-5 pt-5 border-t border-outline flex items-center justify-between">
                                                <div className="heading6">Total Before Taxes</div>
                                                <div className="heading5">$1100</div>
                                            </div>
                                            <div className="button-main w-full text-center mt-5">Booking Room</div>
                                            <div className="button-main w-full text-center mt-5 bg-success">Enquire on WhatsApp </div>
                                        </div>
                                    </div>

                                    <div className="reservation bg-surface p-6 rounded-md md:mt-10 mt-6">
                                        <div className="bg-img relative">
                                            <iframe
                                                className='w-full lg:h-[200px] sm:h-[350px] h-[300px]'
                                                src={`https://maps.google.com/maps?q=${tentMain.locationMap.lat}, ${tentMain.locationMap.lng}&hl=es&z=14&amp&output=embed`}
                                            ></iframe>
                                        </div>
                                        <div className="heading6 mt-5">{tentMain.name}</div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Icon.MapPin className='text-variant1' />
                                            <span>{tentMain.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Icon.Envelope className='text-variant1' />
                                            <span>hi.avitex@gmail.com</span>
                                        </div>
                                    </div>

                                    <div className="reservation bg-surface p-6 rounded-md md:mt-10 mt-6">
                                        <div className="heading6 mt-5">Property Hightlishts</div>
                                        <div className="text-title mt-4">Breakfast Info</div>
                                        <div className="text-variant1 mt-1">Continental, Breakfast to go</div>
                                        <div className="heading6 mt-4">Rooms with:</div>
                                        <div className="list mt-1">
                                            <div className="flex items-center gap-2">
                                                <Icon.UsersThree className='text-xl' />
                                                <div>Front desk <span className='text-variant1'>(24-hour)</span></div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Icon.Person className='text-xl' />
                                                <div>Concierge</div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Icon.CurrencyCircleDollar className='text-xl' />
                                                <div>Currency exchange</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="reservation bg-surface p-6 rounded-md md:mt-10 mt-6">
                                        <div className="heading6 mt-5">Why Book With Us?</div>
                                        <div className="list mt-4">
                                            <div className="flex items-center gap-2">
                                                <Icon.Lock className='text-xl' />
                                                <div>Secure Booking</div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Icon.CoinVertical className='text-xl' />
                                                <div>Best Price Guarantee</div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Icon.HandPointing className='text-xl' />
                                                <div>Easy Booking Process</div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Icon.PhoneCall className='text-xl' />
                                                <div>Available Support 24/7</div>
                                            </div>
                                        </div>
                                    </div>


                                </StickyBox>
                            </div> */}

                            
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11000.863358972638!2d55.2741925!3d25.18500985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f682def25f457%3A0x3dd4c4097970950e!2sBusiness%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e1!3m2!1sen!2sin!4v1744192045088!5m2!1sen!2sin"
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
                {/* <DemoBook/> */}
            </div>
        </>
    )
}
export default Reva  