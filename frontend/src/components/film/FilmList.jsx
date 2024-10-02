import React from 'react'
import styled from 'styled-components';
const filmListStyled = styled.div`
  display: grid;
  margin-left:100px;
  grid-template-columns: repeat(3, 1fr);
  gap:30px;
`;
export default function FilmList(props) {
  return (
    <filmListStyled>{props.children}</filmListStyled>
  )
}
