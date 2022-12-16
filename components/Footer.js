import React from 'react'
import Link from 'next/link'

import Logo from './Logo'

import { GiDreamCatcher } from 'react-icons/gi'
import { MdLocationCity } from 'react-icons/md'
import {
  FaGithubSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaLaptopCode,
  FaReact
} from 'react-icons/fa'
import { DiMongodb } from 'react-icons/di'

const SocialLink = (props) => {
  const { href, icon } = props
  return (
    <a
      target="_blank"
      className="hover:text-slate-300  hover:animate-pulse hover:scale-125 transition-all duration-300"
      href={href}
      rel="noreferrer"
    >
      {icon}
    </a>
  )
}

const Footer = () => {
  return (
    <div className="bg-slate-800 text-slate-300">
      <div className="text-sm md:text-base italic text-center flex flex-wrap justify-center items-baseline">
        <p className="p-1  pt-2 flex flex-wrap justify-center items-center">
          This website is not produced, endorsed, supported, or affiliated with
          the
          <span className="underline font-semibold ml-1">
            <Link href={'https://www.brooklynmuseum.org/'}>
              <a target="_blank">Brooklyn museum</a>
            </Link>
            .
          </span>
        </p>
        <p className=" ml-0 sm:ml-1 flex items-center justify-center">
          Build with
          <span className="text-2xl mx-1 text-red-400 animate-pulse ">♥</span>,
          ReactJs
          <span className="text-xl mx-1 text-blue-400 animate-pulse inline-block">
            <FaReact />
          </span>
          and MongoDb
          <span className="text-xl ml-0.5 text-green-500 animate-pulse inline-block">
            <DiMongodb />
          </span>
        </p>
      </div>

      <div className="md:w-11/12 lg:w-10/12 xl:w-8/12 mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 px-5 pt-5 pb-2">
          <div className="flex flex-col md:items-start items-center pt-5 md:pt-0 border-t border-t-slate-500 md:border-none">
            <div className="flex items-center border p-2 rounded w-max">
              <div>
                <Logo />
              </div>
              <h1 className="text-2xl lg:text-3xl font-black ml-2">
                Brooklin Museum
              </h1>
            </div>

            <div className="flex items-center mt-3 ">
              <p className="text-3xl mr-2">
                <GiDreamCatcher />
              </p>
              <p className="text-xs md:text-sm italic">
                The Brooklyn Museum stands on land that is part of the unceded,
                ancestral homeland of the Lenape (Delaware) people.
              </p>
            </div>
          </div>
          <div className="text-center md:text-end border-t border-t-slate-500 md:border-none mt-5 py-5 md:mt-0 md:py-0">
            <p>👋 Hello! I'm Samuel Marien - Web Developer</p>
            <p className="">You like this site? Hire Me!</p>

            <div className="flex mt-5 text-2xl justify-center md:justify-end space-x-5">
              <SocialLink
                icon={<FaLaptopCode />}
                href="https://portfolio-samuel-marien.vercel.app/"
              />
              <SocialLink
                icon={<FaGithubSquare />}
                href="https://github.com/Samuel-Marien"
              />
              <SocialLink
                icon={<FaLinkedin />}
                href="https://www.linkedin.com/in/samuel-marien/"
              />
              <SocialLink
                icon={<FaTwitterSquare />}
                href="https://twitter.com/Samuel_Marien"
              />
            </div>
          </div>
        </div>
        <div className="border-t border-t-slate-500 text-center italic font-thin py-3 text-xl mx-5 md:mx-0">
          Il n’y a de vraiment beau que ce qui ne peut servir à rien ; tout ce
          qui est utile est laid. Théophile Gautier.
        </div>
      </div>
    </div>
  )
}

export default Footer
