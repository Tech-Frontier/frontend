import { TechStackListItem } from './TechStackListItem';
import { fetchTechStackList } from './actions';

export async function InitialTechStackList() {
  const { data } = await fetchTechStackList({ pageNo: 1 });

  return (
    <>
      {
        data.map((x, i) =>
          <TechStackListItem
            key={`${i}-${encodeURIComponent(x)}`}
            tech={x}
          />,
        )
      }
    </>
  );
}
