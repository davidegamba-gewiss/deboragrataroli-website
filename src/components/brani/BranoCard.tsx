'use client';

import Image from 'next/image';
import Link from 'next/link';

export interface BranoCardProps {
  id: string;
  titolo: string;
  slug: string;
  cover: string;
  categoria?: string;
  descrizione?: string;
}

export default function BranoCard({
  titolo,
  slug,
  cover,
  categoria,
}: BranoCardProps) {
  return (
    <Link
      href={`/brani/${slug}`}
      className="group block h-full bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2"
    >
      {/* Cover Image */}
      <div className="relative aspect-square overflow-hidden bg-neutral-light">
        <Image
          src={cover}
          alt={`Cover di ${titolo}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-95"
        />
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="font-sans text-base md:text-lg font-semibold text-neutral-dark line-clamp-2 mb-2 transition-colors duration-200 group-hover:text-purple-medium">
          {titolo}
        </h3>
        {categoria && (
          <span className="block text-xs text-purple-dark italic opacity-80">
            {categoria}
          </span>
        )}
      </div>
    </Link>
  );
}
