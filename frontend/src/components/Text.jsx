import React, { useState, useEffect } from 'react';

export default function Text({ fullText }) {
  const [text, setText] = useState('');

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
    
      if (currentIndex < fullText.length -1) {
        setText((prevText) => prevText + fullText[currentIndex]);
        currentIndex += 1;
      } else {
        currentIndex = 0
        clearInterval(typingInterval); 
      }
    }, 80); 

    return () => clearInterval(typingInterval); 
  }, [fullText]);

  return (
    <div
      style={{
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Sriracha',
        fontWeight: '800',
        fontSize: '32px',
        color: '#fafafa',
        marginTop: '20vh',
      }}
    >
      {text}
    </div>
  );
}


