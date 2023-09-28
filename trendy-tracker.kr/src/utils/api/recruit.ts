export const fetchRecruitList = async () => {
  const response = await fetch('https://api.trendy-tracker.kr/api/recruit/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};
