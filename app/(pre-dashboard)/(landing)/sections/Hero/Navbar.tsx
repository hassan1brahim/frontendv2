'use client';

import React, { useEffect, useState } from 'react';
import { MdOutlineMenu } from 'react-icons/md';
import { Fragment } from 'react';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { fredoka } from '@/app/ui/fonts';
import clsx from 'clsx';

function scrollToSectionName(sectionName: string) {
  // Home is the top of the page, not a section - the only id="Home" is in
  // Hero.tsx and the F2026 landing renders Hero2
  if (sectionName === 'Home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const section = document.getElementById(sectionName);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function MenuItem(props: { sectionName: string }) {
  const { sectionName } = props;
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? 'bg-f23-lightGreen text-white' : 'text-gray-900'
          }
                    group flex w-full items-center rounded-md px-2 py-2 text-lg`}
          onClick={() => scrollToSectionName(sectionName)}
        >
          {sectionName}
        </button>
      )}
    </Menu.Item>
  );
}
function OtherPageMenuItem(props: { sectionName: string }) {
  const { sectionName } = props;
  const history = useRouter();
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? 'bg-f23-lightGreen text-white' : 'text-gray-900'
          }
                    group flex w-full items-center rounded-md px-2 py-2 text-lg`}
          onClick={() => {
            history.push('/contact');
          }}
        >
          {sectionName}
        </button>
      )}
    </Menu.Item>
  );
}

function CollapsedMenu() {
  const pathname = usePathname();
  return (
    <div
      className={clsx(
        'bg-f23-mediumGreen absolute right-28 top-4 z-40 rounded-md text-right lg:hidden',
        {
          hidden: pathname !== '/',
        },
      )}
    >
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md px-2 py-2 text-sm font-medium text-white hover:bg-black hover:bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <MdOutlineMenu color="white" size={40} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <MenuItem sectionName="Home" />
              <MenuItem sectionName="About" />
              <MenuItem sectionName="Schedule" />
              <MenuItem sectionName="FAQ" />
              {/* no Team entry - those sections are commented out in page.tsx */}
              {/* <MenuItem sectionName="Sponsors" /> */}
              {<OtherPageMenuItem sectionName="Contact" />}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

/**
 * TODO: Make navbar sticky and then change the glow to the section that is currently present ??
 */

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  const sections = ['Home', 'About', 'Schedule', 'FAQ'];

  // the nav is fixed and its links are white, which is 1.26:1 on the pale
  // ground below the hero. This fades a dark plate in once you scroll past it.
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const onScroll = () =>
      setPastHero(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`z-40 flex w-full justify-end
        md:fixed ${fredoka.className}`}
      id="navbar"
    >
      {/* pointer-events-none so it never swallows a nav click */}
      <div
        aria-hidden="true"
        className={clsx(
          'pointer-events-none absolute inset-x-0 top-0 hidden h-28 transition-opacity duration-300 lg:block',
          pastHero ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(20,34,16,0.72) 0%, rgba(20,34,16,0.45) 55%, rgba(20,34,16,0) 100%)',
        }}
      />
      <div
        style={{ left: '5%', top: '24px' }}
        className="hover:drop-shadow-inner absolute z-50 w-24 hover:scale-105 sm:w-24 md:w-36 lg:w-36 "
        onClick={() => router.push('/')}
      >
        <Image
          width={200}
          height={200}
          src="/landing/F2026/hackru-logo-f26.png"
          alt="generic hackru logo"
        />
      </div>

      <CollapsedMenu />
      <div
        className="absolute right-20 top-0 z-40 hidden w-full
        justify-end pr-2 pt-4 text-sm font-light text-dark_red-100 sm:pr-4 sm:pt-6 sm:text-base md:pr-6 md:pt-8 md:text-lg lg:flex lg:pr-8 lg:pt-10 lg:text-xl"
      >
        {isHomePage && (
          <div className="relative flex items-center justify-start gap-8 md:gap-12 lg:gap-16">
            {sections.map((section) => (
              <button
                style={{
                  color: 'white',
                  textTransform: 'none',
                }}
                className="glow-center whitespace-nowrap text-sm font-semibold transition-transform [text-shadow:0_2px_6px_rgba(0,0,0,0.65)] hover:scale-105 md:text-base lg:text-lg"
                onClick={() => scrollToSectionName(section)}
                key={section}
              >
                {section}
              </button>
            ))}
            <Link href="https://linktr.ee/thehackru">
              <button
                style={{
                  color: 'white',
                  textTransform: 'none',
                }}
                className="glow-center whitespace-nowrap text-sm font-semibold transition-transform [text-shadow:0_2px_6px_rgba(0,0,0,0.65)] hover:scale-105 md:text-base lg:text-lg"
              >
                Contact
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
