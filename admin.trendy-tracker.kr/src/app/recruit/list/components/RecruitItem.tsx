import type { Recruit } from '../models/recruit';

export function RecruitItem({ data }: { data: Recruit }) {
  return (
    <li>
      <p>{data.company}</p>
      <p>{data.url}</p>
      <p>{data.techStackList.join(',')}</p>
    </li>
  );
}
