import Image from 'next/image';

export default function VideoCard({ videoUrl }: any) {
  return (
    <div className="md:w-[700px] md:h-[200px] w-[350px] h-[245px] bg-white 2xl:mr-[100px] flex mb-8">
      <div className="min-w-[45px] bg-gray-100 flex justify-center pt-3">
        70
      </div>
      <div className="md:flex flex-col">
        <div className="mt-[12px] ml-[15px] relative">
          <iframe width="275" height="175px" src={videoUrl}></iframe>
        </div>
        <div className="flex-col mt-[13px] ml-[15px] md:-mt-[160px] md:ml-[300px]">
          <div className="flex -mt-[7px]">
            <p className="text-gray-500 text-[0.8em]">Youtuber:</p>
            <p className="text-[0.8em] ml-[5px]">COCOBONGO</p>
          </div>
          <div className="flex mt-[2px]">
            <p className="text-gray-500 text-[0.8em]">Genre:</p>
            <p className="text-[0.8em] ml-[5px]">Musique</p>
          </div>
        </div>
      </div>
    </div>
  );
}
