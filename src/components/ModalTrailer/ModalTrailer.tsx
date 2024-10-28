import React, { useRef } from 'react';
import './ModalTrailer.css';

interface ModalTrailerProps {
  trailerUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const ModalTrailer: React.FC<ModalTrailerProps> = ({
  trailerUrl,
  isOpen,
  onClose,
}) => {
  const videoRef = useRef<HTMLIFrameElement>(null);

  // Преобразование обычного URL в URL для встраивания
  const getModifyUrl = (url: string) => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
  };

  // При клике на модальное окно ставим видео на паузу
  const handleModalClick = () => {
    const iframe = videoRef.current;
    if (iframe) {
      // Отправляем команду iframe с YouTube остановить видео
      iframe.contentWindow?.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        '*',
      );
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal_trailer" onClick={handleModalClick}>
      <div
        className="modal-content_trailer"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          ref={videoRef}
          width="100%"
          height="100%"
          src={getModifyUrl(trailerUrl)}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Trailer"
        ></iframe>
        <button className="modal-button" onClick={onClose}></button>
      </div>
    </div>
  );
};

export default ModalTrailer;
