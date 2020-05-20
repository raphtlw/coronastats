import styled from 'styled-components';

interface Props {
  onClick: any;
}

export default ({ onClick }: Props) => {
  return (
    <Styles onClick={onClick}>
      <h1>News</h1>
    </Styles>
  );
};

const Styles = styled.div`
  color: ${(props) => props.theme.textColor};
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  margin-right: 2rem;
  font-weight: 400;
  text-align: end;
`;
