import styled from 'styled-components';

interface Props {
  children: any;
}

export default ({ children }: Props) => {
  return <Styles>{children}</Styles>;
};

const Styles = styled.div`
  & {
    margin-top: 0.6rem;
    background-color: rgb(238, 238, 238);
    border-radius: 20px 20px 0px 0px;
    padding: 0.6rem 1.2rem;
  }
`;
