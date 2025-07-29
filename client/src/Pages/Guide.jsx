import TopSection from "../Components/TopSection";
import GuideCard from "../Components/GuideCard";
import guidesData from "../Constants/guidesData";

export default function Guide() {
  return (
    <>
      <TopSection title="Guides" />
      <div className="flex flex-wrap justify-center">
        {guidesData.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>
    </>
  );
}
