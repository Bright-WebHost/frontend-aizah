'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import * as Icon from "phosphor-react";
import HeaderOne from '@/components/Header/HeaderOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'

const Contact = () => {
    return (
        <>
            <HeaderOne />
            <Breadcrumb img='/images/breadcrumb/1920x320.png' heading='Contact Us' subHeading='Reach Out to GlampHub. Your Gateway to Outdoor Luxury.' />
            <div className='contact-us lg:pt-20 md:pt-14 pt-10'>
                <div className="container">
                    <div className="flex justify-between max-lg:flex-col gap-y-10">
                        <div className="left lg:w-1/2 lg:pr-[30px]">
                            <div className="infor">
                                <div className="heading">
                                    <div className="heading4">We’d love to help</div>
                                    <div className="body2 text-variant1 mt-4">Your Glamping Dreams, Our Expertise: Crafting Unforgettable Adventures Together</div>
                                </div>
                                <div className="style-contact-us">
                                    <div className="list-social flex items-center flex-wrap gap-5 mt-4">
                                        <Link className="item rounded-full md:w-[52px] w-12 md:h-[52px] h-12 flex items-center justify-center flex-shrink-0 border border-outline text-variant1 duration-500 hover:border-[#f1dd38] hover:bg-[#32548E] hover:text-white" href="https://www.facebook.com/" target="_blank">
                                            {/* <i className="icon-facebook "></i> */}
                                            <span className="fi fi-brands-facebook  md:text-xl text-lg"></span>
                                        </Link>
                                        <Link className="item rounded-full md:w-[52px] w-12 md:h-[52px] h-12 flex items-center justify-center flex-shrink-0 border border-outline text-variant1 duration-500 hover:border-[#f1dd38] hover:bg-[#32548E] hover:text-white" href="https://www.instagram.com/" target="_blank">
                                        <span className="fi fi-brands-instagram  md:text-xl text-lg"></span>
                                        </Link>
                                        <Link className="item rounded-full md:w-[52px] w-12 md:h-[52px] h-12 flex items-center justify-center flex-shrink-0 border border-outline text-variant1 duration-500 hover:border-[#f1dd38] hover:bg-[#32548E] hover:text-white" href="https://www.twitter.com/" target="_blank">
                                        <span className="fi fi-brands-whatsapp  md:text-xl text-lg"></span>
                                        </Link>
                                        <Link className="item rounded-full md:w-[52px] w-12 md:h-[52px] h-12 flex items-center justify-center flex-shrink-0 border border-outline text-variant1 duration-500 hover:border-[#f1dd38] hover:bg-[#32548E] hover:text-white" href="https://www.linkedin.com/" target="_blank">
                                        <span className="fi fi-brands-linkedin  md:text-xl text-lg"></span>
                                        </Link>
                                       
                                        <Link className="item rounded-full md:w-[52px] w-12 md:h-[52px] h-12 flex items-center justify-center flex-shrink-0 border border-outline text-variant1 duration-500 hover:border-[#f1dd38] hover:bg-[#32548E] hover:text-white" href="https://www.youtube.com/" target="_blank">
                                        <span className="fi fi-rr-envelope  md:text-xl text-lg"></span>
                                        </Link>
                                      
                                    </div>
                                </div>
                                <div className="list-more-infor mt-10">
                                    <div className="item flex items-center gap-6">
                                        <div className='flex items-center justify-center w-12 h-12 bg-[#32548E] flex-shrink-0 rounded-full'>
                                            <Icon.EnvelopeSimpleOpen className='text-white text-2xl' />
                                        </div>
                                        <div className="w-px h-12 bg-outline"></div>
                                        <div className="body2">demo@gmail.com</div>
                                    </div>
                                    <div className="item flex items-center gap-6 mt-5">
                                        <div className='flex items-center justify-center w-12 h-12 bg-[#32548E] flex-shrink-0 rounded-full'>
                                            <Icon.Phone className='text-white text-2xl' />
                                        </div>
                                        <div className="w-px h-12 bg-outline"></div>
                                        <div className="body2">+91 81977 23683 </div>
                                    </div>
                                    <div className="item flex items-center gap-6 mt-5">
                                        <div className='flex items-center justify-center w-12 h-12 bg-[#32548E] flex-shrink-0 rounded-full'>
                                            <Icon.MapPinLine className='text-white text-2xl' />
                                        </div>
                                        <div className="w-px h-12 bg-outline"></div>
                                        <div className="body2">Dubai - United Arab Emirates</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right lg:w-1/2 lg:pl-[30px]">
                            <div className="heading4">Drop Us A Line</div>
                            <div className="body2 text-variant1 mt-3">Connect with Us to Embark on a Journey to Create Your Dream Glamping Experience</div>
                            <form className="md:mt-7 mt-4">
                                <div className='grid sm:grid-cols-2 grid-cols-1 gap-5'>
                                    <div className="name">
                                        <label htmlFor="username" className='text-variant1'>Name</label>
                                        <input className="border-line mt-2 px-4 py-3 w-full rounded-lg" id="username" type="text" placeholder="Your Name *" required />
                                    </div>
                                    <div className="email">
                                        <label htmlFor="email" className='text-variant1'>Email</label>
                                        <input className="border-line mt-2 px-4 pt-3 pb-3 w-full rounded-lg" id="email" type="email" placeholder="Your Email *" required />
                                    </div>
                                    <div className="message sm:col-span-2">
                                        <label htmlFor="message" className='text-variant1'>Message</label>
                                        <textarea className="border-line mt-2 px-4 pt-3 pb-3 w-full rounded-lg" id="message" rows={3} placeholder="Your Message *" required />
                                    </div>
                                </div>
                                <div className="block-button md:mt-6 mt-4">
                                    <button className="button-main">Send message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="map-block lg:my-20 md:my-14 my-10">
                <div className="container">
                    <div className="map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.685370422137!2d55.1365318!3d25.1125097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ddbf8e6f805495%3A0x24b7a6fe3e11b714!2sAiza%20Hospitality!5e0!3m2!1sen!2sin!4v1748336745016!5m2!1sen!2sin"
                            loading="lazy"
                            className='w-full lg:h-[600px] md:h-[500px] sm:h-[400px] h-[360px] rounded-[20px]'
                        >
                        </iframe>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contact