import React from 'react';
import styled from 'styled-components/native';
import {theme} from '../../../../shared/styles/theme';

interface Circle {
  selected: boolean;
}
const Circle = styled.View`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-horizontal: 10px;
  background: ${(props: Circle) =>
    props.selected ? theme.colors.textTertiary : 'transparent'};
  border-color: ${theme.colors.textTertiary};
  border-width: 1px;
  border-radius: 100px;
`;

interface Number {
  selected: boolean;
}
const Number = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: ${(props: Number) =>
    props.selected ? theme.colors.textFifth : theme.colors.textTertiary};
`;

interface Props {
  number: string;
  selected: boolean;
}

const BottomNumber = (props: Props) => {
  return (
    <>
      <Circle selected={props.selected}>
        <Number selected={props.selected}>{props.number}</Number>
      </Circle>
    </>
  );
};

export default BottomNumber;
