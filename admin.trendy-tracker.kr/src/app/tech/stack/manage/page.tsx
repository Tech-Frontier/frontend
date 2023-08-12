import { Spacing } from '@tech-frontier/spacing';
import { Text } from '@tech-frontier/ui-desktop';
import { AddTechStackButton } from './AddTechStackButton';
import { InitialTechStackList } from './InitialTechStackList';
import { TechStackListClient } from './TechStackListClient';

export default async function TechStackManagePage() {

  return (
    <main>
      <Spacing size={40}/>
      <Text rank="1">기술 스택 관리</Text>

      <AddTechStackButton />
      <TechStackListClient>
        <InitialTechStackList/>
      </TechStackListClient>
    </main>
  );
}
