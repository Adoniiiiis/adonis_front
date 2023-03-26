import Ranking from './Ranking';

export default function QuoteCard() {
  const category = 'quote';
  return (
    <div className="md:w-[700px] md:h-[200px] w-[350px] h-[275px] bg-white 2xl:mr-[100px] flex mb-8 rounded-md border-gray-400 border-[1px]">
      <div className="min-w-[45px] bg-gray-100 flex justify-center pt-3 rounded-l-md">
        20
      </div>
      <div className="flex-col w-full mt-[50px]">
        <h1 className="italic flex justify-center mb-3 text-[1.050em]">
          "Ne T'arrête pas quand tu es fatigué, arrête-toi quand tu as terminé"
        </h1>
        <div className="flex justify-center items-center mb-2">
          <p className="text-gray-500 text-[0.8em]">Auteur:</p>
          <p className="text-[0.8em] ml-[5px]">David Goggins</p>
        </div>
        <div className="flex justify-center">
          <p className="text-gray-500 text-[0.8em]">Livre:</p>
          <p className="text-[0.8em] ml-[5px]">Pas de livre omg</p>
        </div>
      </div>
      <Ranking postId={1} category={category} />
    </div>
  );
}
