import { useState, useEffect } from 'react';

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {  // Adjust the value to when the button should appear
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      id="myBtn"
      title="Go to top"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: isVisible ? 'block' : 'none',
        backgroundColor: '#bcd1db',
        color: 'black',
        border: 'none',
        borderRadius: '50%',
        padding: '10px 15px 10px 15px',
        cursor: 'pointer',
      }}
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
};

export default TopButton;