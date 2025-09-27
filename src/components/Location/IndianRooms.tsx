import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TextHeading from '../TextHeading/TextHeading'
import { useRouter } from 'next/navigation'

const IndianRooms = () => {
    const router = useRouter()

    const handleClickContinents = (continents: string) => {
        router.push(`/camp/topmap-grid?continents=${continents}`)
    }

    return (
        <>
            <div className="location-block lg:pt-20 md:pt-14 pt-10 ">
                <div className="container">
                    <TextHeading title='Popular homes in Bangalore' subTitle='' />
                    <div className="list-location grid lg:grid-cols-3 min-[370px]:grid-cols-1 md:gap-[30px] gap-y-7 gap-4 md:mt-10 mt-6">
                        {/* <div
                            className="item hover-scale"
                            // onClick={() => handleClickContinents('Africa')}
                        >
                             <Link href='camp/tent-detail'>
                            <div className="bg-img w-full sm:rounded-[20px] rounded-xl overflow-hidden">
                                <Image
                                    src={'/images/allimg/rooms/2.png'}
                                    width={3000}
                                    height={2000}
                                    alt='1.png'
                                    priority={true}
                                    className='w-full'
                                />
                            </div>
                            <div className="name heading5 sm:mt-5 mt-3">Chic 1 BHK</div>
                            <div className='flex  items-center  gap-6'>
                            <div className="flex items-center gap-3">
    <span className="fi fi-rr-users  text-[20px] text-[#32548e]"></span>
    <div className="body2">4 Guests</div>
  </div>
                            <div className="flex items-center gap-3">
    <span className="fi fi-rr-bed  text-[20px] text-[#32548e]"></span>
    <div className="body2">1 Room</div>
  </div>
  </div>
                            </Link>
                        </div>

                        <div
                            className="item hover-scale"
                            // onClick={() => handleClickContinents('Asia')}
                        >
                            <Link href='camp/dubai-mall'>
                            <div className="bg-img w-full sm:rounded-[20px] rounded-xl overflow-hidden">
                                <Image
                                    src={'/images/allimg/demo/3.png'}
                                    width={3000}
                                    height={2000}
                                    alt='2.png'
                                    priority={true}
                                    className='w-full'
                                />
                            </div>

                            
                          
                            <div className="name heading5 sm:mt-5 mt-3">Dubai mall</div>
                            <div className='flex  items-center  gap-6'>
                            <div className="flex items-center gap-3">
    <span className="fi fi-rr-users  text-[20px] text-[#32548e]"></span>
    <div className="body2">3 Guests</div>
  </div>
                            <div className="flex items-center gap-3">
    <span className="fi fi-rr-bed  text-[20px] text-[#32548e]"></span>
    <div className="body2">1 Room</div>
  </div>
  </div>
                            </Link>
                        </div>
                        
                        <div
                            className="item hover-scale"
                            // onClick={() => handleClickContinents('Europe')}
                        >
                             <Link href='camp/chic-studio'>
                            <div className="bg-img w-full sm:rounded-[20px] rounded-xl overflow-hidden">
                                <Image
                                    src={'/images/allimg/rooms/5.png'}
                                    width={3000}
                                    height={2000}
                                    alt='3.png'
                                    priority={true}
                                    className='w-full'
                                />
                            </div>
                            <div className="name heading5 sm:mt-5 mt-3">Chic studio</div>
                            <div className='flex  items-center  gap-6'>
                            <div className="flex items-center gap-3">
    <span className="fi fi-rr-users  text-[20px] text-[#32548e]"></span>
    <div className="body2">2 Guests</div>
  </div>
                            <div className="flex items-center gap-3">
    <span className="fi fi-rr-bed  text-[20px] text-[#32548e]"></span>
    <div className="body2">1 Room</div>
  </div>
  </div>
                            </Link>
                        </div> */}


                        <div
                            className="item hover-scale"
                            // onClick={() => handleClickContinents('Africa')}
                        >
                             <Link href='/NandhiHills'>
                            <div className="bg-img w-full sm:rounded-[20px] rounded-xl overflow-hidden">
                                <Image
                                    src={'images/allimg/rooms/Nandhi/10.webp'}
                                    width={3000}
                                    height={2000}
                                    alt='1.png'
                                    priority={true}
                                    className='w-full'
                                />
                            </div>
                            <div className="name heading6 sm:mt-5 mt-3 ">Farmhouse Nandhi Hills</div>
                            <div className='flex  items-center  gap-6'>
                            {/* <div className="flex items-center gap-3">
    <span className="fi fi-rr-users  text-[18px] text-[#32548e]"></span>
    <div className="body2 text-[18px]">4 Guests</div>
  </div> */}
                            <div className="flex items-center gap-3">
    <span className="fi fi-rr-bed  text-[18px] text-[#32548e]"></span>
    <div className="body2 text-[18px]">2BHK</div>
  </div>
  </div>
                            </Link>
                        </div>
                        <div
                            className="item hover-scale"
                            // onClick={() => handleClickContinents('Asia')}
                        >
                            <Link href='/PenthouseParisian'>
                            <div className="bg-img w-full sm:rounded-[20px] rounded-xl overflow-hidden">
                                <Image
                                    src={'/images/allimg/rooms/PenthouseParisian/3.webp'}                               
                                    width={3000}
                                    height={2000}
                                    alt='2.png'
                                    priority={true}
                                    className='w-full'
                                />
                            </div>
                          
                            <div className="name heading6 sm:mt-5 mt-3">Penthouse Parisian</div>
                            <div className='flex  items-center  gap-6'>
                            <div className="flex items-center gap-3">
    <span className="fi fi-rr-bed text-[18px] text-[#32548e]"></span>
    <div className="body2 text-[18px]">3BHK</div>
  </div>
                            {/* <div className="flex items-center gap-3">
    <span className="fi fi-rr-bed  text-[18px] text-[#32548e]"></span>
    <div className="body2 text-[18px]">3 Room</div>
  </div> */}
  </div>
                            </Link>
                        </div>
                       
                        <div
                            className="item hover-scale"
                            // onClick={() => handleClickContinents('Europe')}
                        >
                             <Link href='/FramhouseWithPool'>
                            <div className="bg-img w-full sm:rounded-[20px] rounded-xl overflow-hidden">
                                <Image
                                
                                    src={'/images/allimg/rooms/Pool/4.png'}
                                    width={3000}
                                    height={2000}
                                    alt='3.png'
                                    priority={true}
                                    className='w-full'
                                />
                            </div>
                            <div className="name heading6 sm:mt-5 mt-3">    Farmhouse with Pool </div>
                            <div className='flex  items-center  gap-6'>
                            <div className="flex items-center gap-3">
    <span className="fi fi-rr-bed  text-[18px] text-[#32548e]"></span>
    <div className="body2 text-[18px]">2BHK</div>
  </div>
                            {/* <div className="flex items-center gap-3">
    <span className="fi fi-rr-bed  text-[18px] text-[#32548e]"></span>
    <div className="body2 text-[18px]">2 Room</div>
  </div> */}
  </div>
                            </Link>
                        </div>
 {/* <div
                            className="item hover-scale"
                            onClick={() => handleClickContinents('Europe')}
                        >
                             <Link href='/merano-2906'>
                            <div className="bg-img w-full sm:rounded-[20px] rounded-xl overflow-hidden">
                                <Image
                                    src={'/images/allimg/bannerimg/2.png'}
                                    width={3000}
                                    height={2000}
                                    alt='3.png'
                                    priority={true}
                                    className='w-full'
                                />
                            </div>
                            <div className="name heading6 sm:mt-5 mt-3"> Skyline Views | Urban Oasis</div>
                            <div className='flex  items-center  gap-6'>
                            <div className="flex items-center gap-3">
    <span className="fi fi-rr-users  text-[18px] text-[#32548e]"></span>
    <div className="body2 text-[18px]">3 Guests</div>
  </div>
                            <div className="flex items-center gap-3">
    <span className="fi fi-rr-bed text-[18px] text-[#32548e]"></span>
    <div className="body2 text-[18px]">1 Room</div>
  </div>
  </div>
                            </Link>
                        </div>
 */}





                        {/* <div
                            className="item hover-scale"
                            onClick={() => handleClickContinents('North America')}
                        >
                            <div className="bg-img w-full sm:rounded-[20px] rounded-xl overflow-hidden">
                                <Image
                                    src={'/images/location/410x273.png'}
                                    width={3000}
                                    height={2000}
                                    alt='4.png'
                                    priority={true}
                                    className='w-full'
                                />
                            </div>
                            <div className="name heading5 sm:mt-5 mt-3">North America</div>
                            <div className="text-variant1 sm:mt-1">460 accommodations</div>
                        </div>
                        <div
                            className="item hover-scale"
                            onClick={() => handleClickContinents('Oceania')}
                        >
                            <div className="bg-img w-full sm:rounded-[20px] rounded-xl overflow-hidden">
                                <Image
                                    src={'/images/location/410x273.png'}
                                    width={3000}
                                    height={2000}
                                    alt='5.png'
                                    priority={true}
                                    className='w-full'
                                />
                            </div>
                            <div className="name heading5 sm:mt-5 mt-3">Oceania</div>
                            <div className="text-variant1 sm:mt-1">460 accommodations</div>
                        </div>
                        <div
                            className="item hover-scale"
                            onClick={() => handleClickContinents('South America')}
                        >
                            <div className="bg-img w-full sm:rounded-[20px] rounded-xl overflow-hidden">
                                <Image
                                    src={'/images/location/410x273.png'}
                                    width={3000}
                                    height={2000}
                                    alt='6.png'
                                    priority={true}
                                    className='w-full'
                                />
                            </div>
                            <div className="name heading5 sm:mt-5 mt-3">South America</div>
                            <div className="text-variant1 sm:mt-1">460 accommodations</div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default IndianRooms