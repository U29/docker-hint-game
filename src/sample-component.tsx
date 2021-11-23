import * as React from 'react';

interface IProps {
  name: string;
}

export const SampleComponent = (props: IProps): React.ReactElement =>  {
  const [count, setCount] = React.useState<number>(0);

  return (
    <div>
      <h1>{props.name}</h1>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>Count Up</button>
    </div>
  );
}
