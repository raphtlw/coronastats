import styled from 'styled-components';

interface Props {
  height?: string;
}

const Styles = styled.div<{ height: string }>`
  height: ${(props) => props.height};
`;

export default ({ height }: Props) => {
  return <Styles height={height || '2.8rem'}></Styles>;
};
