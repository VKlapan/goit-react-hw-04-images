import { LoadMore } from './Button.styled';

const Button = ({ clickHandle }) => {
  return (
    <LoadMore type="button" onClick={clickHandle}>
      LOAD MORE
    </LoadMore>
  );
};

export default Button;
