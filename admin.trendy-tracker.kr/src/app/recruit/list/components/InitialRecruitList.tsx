import { RecruitItem } from './RecruitItem';
import { fetchRecruitList } from '../actions/fetchRecruitList';

export async function InitialRecruitList() {
  const { data } = await fetchRecruitList({ pageNo: 1 });

  return (
    <>
      {
        data.map(x => 
          <RecruitItem 
            key={`${x.company}-${encodeURIComponent(x.url)}`} 
            data={x} 
          />,
        )
      }
    </>
  );
}
