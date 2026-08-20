'use client';

import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import Image from 'next/image';

function ScheduleOfTheDay(props: { dayInfo: DayInfo }) {
  const { dayInfo } = props;
  const { day, times } = dayInfo;
  return (
    <div className="relative z-10 my-5 flex w-full flex-col text-[#2F4F2F]">
      <div className="glow-subtitles text-textSubtitle mb-4 w-full text-center text-xl font-semibold md:text-5xl">
        {dayInfo.day}
      </div>
      <div className="w-full">
        {times.map((timeInfo, index) => (
          <div
            className="mt-4 flex w-full flex-row pr-4 text-xl md:my-6 md:px-3"
            key={`${day}-${index}`}
          >
            <div className="h-fit w-1/3 pr-4 text-right font-black text-[#7B241C]">
              {timeInfo.time}
            </div>
            <div className="flex w-2/3 flex-col border-l border-[#8FA37B] pl-6">
              <div className="text-lg font-semibold">{timeInfo.event}</div>
              <div className="text-sm text-[#5A6B4A]">{timeInfo.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const schedule = {
  Saturday: {
    day: 'Saturday',
    times: [
      {
        time: '9:00 AM',
        event: 'Check-in Starts',
        location: 'Center Lobby',
      },
      {
        time: '10:45 AM',
        event: 'Delayed Check-in',
        location: 'Center Lobby',
      },
      {
        time: '11:00 AM',
        event: 'Opening Ceremony',
        location: 'Hacking Area',
      },
      { time: '12:00 PM', event: 'Team Building', location: '411' },
      { time: '12:00 PM', event: 'Hacking Starts', location: 'Hacking Area' },
      { time: '12:30 PM', event: 'Lunch', location: 'MPR' },
      {
        time: '2:00 PM',
        event: 'Wakefern Coffee Chats',
        location: '108',
      },
      {
        time: '3:00 PM',
        event: 'RAD workshop',
        location: '108',
      },
      {
        time: '4: 00 PM',
        event: 'IDEA workshop',
        location: '108',
      },
      {
        time: '4: 00 PM',
        event: 'game room',
        location: '109',
      },
      {
        time: '5: 00 PM',
        event: 'MLH workshops',
        location: '108',
      },
      
      { time: '8:00 PM', event: 'Dinner', location: 'MPR' },
      { time: '11:45 PM', event: 'STUDENT CENTER DOORS LOCK', location: 'Hacking Area' },
    ],
  },

  Sunday: {
    day: 'Sunday',
    times: [
      {
        time: '12:00 AM',
        event: 'Midnight Surprise',
        location: 'Hacking Area',
      },
      { time: '8:15 AM', event: 'Breakfast', location: 'MPR' },
      { time: '9:00 AM', event: 'STUDENT CENTER DOORS UNLOCK', location: 'Hacking Area ' },
      {
        time: '11:00 AM',
        event: 'Submissions Due',
        location: 'Hacking Area',
      },
      { time: '12:15 AM', event: 'Lunch', location: 'MPR' },
      { time: '1:00 PM', event: 'Judging Begins', location: 'Hacking Area' },
      {
        time: '3:30 PM',
        event: 'Closing Ceremony',
        location: 'Hacking Area',
      },
    ],
  },
};

export default function Schedule() {
  const [mapOpen, setMapOpen] = useState(false);
  return (
    <div
      className="relative z-10 mx-auto mb-20 flex w-full max-w-7xl justify-center"
      id="Schedule"
    >
      <div className="flex h-fit w-full max-w-7xl flex-col items-center ">
        <div className="text-text relative flex w-full flex-col items-center bg-[#F7F3D7]/95 px-14 pb-24 pt-36 md:flex-row md:items-start md:px-28 md:pb-32 md:pt-44">
          {/* F2026 vine frame.
              MEASURED, not guessed: the PNG is 1440x1112 but the painted frame
              only occupies the opaque box x=203..1197, y=169..909 - roughly a
              200px transparent margin on every side. Rendering it at inset-0
              would therefore draw the frame ~20% inside the card.
              So the image is scaled up and offset so its OPAQUE box lands on
              the card's edges:
                width  1440/994  = 144.9%   left -203/994  = -20.4%
                height 1112/740  = 150.3%   top  -169/740  = -22.8%
              border-image was tried first and rejected: the frame is hand-drawn
              and skewed (left bar is 4px thick at mid-height vs 43px at top),
              so a rectilinear 9-slice cannot represent it. */}
          <img
            src="/landing/F2026/schedule-frame.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute select-none"
            style={{
              width: '144.9%',
              height: '150.3%',
              left: '-20.4%',
              top: '-22.8%',
              maxWidth: 'none',
            }}
          />
          <ScheduleOfTheDay dayInfo={schedule['Saturday']} />
          <div className="bg-text h-2 w-20 rounded-sm md:invisible md:absolute" />
          <div className="flex w-full flex-col items-center">
            <ScheduleOfTheDay dayInfo={schedule['Sunday']} />
            <button
              onClick={() => {
                setMapOpen(true);
              }}
              className="hidden items-center
              justify-center rounded-lg border-x-4 border-y-2
              border-solid border-orange-500 bg-transparent text-xl
              text-orange-500 transition-all duration-100 hover:drop-shadow-[0_0_8px_orange]
                           "
            >
              <strong>Show Event Map</strong>
            </button>
          </div>
        </div>
      </div>

      {/* <Image
          src={"/landing/S2025/foodplaceholder.png"}
          width="300"
          height="300"
          className="w-[300px] lg:w-[400px] absolute right-0 -bottom-[200px] lg:-bottom-[300px] z-30"
          alt={'cool'}
          quality={50}
        /> */}


      <Transition appear show={mapOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setMapOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full min-w-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-[80vh] w-[90vw] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all md:w-[60vw]">
                  <button onClick={() => setMapOpen(false)}>
                    <Image
                      src="/map.png"
                      alt="bottom image"
                      layout="fill"
                      objectFit="contain"
                    ></Image>

                    <Image
                      src="/map.png"
                      alt="bottom image"
                      layout="fill"
                      objectFit="contain"
                    ></Image>
                  </button>
                  <div className="mt-4"></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
