import Link from 'next/link';
import { useRouter } from 'next/router';

const CoffeeStore = () => {
  const router = useRouter();
  return (
    <div>
      Coffee Store Page {router.query.id}
      <Link href='/'>
        Back to home
      </Link>
      <Link href='/coffee-store/dynamic'>
        Back to page dynamic
      </Link>
    </div>
  );
};

export default CoffeeStore;
