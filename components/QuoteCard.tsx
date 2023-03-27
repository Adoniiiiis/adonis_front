import Ranking from './Ranking';

export default function QuoteCard({ quoteData }: any) {
  const category = 'quote';
  const { id, quote, author, ranking } = quoteData;
  return (
    <div className="md:w-[700px] md:h-[200px] w-[380px] h-[275px] bg-white 2xl:mr-[100px] flex mb-8 rounded-md border-gray-400 border-[1px]">
      <div className="min-w-[45px] bg-gray-100 flex justify-center pt-3 rounded-l-md">
        {ranking}
      </div>
      <div className="flex-col w-full mt-[50px]">
        <h1 className="italic flex justify-center mb-3 text-[1.050em]">
          {quote}
        </h1>
        <div className="flex justify-center items-center mb-2">
          <p className="text-gray-500 text-[0.8em]">Auteur:</p>
          <p className="text-[0.8em] ml-[5px]">{author}</p>
        </div>
        <div className="flex justify-center">
          <p className="text-gray-500 text-[0.8em]">Livre:</p>
          <p className="text-[0.8em] ml-[5px]">Pas de livre omg</p>
        </div>
      </div>
      <Ranking postId={id} category={category} />
    </div>
  );
}
