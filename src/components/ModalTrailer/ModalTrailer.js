import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import './ModalTrailer.css';
const ModalTrailer = ({ trailerUrl, isOpen, onClose, }) => {
    const videoRef = useRef(null);
    // Преобразование обычного URL в URL для встраивания
    const getModifyUrl = (url) => {
        const videoId = url.split('v=')[1];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
    };
    // При клике на модальное окно ставим видео на паузу
    const handleModalClick = () => {
        const iframe = videoRef.current;
        if (iframe) {
            // Отправляем команду iframe с YouTube остановить видео
            iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
        onClose();
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "modal_trailer", onClick: handleModalClick, children: _jsxs("div", { className: "modal-content_trailer", onClick: (e) => e.stopPropagation(), children: [_jsx("iframe", { ref: videoRef, width: "100%", height: "100%", src: getModifyUrl(trailerUrl), frameBorder: "0", allow: "autoplay; encrypted-media", allowFullScreen: true, title: "Trailer" }), _jsx("button", { className: "modal-button", onClick: onClose })] }) }));
};
export default ModalTrailer;
