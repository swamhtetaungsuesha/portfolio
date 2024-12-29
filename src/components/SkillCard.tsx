const SkillCard = ({ data, index }) => {
  return (
    <div className="w-80 p-10 h-screen flex flex-col group hover:bg-white/10 transition-all duration-700">
      <div className="py-10 relative">
        <h2 className="h3">0 {index}</h2>
        <span className="block h-0.5 w-5 group-hover:w-12 bg-accent absolute bottom-0 transition-all duration-700"></span>
      </div>
      <div className="h-72 flex flex-col justify-between">
        <div className="flex-1 flex flex-col justify-end">
          <div className="w-32 h-32 text-6xl text-white/30 rounded-full border-2 border-white/10 border-b-accent border-l-accent flex items-center justify-center mb-6">
            {data.icon}
          </div>
        </div>
        <h2 className="text-white text-2xl font-semibold">{data.name}</h2>
      </div>
      <div className="flex-1 justify-start flex items-center">
        <div className="flex flex-row items-center gap-x-1">
          {Array(data.max)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className={`h-0.5 w-5 transition-colors
                  ${data.min > index ? "bg-accent" : "bg-gray-600"}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
