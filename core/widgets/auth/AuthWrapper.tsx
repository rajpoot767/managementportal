import Image from "next/image";
import Link from "next/link";

const AuthWrapper: React.FC<AuthWrapperProps> = (props) => {
  const movies = [
    {
      id: 1,
      title: "img 1 ",
      img: "https://styxsportscdn.azureedge.net/styxsports-public/tours/1729575929968-39181708.jpg",
    },
    {
      id: 2,
      title: "img 2",
      img: "https://styxsportscdn.azureedge.net/styxsports-public/tours/1729838141935-385325324.jpg",
    },
    {
      id: 3,
      title: "img 3",
      img: "https://styxsportscdn.azureedge.net/styxsports-public/tours/1729581523627-158049750.jpg",
    },
    {
      id: 4,
      title: "img 4",
      img: "https://styxsportscdn.azureedge.net/styxsports-public/tours/1729771304377-189901343.jpg",
    },
    {
      id: 5,
      title: "img 5",
      img: "https://styxsportscdn.azureedge.net/styxsports-public/tours/1729767861998-361701821.jpg",
    },
    {
      id: 6,
      title: "img 6",
      img: "https://styxsportscdn.azureedge.net/styxsports-public/tours/1729925062596-118090327.jpg",
    },
    {
      id: 7,
      title: "img 7",
      img: "https://styxsportscdn.azureedge.net/styxsports-public/tours/1729925987626-535114225.jpg",
    },
    {
      id: 8,
      title: "img 8",
      img: "https://styxsportscdn.azureedge.net/styxsports-public/tours/1731587303597-899515576.jpg",
    },
    {
      id: 9,
      title: "img 9",
      img: "https://styxsportscdn.azureedge.net/styxsports-public/tours/1731308014237-888311809.jpg",
    },
    {
      id: 10,
      title: "img 10",
      img: "https://styxsportscdn.azureedge.net/styxsports-public/tours/1731489643470-349914609.jpg",
    },
    {
      id: 11,
      title: "img 11",
      img: "https://styxsportscdn.azureedge.net/styxsports-public/tours/1732264040736-442965259.jpg",
    },
    {
      id: 12,
      title: "img 12",
      img: "https://styxsportscdn.azureedge.net/styxsports-public/tours/1731132635742-520300653.jpg",
    },
  ];
  // const country = CountryCodes.find(x=>x.CountryCode.toLowerCase()==countryCode.toLowerCase());
  return (
    <div className=" bg-slate-950">
      <div className="container">
        <div className="flex justify-start items-center">
          <div className="h-[75px] w-[200px] flex items-start  pt-4">
            <div>
              <Image
                width={250}
                height={40}
                src="/assets/logo.png"
                alt="Logo"
              />
            </div>
          </div>
        </div>
        <div className="relative items-start grid grid-cols-1 lg:grid-cols-2 gap-x-14 bg-gradient-to-r mt-8 lg:mt-10 from-slate-950 to-slate-950 justify-between min-h-screen overflow-hidden">
          <div className="col-span-1 flex flex-col justify-start items-start gap-y-7 row-start-1 col-start-1">


            {/* Heading */}
            <div className="text-body-200">
              <h1 className="text-3xl lg:text-4xl font-bold italic">
                Prediction Management Portal
              </h1>
            </div>

            {/* Movie Images */}
            <div className="grid grid-cols-4 bg-slate-950 shadow-md gap-4 max-w-full relative">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="overflow-hidden bg-black border border-gray-800 rounded "
                >
                  <img
                    src={movie.img}
                    alt={movie.title}
                    className="object-cover w-36 h-52"
                  />
                </div>
              ))}

              <div className="bg-gradient-to-r from-transparent to-slate-950 w-full h-full absolute top-0 left-0"></div>

              <div className="bg-gradient-to-b  from-transparent  to-slate-950 w-full h-full absolute top-0 left-0"></div>
            </div>
          </div>

          {/* Right Section */}

          <div className="col-span-1 text-center min-h-screen flex flex-col gap-6 row-start-1 col-start-1 z-10 mt-[86px] lg:mt-10 lg:row-start-1 lg:col-start-2 lg:mb-0">
            {/* Main Content */}
            <div className="">
              {props.children}
            </div>

            {/* Footer */}
            <footer className="justify-between text-white hidden">
              <div><Link href={"mailto:support@styxsports.com"}>
                support@styxsports.com
              </Link></div>
              <div className="flex gap-5">
                <Link href="https://www.facebook.com/styxsports" target="_blank">
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 256 256"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                  >
                    {/* Facebook Icon */}
                    <path
                      d="M256,128 C256,57.3075 198.6925,0 128,0 C57.3075,0 0,57.3075 0,128 C0,191.8885 46.80775,244.8425 108,254.445 L108,165 L75.5,165 L75.5,128 L108,128 L108,99.8 C108,67.72 127.1095,50 156.3475,50 C170.35175,50 185,52.5 185,52.5 L185,84 L168.8595,84 C152.95875,84 148,93.86675 148,103.98925 L148,128 L183.5,128 L177.825,165 L148,165 L148,254.445 C209.19225,244.8425 256,191.8885 256,128"
                      fill="#ffff"
                    ></path>
                  </svg>
                </Link>
                <Link href="https://www.instagram.com/styxsports_/" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="currentColor"
                  >
                    <title>Instagram</title>
                    <g>
                      <rect width="24" height="24" fill="none" />
                      <path
                        d="M12 2.16c-2.85 0-3.2.01-4.31.06-1.1.05-1.85.22-2.51.47a5.1 5.1 0 0 0-1.85 1.21 5.1 5.1 0 0 0-1.2 1.85c-.25.66-.42 1.41-.47 2.51-.05 1.11-.06 1.46-.06 4.31s.01 3.2.06 4.31c.05 1.1.22 1.85.47 2.51a5.1 5.1 0 0 0 1.21 1.85 5.1 5.1 0 0 0 1.85 1.2c.66.25 1.41.42 2.51.47 1.11.05 1.46.06 4.31.06s3.2-.01 4.31-.06c1.1-.05 1.85-.22 2.51-.47a5.1 5.1 0 0 0 1.85-1.21 5.1 5.1 0 0 0 1.2-1.85c.25-.66.42-1.41.47-2.51.05-1.11.06-1.46.06-4.31s-.01-3.2-.06-4.31c-.05-1.1-.22-1.85-.47-2.51a5.1 5.1 0 0 0-1.21-1.85 5.1 5.1 0 0 0-1.85-1.2c-.66-.25-1.41-.42-2.51-.47-1.11-.05-1.46-.06-4.31-.06zm0 1.69c2.78 0 3.1.01 4.2.05 1.02.05 1.57.21 1.94.36.49.2.84.43 1.21.8.37.37.6.72.8 1.21.15.37.31.92.36 1.94.04 1.1.05 1.42.05 4.2s-.01 3.1-.05 4.2c-.05 1.02-.21 1.57-.36 1.94a2.73 2.73 0 0 1-.8 1.21 2.73 2.73 0 0 1-1.21.8c-.37.15-.92.31-1.94.36-1.1.04-1.42.05-4.2.05s-3.1-.01-4.2-.05c-1.02-.05-1.57-.21-1.94-.36a2.73 2.73 0 0 1-1.21-.8 2.73 2.73 0 0 1-.8-1.21c-.15-.37-.31-.92-.36-1.94-.04-1.1-.05-1.42-.05-4.2s.01-3.1.05-4.2c.05-1.02.21-1.57.36-1.94a2.73 2.73 0 0 1 .8-1.21 2.73 2.73 0 0 1 1.21-.8c.37-.15.92-.31 1.94-.36 1.1-.04 1.42-.05 4.2-.05z"
                      />
                      <path
                        d="M12 5.84a6.16 6.16 0 1 0 0 12.31 6.16 6.16 0 0 0 0-12.31zm0 10.2a4.04 4.04 0 1 1 0-8.08 4.04 4.04 0 0 1 0 8.08zM18.41 5.7a1.43 1.43 0 1 0 0-2.85 1.43 1.43 0 0 0 0 2.85z"
                      />
                    </g>
                  </svg>

                </Link>

              </div>
            </footer>
          </div>

        </div>
      </div>
    </div>
  );
};
export default AuthWrapper;
