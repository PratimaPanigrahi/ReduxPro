import MyComponent from './MyComponent';
import './styles.css';

export default function Page() {
  return (
    <div className="my-style">
      <MyComponent />
    </div>
  );
}
import './styles.css';

export default function Page() {
  return <div className="my-style">Hello!</div>;
}

export default function MyComponent() {
  return <div>This is MyComponent!</div>;
}
import { myFunction } from './utils';

export default function Page() {
  myFunction();
  return <div>Check the console!</div>;
}