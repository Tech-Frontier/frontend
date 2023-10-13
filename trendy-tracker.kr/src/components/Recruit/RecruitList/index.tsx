import { LoadMore } from './LoadMore';
import { RecruitListItems } from './RecruitListItems';

function RecruitListImpl(props: React.HTMLAttributes<HTMLUListElement>) {
  return <ul {...props} />;
}

export const RecruitList = Object.assign(RecruitListImpl, {
  Items: RecruitListItems,
  LoadMore,
});
