import { InitialRecruitList } from './components/InitialRecruitList';
import { RecruitListClient } from './components/RecruitListClient';

export default function RecruitListPage() {
  return (
    <main>
      <RecruitListClient>
        <InitialRecruitList />
      </RecruitListClient>
    </main>
  );
}
