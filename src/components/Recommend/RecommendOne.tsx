import React, { useRef, useState } from 'react'
import TextHeading from '../TextHeading/TextHeading'
import TentItem from '../Tent/TentItem'
import { TentType } from '@/type/TentType'
import * as Icon from 'phosphor-react'

interface Props {
  data: Array<TentType>;
  start: number;
  end: number;
}

const RecommendOne: React.FC<Props> = ({ data, start, end }) => {
  const videoUrls = [
    '/images/allimg/vedio/2.mp4',
    '/images/allimg/vedio/1.mp4',
    '/images/allimg/vedio/3.mp4',
  ];

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // index of the unmuted video

  const handleToggleSound = (index: number) => {
    const selectedVideo = videoRefs.current[index];

    if (!selectedVideo) return;

    const isCurrentlyMuted = selectedVideo.muted;

    videoRefs.current.forEach((video, i) => {
      if (video) {
        video.muted = true;
      }
    });

    if (isCurrentlyMuted) {
      selectedVideo.muted = false;
      setActiveIndex(index);
    } else {
      selectedVideo.muted = true;
      setActiveIndex(null);
    }
  };

  return (
    <div className="recommend-block lg:pt-10 md:pt-14 pt-10">
      <div className="container">
        {/* Tent Grid Section */}
        <TextHeading
          title="Warm Hospitality, Courtesy of Aizah Hospitality"
          subTitle="Personalized Attention to Make Your Stay Truly Special"
        />
        <div className="list-cate grid lg:grid-cols-4 md:grid-cols-3 min-[360px]:grid-cols-2 lg:gap-[30px] gap-4 gap-y-7 md:mt-10 mt-2">
          {data.slice(start, end).map((item) => (
            <TentItem key={item.id} data={item} type="default" />
          ))}
        </div>

        {/* Video Grid Section */}
        <div className="mt-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {videoUrls.map((src, idx) => (
              <div key={idx} className="relative rounded-xl overflow-hidden shadow-lg">
                <video
                  ref={(el) => (videoRefs.current[idx] = el)}
                  src={src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleToggleSound(idx)}
                  className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80"
                  aria-label="Toggle Sound"
                >
                  {activeIndex === idx ? (
                    <Icon.SpeakerHigh size={20} weight="fill" />
                  ) : (
                    <Icon.SpeakerSimpleX size={20} weight="fill" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecommendOne
