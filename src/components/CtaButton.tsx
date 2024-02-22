import ctaSvg from '../assets/syb.svg';
import './CtaButton.css';

const CtaButton: React.FC<{ onClick(): void }> = ({ onClick }) => {
  return (
    <div className="cta-button" onClick={onClick}>
      <img src={ctaSvg} alt="Add mock" className="svg-button" />
    </div>
  );
};

export { CtaButton };
