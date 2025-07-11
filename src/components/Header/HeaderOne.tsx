'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import * as Icon from "phosphor-react";
import HeaderThree from './HeaderThree';

const HeaderOne = () => {
    const pathname = usePathname()
    const [fixedHeader, setFixedHeader] = useState(false)
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    const [openMenuMobile, setOpenMenuMobile] = useState<boolean>(false)
    const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(null)

    const handleOpenSubNavMobile = (index: number) => {
        setOpenSubNavMobile(openSubNavMobile === index ? null : index)
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setFixedHeader(scrollPosition > 10);
            setLastScrollPosition(scrollPosition);
        };

        // Add event scroll when component mounted
        window.addEventListener('scroll', handleScroll);

        // Remove event scroll when component mounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollPosition]);

    return (
        <>
           





<div className="content-detail border-t border-outline pt-2">
                    <div className="container">
                        <div className="flex max-lg:flex-col-reverse gap-y-10 justify-between">
                            <div className="content xl:w-3/3 lg:w-[100%] lg:pr-[15px] w-full">


{/* this call old */}
                            <div  id="header" className='header '>
                <div className={`header-main h-20 w-full bg-white px-4 min-[1322px]:px-10 flex items-center justify-between ` }>
                    <Link href={'#'} className="logo">
                        <Image
                            src={'/images/allimg/logo/logo.jpg'}
                            width={200}
                            height={200}
                            alt='logo'
                            priority={true}
                            className='sm:w-[100px] w-[100px] '
                            style={{marginBottom:'30px'}}
                        />
                    </Link>
                    {/* <HeaderThree/> */}
                    <div className="menu-main h-full max-lg:hidden">
                        <ul className='flex items-end xl:gap-[20px] gap-10 h-full'>
                            {/* <li className='h-full relative'>
                                <Link
                                    href="#!"
                                    className={`text-button duration-300 h-full flex items-center justify-center gap-1 ${pathname === '/' || pathname.includes('/homepages/') ? 'active' : ''}`}
                                >
                                    Home
                                </Link>
                                <div className="sub-menu absolute bg-white">
                                    <ul>
                                        <li>
                                            <Link href="/" className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname === '/' ? 'active' : ''}`}>
                                                Homepage 1
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/homepages/home2" className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname === '/homepages/home2' ? 'active' : ''}`}>
                                                Homepage 2
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/homepages/home3" className={`link text-button text-variant1 py-4 pl-6 pr-16 duration-300 ${pathname === '/homepages/home3' ? 'active' : ''}`}>
                                                Homepage 3
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='h-full relative'>
                                <Link
                                    href="#!"
                                    className={`text-button duration-300 h-full flex items-center justify-center gap-1 ${pathname.includes('/camp/') ? 'active' : ''}`}
                                >
                                    Camps
                                </Link>
                                <div className="sub-menu absolute bg-white">
                                    <ul>
                                        <li>
                                            <Link href="/camp/topmap-grid" className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname === '/camp/topmap-grid' ? 'active' : ''}`}>
                                                Find Topmap Grid
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/camp/topmap-list" className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname === '/camp/topmap-list' ? 'active' : ''}`}>
                                                Find Topmap List
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/camp/filter-scroll" className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname === '/camp/filter-scroll' ? 'active' : ''}`}>
                                                Filters Scrolls
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/camp/filter-dropdown" className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname === '/camp/filter-dropdown' ? 'active' : ''}`}>
                                                Filters Dropdown
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/camp/topmap-sidebar" className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname === '/camp/topmap-sidebar' ? 'active' : ''}`}>
                                                Find Topmap Sidebar
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/camp/halfmap-grid" className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname === '/camp/halfmap-grid' ? 'active' : ''}`}>
                                                Find Halfmap Grid
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/camp/halfmap-list" className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname === '/camp/halfmap-list' ? 'active' : ''}`}>
                                                Find Halfmap List
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/camp/tent-detail" className={`link text-button text-variant1 py-4 pl-6 pr-16 duration-300 ${pathname === '/camp/tent-detail' ? 'active' : ''}`}>
                                                Tent Details
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='h-full relative'>
                                <Link
                                    href="/about"
                                    className={`text-button duration-300 h-full flex items-center justify-center gap-1 ${pathname === '/about' ? 'active' : ''}`}
                                >
                                    About us
                                </Link>
                            </li>
                            <li className='h-full relative'>
                                <Link
                                    href="#!"
                                    className={`text-button duration-300 h-full flex items-center justify-center gap-1 ${pathname.includes('/blog/') ? 'active' : ''}`}
                                >
                                    Blog
                                </Link>
                                <div className="sub-menu absolute bg-white">
                                    <ul>
                                        <li>
                                            <Link href="/blog/default" className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname === '/blog/default' ? 'active' : ''}`}>
                                                Blog Default
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/blog/grid" className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname === '/blog/grid' ? 'active' : ''}`}>
                                                Blog Grid
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/blog/detail" className={`link text-button text-variant1 py-4 pl-6 pr-16 duration-300 ${pathname === '/blog/detail' ? 'active' : ''}`}>
                                                Blog Detail
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className='h-full relative'>
                                <Link
                                    href="#!"
                                    className={`text-button duration-300 h-full flex items-center justify-center gap-1 ${pathname.includes('/pages/') ? 'active' : ''}`}
                                >
                                    Pages
                                </Link>
                                <div className="sub-menu absolute bg-white">
                                    <ul>
                                        <li>
                                            <Link href="/pages/contact" className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname === '/pages/contact' ? 'active' : ''}`}>
                                                Contact Us
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/pages/faqs" className={`link text-button text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname === '/pages/faqs' ? 'active' : ''}`}>
                                                FAQs
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/pages/review" className={`link text-button text-variant1 py-4 pl-6 pr-16 duration-300 ${pathname === '/pages/review' ? 'active' : ''}`}>
                                                Review
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li> */}


                            <li className='h-full relative'>
                                <Link
                                    href="/"
                                    className={`text-button1 duration-300 h-full flex items-center justify-center gap-1 ${pathname === '/' ? 'active' : ''}`}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className='h-full relative'>
                                <Link
                                    href="/about"
                                    className={`text-button1 duration-300 h-full flex items-center justify-center gap-1 ${pathname === '/about' ? 'active' : ''}`}
                                >
                                    About us
                                </Link>
                            </li>

                            <li className='h-full relative'>
                                <Link
                                    href="#!"
                                    className={`text-button1 duration-300 h-full flex items-center justify-center gap-1 ${pathname === '/' || pathname.includes('/homepages/') ? 'active' : ''}`}
                                >
                                Room
                                </Link>
                                <div className="sub-menu absolute bg-white">
                                    <ul>
                                        <li>
                                            <Link href="/camp/dubai" className={`link text-button1 text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname === '/' ? 'active' : ''}`}>
                                              Dubai
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" className={`link text-button1 text-variant1 py-4 pl-6 pr-16 border-b border-outline duration-300 ${pathname === '/homepages/home2' ? 'active' : ''}`}>
                                              Bangalore
                                            </Link>
                                        </li>
                                     
                                    </ul>
                                </div>
                            </li>





                            {/* <li className='h-full relative'>
                                <Link
                                    href="/camp/tent-detail"
                                    className={`text-button1 duration-300 h-full flex items-center justify-center gap-1 ${pathname === '/about' ? 'active' : ''}`}
                                >
                                   Room
                                </Link>
                            </li> */}
                            <li className='h-full relative'>
                                <Link
                                    href="/pages/contact"
                                    className={`text-button1 duration-300 h-full flex items-center justify-center gap-1 ${pathname === '/Contact' ? 'active' : ''}`}
                                >
                                    Contact
                                </Link>
                            </li>
                            
                        </ul>
                    </div>
                    <div className="right flex items-center gap-3  lg:hidden"  >
                        {/* <div className="weather flex items-center gap-1 max-sm:hidden">
                            <Icon.CloudSun className='text-xl' />
                            <div className="text-button">18°C</div>
                        </div>
                        <div className='bg-outline w-px h-4 max-sm:hidden'></div>
                        <Link href={'/login'} className="text-button max-sm:hidden">Sign In</Link>
                        <div className='bg-outline w-px h-4 max-sm:hidden'></div>
                        <div className="select-block pr-5 max-sm:hidden">
                            <select name="language" id="language" className='text-button'>
                                <option value="EN">EN</option>
                                <option value="FR">FR</option>
                                <option value="GE">GE</option>
                            </select>
                            <Icon.CaretDown className='icon text-base right-0' />
                        </div> */}
                        <div className="menu-mobile-icon lg:hidden  flex items-center ml-4" onClick={() => setOpenMenuMobile(true)}>
                            <Icon.List className='sm:text-xl text-2xl text-black' weight='bold' />
                        </div>
                    </div>
                </div>
            </div>
            {/* this call old */}

                               
                                
                            </div>
                            </div>
                            </div>
                            </div>









            <div id="menu-mobile" className={`${openMenuMobile ? 'open' : ''}`}>
                <div className="menu-container bg-white h-full">
                    <div className="container h-full">
                        <div className="menu-main h-full overflow-hidden">
                            <div className="heading py-2 relative flex items-center justify-center">
                                <div
                                    className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                                    onClick={() => setOpenMenuMobile(false)}
                                >
                                    <Icon.X size={14} />
                                </div>
                                <Link href={'/'} className='logo text-center'>
                                    <Image
                                        src={'/images/allimg/logo/logo.jpg'}
                                        width={100}
                                        height={100}
                                        alt='logo'
                                        priority={true}
                                        className='sm:w-[100px] w-[100px] '
                                        style={{borderRadius:'0 5px 5px 5px'}}
                                    />
                                </Link>
                            </div>
                            <div className="list-nav mt-6">
                                <ul>
                                    {/* <li
                                        className={`${openSubNavMobile === 1 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(1)}
                                    >
                                        <a href={'#!'} className={`text-title uppercase flex items-center justify-between`}>Home
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(1)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-2 pb-6">
                                                <ul>
                                                    <li>
                                                        <Link href="/" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname === '/' ? 'active' : ''}`}>
                                                            Homepage 1
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/home2" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname === '/homepages/home2' ? 'active' : ''}`}>
                                                            Homepage 2
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/homepages/home3" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname === '/homepages/home3' ? 'active' : ''}`}>
                                                            Homepage 3
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 2 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(2)}
                                    >
                                        <a href={'#!'} className='text-title uppercase flex items-center justify-between mt-5'>Camps
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(2)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-2 pb-6">
                                                <ul>
                                                    <li>
                                                        <Link href="/camp/topmap-grid" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname === '/camp/topmap-grid' ? 'active' : ''}`}>
                                                            Find Topmap Grid
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/camp/topmap-list" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname === '/camp/topmap-list' ? 'active' : ''}`}>
                                                            Find Topmap List
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/camp/filter-scroll" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname === '/camp/filter-scroll' ? 'active' : ''}`}>
                                                            Filters Scrolls
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/camp/filter-dropdown" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname === '/camp/filter-dropdown' ? 'active' : ''}`}>
                                                            Filters Dropdown
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/camp/topmap-sidebar" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname === '/camp/topmap-sidebar' ? 'active' : ''}`}>
                                                            Find Topmap Sidebar
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/camp/halfmap-grid" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname === '/camp/halfmap-grid' ? 'active' : ''}`}>
                                                            Find Halfmap Grid
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/camp/halfmap-list" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname === '/camp/halfmap-list' ? 'active' : ''}`}>
                                                            Find Halfmap List
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/camp/tent-detail" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line has-line ${pathname === '/camp/tent-detail' ? 'active' : ''}`}>
                                                            Tent Details
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link href={'/about'} className='text-title uppercase flex items-center justify-between mt-5'>About Us
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </Link>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 4 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(4)}
                                    >
                                        <a href={'#!'} className='text-title uppercase flex items-center justify-between mt-5'>Blog
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(4)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-2 pb-6">
                                                <ul className='w-full'>
                                                    <li>
                                                        <Link href="/blog/default" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${pathname === '/blog/default' ? 'active' : ''}`}>
                                                            Blog Default
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog/grid" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${pathname === '/blog/grid' ? 'active' : ''}`}>
                                                            Blog Grid
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/blog/detail" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${pathname === '/blog/detail' ? 'active' : ''}`}>
                                                            Blog Detail
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        className={`${openSubNavMobile === 5 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(5)}
                                    >
                                        <a href={'#!'} className='text-title uppercase flex items-center justify-between mt-5'>Pages
                                            <span className='text-right'>
                                                <Icon.CaretRight size={20} />
                                            </span>
                                        </a>
                                        <div className="sub-nav-mobile">
                                            <div
                                                className="back-btn flex items-center gap-3"
                                                onClick={() => handleOpenSubNavMobile(5)}
                                            >
                                                <Icon.CaretLeft />
                                                Back
                                            </div>
                                            <div className="list-nav-item w-full pt-2 pb-6">
                                                <ul className='w-full'>
                                                    <li>
                                                        <Link href="/pages/contact" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${pathname === '/pages/contact' ? 'active' : ''}`}>
                                                            Contact Us
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/faqs" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${pathname === '/pages/faqs' ? 'active' : ''}`}>
                                                            FAQs
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/pages/review" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${pathname === '/pages/review' ? 'active' : ''}`}>
                                                            Review
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li> */}
                                    <li
                                        className={`${openSubNavMobile === 5 ? 'open' : ''}`}
                                        onClick={() => handleOpenSubNavMobile(5)}
                                    >
                                        <div >
                                         
                                            <div className="list-nav-item w-full pt-2 pb-6">
                                                <ul className='w-full'>
                                                    <li>
                                                        <Link href="#" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${pathname === '/pages/contact' ? 'active' : ''}`}>
                                                            home
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${pathname === '/pages/contact' ? 'active' : ''}`}>
                                                          About us
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/camp/tent-detail" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${pathname === '/pages/contact' ? 'active' : ''}`}>
                                                           Room
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#" className={`nav-item-mobile text-button link text-variant1 duration-300 has-line ${pathname === '/pages/contact' ? 'active' : ''}`}>
                                                        Contact
                                                        </Link>
                                                    </li>
                                                   
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderOne