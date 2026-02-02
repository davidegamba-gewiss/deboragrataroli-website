'use client';

import { FaUndo } from 'react-icons/fa';
import type { CategoriaEsibizione } from '@/data/esibizioni';

export interface VideoFiltersProps {
  anni: number[];
  categorie: CategoriaEsibizione[];
  selectedAnno: number | null;
  selectedCategoria: CategoriaEsibizione | null;
  onAnnoChange: (anno: number | null) => void;
  onCategoriaChange: (categoria: CategoriaEsibizione | null) => void;
  onReset: () => void;
}

export default function VideoFilters({
  anni,
  categorie,
  selectedAnno,
  selectedCategoria,
  onAnnoChange,
  onCategoriaChange,
  onReset,
}: VideoFiltersProps) {
  const hasFilters = selectedAnno !== null || selectedCategoria !== null;

  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
      {/* Anno Filter */}
      <div className="flex-1 sm:max-w-xs">
        <label
          htmlFor="filter-anno"
          className="mb-2 block text-sm font-semibold text-neutral-dark"
        >
          Anno
        </label>
        <select
          id="filter-anno"
          value={selectedAnno ?? ''}
          onChange={(e) =>
            onAnnoChange(e.target.value ? Number(e.target.value) : null)
          }
          className="w-full rounded border border-gray-300 bg-neutral-light/50 px-4 py-2.5 text-sm text-neutral-dark transition-colors hover:border-purple-medium focus:border-purple-medium focus:outline-none focus:ring-2 focus:ring-purple-light/50"
        >
          <option value="">Tutti gli anni</option>
          {anni.map((anno) => (
            <option key={anno} value={anno}>
              {anno}
            </option>
          ))}
        </select>
      </div>

      {/* Categoria Filter */}
      <div className="flex-1 sm:max-w-xs">
        <label
          htmlFor="filter-categoria"
          className="mb-2 block text-sm font-semibold text-neutral-dark"
        >
          Categoria
        </label>
        <select
          id="filter-categoria"
          value={selectedCategoria ?? ''}
          onChange={(e) =>
            onCategoriaChange(
              e.target.value ? (e.target.value as CategoriaEsibizione) : null
            )
          }
          className="w-full rounded border border-gray-300 bg-neutral-light/50 px-4 py-2.5 text-sm text-neutral-dark transition-colors hover:border-purple-medium focus:border-purple-medium focus:outline-none focus:ring-2 focus:ring-purple-light/50"
        >
          <option value="">Tutte le categorie</option>
          {categorie.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      {hasFilters && (
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 rounded border border-purple-medium px-4 py-2.5 text-sm font-medium text-purple-medium transition-colors hover:bg-purple-light/10 focus:outline-none focus:ring-2 focus:ring-purple-light/50 sm:self-end"
          aria-label="Ripristina tutti i filtri"
        >
          <FaUndo className="h-3 w-3" aria-hidden="true" />
          Ripristina
        </button>
      )}
    </div>
  );
}
