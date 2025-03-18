import { Button } from "@pec/shared";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ContentItemProps {
  category: string;
  time: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ContentItem({
  category,
  time,
  title,
  description,
  image,
  link,
}: ContentItemProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background">
      <div className="aspect-video overflow-hidden">
        <Image
          src={image}
          width={500}
          height={300}
          alt={`Resource`}
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{category}</span>
          <span>•</span>
          <span>{time} min</span>
        </div>
        <h3 className="mt-2 text-xl font-bold">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>

        <Link href={link}>
          <Button variant="link" className="mt-4 p-0">
            더보기 <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
