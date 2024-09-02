import { useParams, useSearchParams } from 'react-router-dom';

export default function () {
  const [query] = useSearchParams();
  query.forEach((val) => {
    console.log(val);
  });
  const params = useParams();
  return (
    <div>
      home的孩子
      {params.id} {params.dd}
    </div>
  );
}
