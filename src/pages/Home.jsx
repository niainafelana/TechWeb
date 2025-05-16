import nikesbvert from "../assets/image/nike.png";
import { ArrowRight } from "lucide-react";
import rectangle1 from "../assets/image/Rectangle1.png";

export default function MainContent() {
  return (
    <main className="flex-1">
      <div className="container pb-8 space-y-4">
        {/* Hero Section */}
        <div
          className="w-full max-w-[1116px] h-auto md:h-[427px] ml-auto mr-38 mt-4 rounded-[40px] bg-gray-100 p-6
  md:p-8 flex flex-col md:flex-row justify-between items-center md:gap-8 gap-8"
        >
          <div className="space-y-2 text-center md:text-left ml-6 md:ml-6">
            <p className="text-orange-500 font-bold text-[48px] leading-[50px] tracking-[-1px] md:text-[36px] md:leading-[44px]">
              25% OFF
            </p>
            <p className="text-black font-bold text-[64px] leading-[68px] tracking-[-1px] md:text-[48px] md:leading-[56px] sm:text-[36px] sm:leading-[44px]">
              Summer Sale
            </p>
            <p className="text-gray-600 font-normal text-[20px] leading-[30px] md:text-[18px] md:leading-[28px] sm:text-[16px] sm:leading-[24px]">
              Discover our summer styles with discount
            </p>
            <button
              className="bg-black mt-10 text-white hover:bg-black/90 rounded-[10px]
             w-[283px] h-[64px] font-bold flex items-center justify-center gap-[10px] px-[80px] py-[20px]"
            >
              Shop Now
              <ArrowRight size={24} />
            </button>
          </div>
          <div className="relative w-[300px] h-[200px] md:w-[400px] md:h-[300px] md:absolute md:top-[100px] md:left-[870px]">
            <img
              src={nikesbvert}
              alt="Green and white sneaker"
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        <div className="mx-auto my-4 w-[1116px]">
          <h2 className="w-[368px] h-[48px] ml-4 text-xl font-bold mb-4 ml-16">
            Explore our latest drops
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-max ml-20 -mt-8">
            <div className="bg-transparent rounded-lg p-4 w-[261px] h-[390px] relative flex flex-col gap-[18px]">
              <div className="w-[261] h-[284px] relative bg-gray-50 rounded-[18px] p-2">
                <img
                  src={rectangle1}
                  alt="Off-White sneakers"
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <p className="font-medium">Off-White</p>
                <p className="text-sm text-gray-600">
                  Out Of Office "Ooo" sneakers
                </p>
                <p className="font-medium mt-1">$775</p>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-transparent rounded-lg p-4 w-[261px] h-[390px] relative flex flex-col gap-[18px]">
              <div className="w-[261] h-[284px] relative bg-gray-50 rounded-lg p-2">
                <img
                  src={rectangle1}
                  alt="Off-White sneakers"
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <p className="font-medium">Off-White</p>
                <p className="text-sm text-gray-600">
                  Out Of Office "Ooo" sneakers
                </p>
                <p className="font-medium mt-1">$775</p>
              </div>
            </div>
            <div className="bg-transparent rounded-lg p-4 w-[261px] h-[390px] relative flex flex-col gap-[18px]">
              <div className="w-[261] h-[284px] relative bg-gray-50 rounded-lg p-2">
                <img
                  src={rectangle1}
                  alt="Off-White sneakers"
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <p className="font-medium">Off-White</p>
                <p className="text-sm text-gray-600">
                  Out Of Office "Ooo" sneakers
                </p>
                <p className="font-medium mt-1">$775</p>
              </div>
            </div>
            {/* Product 4 */}
            <div className="bg-transparent rounded-lg p-4 w-[261px] h-[390px] relative flex flex-col gap-[18px]">
              <div className="w-[261] h-[284px] relative bg-gray-50 rounded-lg p-2">
                <img
                  src={rectangle1}
                  alt="Off-White sneakers"
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <p className="font-medium">Off-White</p>
                <p className="text-sm text-gray-600">
                  Out Of Office "Ooo" sneakers
                </p>
                <p className="font-medium mt-1">$775</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
