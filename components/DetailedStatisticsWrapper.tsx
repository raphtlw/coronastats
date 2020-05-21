import { useTransition, animated } from 'react-spring';
import styled from 'styled-components';

const Styles = styled.div`
  & {
    overflow-y: hidden;
  }
`;

interface Props {
  shown: boolean;
  children: any;
}

export default ({ children, shown }: Props) => {
  const transitions = useTransition(shown, null, {
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 170 },
    leave: { opacity: 0, height: 0 },
  });
  return (
    <Styles>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              {children}
            </animated.div>
          )
      )}
    </Styles>
  );
};
