import React from 'react'
import styled from 'styled-components';
const FilmListStyled = styled.div`
  display: grid;
  left:'auto';
  grid-template-columns: repeat(6, 1fr);
  gap:20px;
`;
export default function FilmList(props) {
  return (
    <FilmListStyled>{props.children}</FilmListStyled>
  )
}
