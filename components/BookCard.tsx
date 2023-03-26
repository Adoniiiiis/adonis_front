import Image from 'next/image';

export default function BookCard({ bookCoverUrl }: any) {
  return (
    <div className="w-[600px] h-[200px] bg-white mr-[100px] flex mb-8">
      <div className="w-[45px] bg-gray-100 flex justify-center pt-3">50</div>
      <div className="mt-[12px] ml-[15px] relative h-[175px] w-[120px]">
        <Image layout={'fill'} src={bookCoverUrl} alt="bookCover" />
      </div>
      <div className="flex-col mt-[13px] ml-[15px]">
        <h1 className="underline underline-offset-4">
          Book Title: Book SubTitle
        </h1>
        <p className="mt-1 text-gray-500 text-[0.8em]">Book Author</p>
        <div className="flex mt-[105px] ml-[227px]">
          <p className="text-gray-500 text-[0.8em]">Année:</p>
          <p className="text-[0.8em] ml-[5px]">2020</p>
          <p className="text-gray-500 text-[0.8em] ml-4">Langue:</p>
          <p className="text-[0.8em] ml-[5px]">FR</p>
        </div>
      </div>
    </div>
  );
}
