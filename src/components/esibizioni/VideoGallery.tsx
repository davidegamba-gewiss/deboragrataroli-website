'use client';

import { useState, useMemo } from 'react';
import VideoCard from './VideoCard';
import VideoFilters from './VideoFilters';
import { filtraVideo, getAnniUnici, getCategorie } from '@/utils/esibizioniData';
import type { CategoriaEsibizione } from '@/data/esibizioni';

export default function VideoGallery() {
  const [selectedAnno, setSelectedAnno] = useState<number | null>(null);
  const [selectedCategoria, setSelectedCategoria] =
    useState<CategoriaEsibizione | null>(null);

  const anni = useMemo(() => getAnniUnici(), []);
  const categorie = useMemo(() => getCategorie(), []);

  const videoFiltrati = useMemo(
    () => filtraVideo(selectedAnno, selectedCategoria),
    [selectedAnno, selectedCategoria]
  );

  const handleReset = () => {
    setSelectedAnno(null);
    setSelectedCategoria(null);
  };

  return (
    <div>
      {/* Filters */}
      <VideoFilters
        anni={anni}
        categorie={categorie}
        selectedAnno={selectedAnno}
        selectedCategoria={selectedCategoria}
        onAnnoChange={setSelectedAnno}
        onCategoriaChange={setSelectedCategoria}
        onReset={handleReset}
      />

      {/* Results Count */}
      <p className="mb-6 text-sm text-gray-500">
        {videoFiltrati.length}{' '}
        {videoFiltrati.length === 1 ? 'video trovato' : 'video trovati'}
        {(selectedAnno || selectedCategoria) && (
          <span className="ml-1">
            {selectedAnno && `per ${selectedAnno}`}
            {selectedAnno && selectedCategoria && ', '}
            {selectedCategoria && `categoria ${selectedCategoria}`}
          </span>
        )}
      </p>

      {/* Video Grid */}
      {videoFiltrati.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-base text-gray-500">
            Nessun video trovato per questa selezione.
          </p>
          <button
            onClick={handleReset}
            className="mt-4 text-sm font-medium text-purple-medium hover:text-purple-dark hover:underline"
          >
            Mostra tutti i video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videoFiltrati.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
              titolo={video.titolo}
              youtubeUrl={video.youtubeUrl}
              descrizione={video.descrizione}
              anno={video.anno}
              categoria={video.categoria}
              playlist={video.playlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}
