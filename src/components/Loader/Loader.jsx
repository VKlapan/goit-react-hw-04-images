import { Watch } from 'react-loader-spinner';
import { Spinner } from './Loader.styled';

const Loader = () => {
  return (
    <Spinner>
      <Watch
        height="80"
        width="80"
        radius="48"
        color="#4fa94d"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </Spinner>
  );
};

export default Loader;
