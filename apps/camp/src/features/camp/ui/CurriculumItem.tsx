interface CurriculumItemProps {
  emoji: string;
  title: string;
  week: string;
  description: string;
}

export const CurriculumItem = ({
  emoji,
  title,
  week,
  description,
}: CurriculumItemProps) => {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="text-3xl">{emoji}</div>
      <div className="font-medium">
        <span className="rounded-lg bg-stone-200 p-1 font-normal">
          {week}주차
        </span>
        {` ${title}`}
      </div>
      <p className="">{description}</p>
    </div>
  );
};
