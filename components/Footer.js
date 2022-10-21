import React from 'react'

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
      <p className="text-sm italic text-center pt-5 flex flex-col md:flex-row justify-center items-center">
        This is not an official site of the Brooklyn Museum. This is for the
        love of Art... and React.Js.
        <span className="text-xl ml-1 text-blue-400 animate-pulse">
          <FaReact />
        </span>
      </p>
      <div className="md:w-11/12 lg:w-10/12 xl:w-8/12 mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 p-5 ">
          <div>
            <div className="flex items-center border p-2 rounded">
              <div>
                <Logo />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black ml-2">
                Brooklin Museum
              </h1>
            </div>
            <div className="flex items-center mt-3 ">
              <p className="text-3xl mr-2">
                <MdLocationCity />
              </p>
              <p className="">
                200 Eastern Parkway Brooklyn, New York 11238-6052
              </p>
            </div>

            <div className="flex items-center mt-3 ">
              <p className="text-3xl mr-2">
                <GiDreamCatcher />
              </p>
              <p className="text-sm italic">
                The Brooklyn Museum stands on land that is part of the unceded,
                ancestral homeland of the Lenape (Delaware) people.
              </p>
            </div>
          </div>
          <div className="text-center md:text-end border-t border-t-slate-500 md:border-none mt-5 py-5 md:mt-0 md:py-0">
            <p>👋 Hello! I'm Samuel Marien - Web Developer</p>
            <p className="mt-5">You like this site?</p>
            <p>Hire Me!</p>
            <div className="flex mt-1 text-2xl justify-center md:justify-end space-x-5">
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
