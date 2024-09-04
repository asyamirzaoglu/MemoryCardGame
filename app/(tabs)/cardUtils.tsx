const images = [
    require('../../assets/images/icon1.png'),
    require('../../assets/images/icon2.png'),
    require('../../assets/images/icon3.png'),
    require('../../assets/images/icon4.png'),
    require('../../assets/images/icon5.png'),
    require('../../assets/images/icon6.png'),
    require('../../assets/images/icon7.png'),
    require('../../assets/images/icon8.png'),
    require('../../assets/images/icon9.png'),
    require('../../assets/images/icon10.png'),
    require('../../assets/images/icon11.png'),
    require('../../assets/images/icon12.png'),
    require('../../assets/images/icon13.png'),
    require('../../assets/images/icon14.png'),
    require('../../assets/images/icon15.png'),
    require('../../assets/images/icon16.png'),
    require('../../assets/images/icon17.png'),
    require('../../assets/images/icon18.png'),
    require('../../assets/images/icon19.png'),
    require('../../assets/images/icon20.png'),
  ];
  
  export interface Card {
    id: number;
    icon: any;
    isFlipped: boolean;
    isMatched: boolean;
  }
  
  export const generateCards = (numCards: number): Card[] => {
    const selectedImages = images.slice(0, numCards / 2);
    const cards: Card[] = selectedImages.concat(selectedImages).map((icon, index) => ({
      id: index,
      icon,
      isFlipped: false,
      isMatched: false,
    }));
  
    return cards.sort(() => Math.random() - 0.5);
  };
  