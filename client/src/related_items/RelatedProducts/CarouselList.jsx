import React, { useState, useEffect, useContext } from 'react';
import { ProdPageContext } from '../../product_page.jsx';
import { RelatedCarouselContext } from './ProductDetails.jsx';
import StarRating from '../../shared_components/StarRating.jsx';
import ComparisonModal from './ComparisonModal.jsx';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

const RelatedCarousel = () => {
  const {prod_id, setProd, prod_name, setShowModal, setModalBodyContent, setModalHeaderContent} = useContext(ProdPageContext);
  const {productDetails} = useContext(RelatedCarouselContext);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const display = productDetails.slice(currentImageIdx, (currentImageIdx + 4));
  const maxDisplay = productDetails.length - 4;
  const placeholder = 'http://placecorgi.com/260/180';

  const nextSlide = () => {
    setCurrentImageIdx(currentImageIdx === maxDisplay ? currentImageIdx : currentImageIdx + 1);
  };

  const prevSlide = () => {
    setCurrentImageIdx(currentImageIdx === 0 ? 0 : currentImageIdx - 1);
  };

  useEffect(() => {
    setCurrentImageIdx(0);
  }, [productDetails]);

  const handleModalClick = (id) => {
    setModalHeaderContent('COMPARING')
    setModalBodyContent(<ComparisonModal mainId={prod_id} relatedId={id}/>);
    setShowModal(true);
  }

  const changeProductID = (id) => {
    setProd(id);
  }

  return (
    <CarouselContainer className='CarouselContainer'>
      {
        currentImageIdx !== 0 ?
        <Arrow icon={faAngleLeft} onClick={() => prevSlide()}/> : <ArrowTransparent icon={faAngleLeft}/>
      }
      {display.map((details, index) => {
        return (
          <IndividualCardStyle className='CardStyle' key={index}>
            <ImageWrapper className='ImageWrapper'>
              <ImageStyle className='ImageStyle'
                src={details.images === null ? placeholder : details.images}
                onClick={(id) => changeProductID(details.id)}
              />
              <ButtonStyle onClick={() => handleModalClick(details.id)}> <FontAwesomeIcon icon={faStar}/></ButtonStyle>
            </ImageWrapper>
            <DetailsWrapper className='Details'>
              <InfoStyle className='InfoStyle'>
                <span>{details.names}</span>
                <CategoryStyle>{details.categories}</CategoryStyle>
                <span>{StarRating(details.ratings.avgRating)}</span>
              </InfoStyle>
                <PriceStyle>${details.prices}</PriceStyle>
            </DetailsWrapper>
          </IndividualCardStyle>
        )
      })}
      {
        (currentImageIdx !== maxDisplay && display.length >= 4) ?
        <Arrow icon={faAngleRight} onClick={() => nextSlide()}/> :
        <ArrowTransparent icon={faAngleRight} fill='transparent'/>
      }
    </CarouselContainer>
  )
}

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: flex-start;
  width: 100%;
`;

const IndividualCardStyle = styled.div`
  display: block;
  margin: 15px;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 240px;
  height: fit-content;
  overflow: hidden;
  border-radius: 3px;
  border-style: solid;
  border-width: .5px;
  &:hover {
    box-shadow: 0 0 5px rgba(90, 90, 90, 0.8);
  }
`;

const ImageWrapper = styled.div`
  height: 230px;
  width: 240px;
  overflow: hidden;
  object-fit: cover;
`;

const ImageStyle = styled.img`
  display: block;
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const DetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 5px 16px 0 0;
`;

const InfoStyle = styled.div`
  display: flex;
  flex-direction: column;
  letter-spacing: .05px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  line-height: 17px;
  text-transform: none;
  font-weight: 500;
  padding-left: 5px;
`;

const CategoryStyle = styled.span`
  font-weight: 350;
`;

const PriceStyle = styled.div`
  display: flex;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  text-transform: none;
  color: ${(props) => props.theme.fontColor};
  font-weight: 500;
  padding: 2px 4px;
  position: relative;
  bottom: 38px;
  background-color: ${(props) => props.theme.body};
  border-radius: 3px;
  cursor: pointer;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  &:disabled {
    pointer-events: none;
  }

  &:hover {
    color: ${(props) => props.theme.fontColor};
    background-color: ${(props) => props.theme.body};
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-3px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

const Arrow = styled(FontAwesomeIcon)`
  position: relative;
  height: 30px;
  width: auto;
  top: 145px;
  cursor: pointer;
  user-select: none;
  transform: scale(0.75);
  &:hover,
  &:focus {
    transform: scale(1.0);
  }
`;

const ArrowTransparent = styled(FontAwesomeIcon)`
  position: relative;
  height: 30px;
  width: auto;
  top: 145px;
  visibility: hidden;
`;

const ButtonStyle = styled.button`
  bottom: 220px;
  left: 205px;
  position: relative;
  border: 1px solid #1A1A1A;
  border-radius: 15px;
  color: #3B3B3B;
  cursor: pointer;
  line-height: normal;
  padding: 2px 3px;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);

  &:disabled {
    pointer-events: none;
  }

  &:hover {
    color: yellow;
    background-color: #1A1A1A;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

export default RelatedCarousel;