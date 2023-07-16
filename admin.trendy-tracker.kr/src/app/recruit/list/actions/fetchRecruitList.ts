'use server';

interface FetchRecruitListOptions {
  pageNo?: number;
  pageSize?: number;
}

interface Recruit {
  company: string;
  url: string;
  techStackList: string[];
}

export async function fetchRecruitList({ pageNo = 1, pageSize = 10 }: FetchRecruitListOptions) {
  const list: Recruit[] = new Array(100)
    .fill(undefined)
    .map((_, i) => ({
      company: '네이버',
      url: `https://recruit.navercorp.com/rcrt/view.do?annoId=${i + 1}`, 
      techStackList: ['스택1', '스택2'], 
    }));

  return {
    data: list.slice( (pageNo - 1) * pageSize, pageNo * pageSize),
    isEnd: pageNo * pageSize >= list.length,
  };
}
