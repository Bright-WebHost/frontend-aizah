import React from 'react'
import Link from 'next/link'
import * as Icon from 'phosphor-react'
import TextHeading from '../TextHeading/TextHeading'
import { useRouter } from 'next/navigation'

const CategoryOne = () => {
    const router = useRouter()

    const handleClickCate = (cate: string) => {
        router.push(`/camp/topmap-grid?category=${cate}`)
    }

    return (
        <>
            <div className="category-block lg:pt-20 md:pt-14 pt-10 pb-10  bg-[#32548E]">
                <div className="container ">
                    {/* <TextHeading title='Try Searching For'/> */}
                    <div className="heading3 text-center  text-white ">Thoughtfully Crafted for Every Traveler</div>
                    <div className="body2 text-white text-center sm:mt-3 mt-2">Everything You Need, Right Where You Stay</div>
                    <div className="list-cate grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-[30px] gap-5 md:mt-10 mt-6">
                       
                        <div
                            className={`item bg-surface py-[22px]  text-[#32548E]  flex flex-col items-center rounded-xl duration-300 cursor-pointer hover:bg-[#627eb0] hover:text-white`}
                            // onClick={() => handleClickCate('cabin')}
                        >
                           
                            <span className='fi fi-rr-users   text-4xl '></span>
                            <Link href='camp/tent-detail'>
                            <div className="text-title mt-2">couples </div>
                            </Link>
                        </div>
                        <div
                            className={`item bg-surface py-[22px] flex flex-col items-center rounded-xl duration-300 cursor-pointer hover:bg-[#627eb0] hover:text-white  text-[#32548E]`}
                            // onClick={() => handleClickCate('tented cabins')}
                        >
                            <span className='fi fi-rr-train   text-4xl '></span>
                            <Link href='camp/tent-detail'>
                            <div className="text-title mt-2 text-center">Near Metro <br/>Station </div>
                            </Link>
                        </div>
                        <div
                            className={`item bg-surface py-[22px] flex flex-col items-center rounded-xl duration-300 cursor-pointer hover:bg-[#627eb0] hover:text-white  text-[#32548E]`}
                            // onClick={() => handleClickCate('safari tents')}
                        >
                            <span className='fi fi-rr-building  text-4xl '></span>
                            <Link href='camp/tent-detail'>
                            <div className="text-title mt-2 text-center">Near Downtown <br/> Dubai </div>
                            </Link>
                        </div>
                        <div
                            className={`item bg-surface py-[22px] flex flex-col items-center rounded-xl duration-300 cursor-pointer hover:bg-[#627eb0] hover:text-white  text-[#32548E]`}
                            // onClick={() => handleClickCate('cottages')}
                        >
                             <span className='fi fi-rr-restaurant  text-4xl '></span>
                             <Link href='camp/tent-detail'>
                            <div className="text-title mt-2">Kitchen </div>
                            </Link>
                        </div>
                        <div
                            className={`item bg-surface py-[22px] flex flex-col items-center rounded-xl duration-300 cursor-pointer hover:bg-[#627eb0] hover:text-white  text-[#32548E]`}
                            // onClick={() => handleClickCate('tiny houses')}
                        >
                            <span className='fi fi-rr-swimmer   text-4xl '></span>
                            <Link href='camp/tent-detail'>
                            <div className="text-title mt-2">Swimming Pool</div>
                            </Link>
                        </div>
                        <div
                            className={`item bg-surface py-[22px] flex flex-col items-center rounded-xl duration-300 cursor-pointer hover:bg-[#627eb0] hover:text-white  text-[#32548E]`}
                            // onClick={() => handleClickCate('caravans')}
                        >
                            <span className='fi fi-rr-house-laptop  text-4xl '></span>
                            <Link href='camp/tent-detail'>
                            <div className="text-title mt-2">Work Space</div>
                            </Link>
                        </div>
                        {/* <div
                            className={`item bg-surface py-[22px] flex flex-col items-center rounded-xl duration-300 cursor-pointer hover:bg-black hover:text-white`}
                            onClick={() => handleClickCate('Domes')}
                        >
                            <span className='icon-domes text-4xl'></span>
                            <div className="text-title mt-2">Domes</div>
                        </div>
                        <div
                            className={`item bg-surface py-[22px] flex flex-col items-center rounded-xl duration-300 cursor-pointer hover:bg-black hover:text-white`}
                            onClick={() => handleClickCate('Log Cabins')}
                        >
                            <span className='icon-log-cabin text-4xl'></span>
                            <div className="text-title mt-2">Log Cabins</div>
                        </div>
                        <div
                            className={`item bg-surface py-[22px] flex flex-col items-center rounded-xl duration-300 cursor-pointer hover:bg-black hover:text-white`}
                            onClick={() => handleClickCate('Yurts')}
                        >
                            <span className='icon-yurt text-4xl'></span>
                            <div className="text-title mt-2">Yurts</div>
                        </div>
                        <div
                            className={`item bg-surface py-[22px] flex flex-col items-center rounded-xl duration-300 cursor-pointer hover:bg-black hover:text-white`}
                            onClick={() => handleClickCate('Bell Tents')}
                        >
                            <span className='icon-bell-tent text-4xl'></span>
                            <div className="text-title mt-2">Bell Tents</div>
                        </div>
                        <div
                            className={`item bg-surface py-[22px] flex flex-col items-center rounded-xl duration-300 cursor-pointer hover:bg-black hover:text-white`}
                            onClick={() => handleClickCate('Containers')}
                        >
                            <span className='icon-container text-4xl'></span>
                            <div className="text-title mt-2">Containers</div>
                        </div>
                        <div
                            className={`item bg-surface py-[22px] flex flex-col items-center rounded-xl duration-300 cursor-pointer hover:bg-black hover:text-white`}
                            onClick={() => handleClickCate('Tree Houses')}
                        >
                            <span className='icon-cottages text-4xl'></span>
                            <div className="text-title mt-2">Tree Houses</div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryOne