import Image, { StaticImageData } from "next/image";

import { SubTitle } from "@/features/camp/ui";

interface ProcessItemProps {
  title: string;
  titleBgColor?: string;
  description: string;
  imageSrc: StaticImageData;
  imageDescription: string;
}

export function ProcessItem({
  title,
  titleBgColor,
  description,
  imageSrc,
  imageDescription,
}: ProcessItemProps) {
  return (
    <div className="flex-1">
      <SubTitle>
        <span className={`bg-[${titleBgColor}]`}>{title}</span>
      </SubTitle>
      <p className="mb-8 mt-6">{description}</p>

      <Image width={400} src={imageSrc} alt={title} />
      <div className="text-stone-400">{imageDescription}</div>
    </div>
  );
}
