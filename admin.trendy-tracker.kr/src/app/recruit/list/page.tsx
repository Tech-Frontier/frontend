import { Spacing } from '@tech-frontier/spacing';
import { Text } from '@tech-frontier/ui-desktop';
import { InitialRecruitList } from './components/InitialRecruitList';
import { RecruitListClient } from './components/RecruitListClient';

export default function RecruitListPage() {
  return (
    <main>
      <Spacing size={40}/>
      <Text as="h1">채용 공고 리스트</Text>

      <RecruitListClient>
        <InitialRecruitList />
      </RecruitListClient>
    </main>
  );
}
