import React from "react";

function SelectWithAddOption() {
  return (
    <main class=" bg-white relative overflow-hidden h-screen">
      <div class="bg-white  flex relative z-20 items-center overflow-hidden">
        <div class="container mx-auto px-6 flex relative py-16">
          <div class="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
            <span class="w-20 h-2 bg-gray-800  mb-12"></span>
            <h1 class="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none text-gray-800">
              Be on
              <span class="text-5xl sm:text-7xl">Time</span>
            </h1>
            <p class="text-sm sm:text-base text-gray-700">
              Dimension of reality that makes change possible and
              understandable. An indefinite and homogeneous environment in which
              natural events and human existence take place.
            </p>
            <div class="flex mt-8">
              <a
                href="#"
                class="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400"
              >
                Get started
              </a>
              <a
                href="#"
                class="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white text-md"
              >
                Read more
              </a>
            </div>
          </div>
          <div class="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
            <img
              src="https://www.tailwind-kit.com/images/object/10.png"
              class="max-w-xs md:max-w-sm m-auto"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default SelectWithAddOption;
