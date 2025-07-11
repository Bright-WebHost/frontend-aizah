import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as Icon from 'phosphor-react'
import TextHeading from '../TextHeading/TextHeading'
import TentItem from '../Tent/TentItem'
import { TentType } from '@/type/TentType'

interface Props {
    data: Array<TentType>;
    start: number;
    end: number;
}

const RecommendOne: React.FC<Props> = ({ data, start, end }) => {
    return (
        <>
            <div className="recommend-block lg:pt-10 md:pt-14 pt-10">
                <div className="container">
                    <TextHeading title=' Warm Hospitality, Courtesy of Aizah Hospitality ' subTitle='Personalized Attention to Make Your Stay Truly Special' />
                    <div className="list-cate grid lg:grid-cols-4 md:grid-cols-3 min-[360px]:grid-cols-2 lg:gap-[30px] gap-4 gap-y-7 md:mt-10 mt-2">
                        {data.slice(start, end).map(item => (
                            <TentItem key={item.id} data={item} type='default' />
                        ))}
                    </div>
                    {/* <div className="button-block w-full text-center md:mt-10 mt-6">
                        <Link href={'/camp/topmap-grid'} className="button-main">View All Camp</Link>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default RecommendOne