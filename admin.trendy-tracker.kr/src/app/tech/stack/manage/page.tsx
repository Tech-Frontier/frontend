import { Spacing } from '@tech-frontier/spacing';
import { Text } from '@tech-frontier/ui-desktop';
import { fetchTechStackList } from '@/actions/fetchTechStackList';
import { css } from '@styled-system/css';
import { AddTechStackButton } from './AddTechStackButton';
import { LoadMore } from './LoadMore';
import { TechStackListItem, TechStackListItemHeader } from './TechStackListItem';

export default async function TechStackManagePage() {
  const { data } = await fetchTechStackList({ pageNo: 1 });

  return (
    <main>
      <Spacing size={40}/>
      <Text rank="1">기술 스택 관리</Text>

      <div className={css({ textAlign: 'right' })}>
        <AddTechStackButton />
      </div>

      <TechStackListItemHeader />

      {
        data.map((x, i) =>
          <TechStackListItem
            key={`${i}-${encodeURIComponent(x.name)}`}
            tech={x.name}
          />,
        )
      }

      <LoadMore />
    </main>
  );
}
