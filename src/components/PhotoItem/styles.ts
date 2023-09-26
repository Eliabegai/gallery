import styled from "styled-components";

export const Container = styled.div`
  background-color: #3D3F43;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;

  img {
    max-width: 100%;
    display: block;
    border-bottom: 10px;
    border-radius: 10px
  }
`

export const Delete = styled.div`
  display: flex;
  text-align: right;
  position: fixed;
`

export const Button = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  right: 0;
  color: #FFF;

  &:hover {
    color: #FFF;
    opacity: 0.7;
  }
`