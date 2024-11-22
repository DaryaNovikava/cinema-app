import './Footer.css';
import vk from '../../assets/images/vk.svg';
import youtube from '../../assets/images/youtube.svg';
import ok from '../../assets/images/ok.svg';
import telegram from '../../assets/images/telegram.svg';

const Footer: React.FC = () => {
  return (
    <footer className="footer container">
      <div className="footer-container">
        <div className="footer-info">
          <p className="footer-info__company">LLC «Мультимедиа Визион»</p>
          <p className="footer-info__copyright">Все права защищены </p>
        </div>
        <ul className="social-list list-reset">
          <li className="social-list__item">
            <a href="#" className="social-list__link" aria-label="Вконтакте">
              <img src={vk} alt="Вконтакте" className="social-icon" />
            </a>
          </li>
          <li className="social-list__item">
            <a href="#" className="social-list__link" aria-label="Youtube">
              <img src={youtube} alt="Youtube" className="social-icon" />
            </a>
          </li>
          <li className="social-list__item">
            <a
              href="#"
              className="social-list__link"
              aria-label="Одноклассники"
            >
              <img src={ok} alt="Одноклассники" className="social-icon" />
            </a>
          </li>
          <li className="social-list__item">
            <a href="#" className="social-list__link" aria-label="Телеграм">
              <img src={telegram} alt="Телеграм" className="social-icon" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
