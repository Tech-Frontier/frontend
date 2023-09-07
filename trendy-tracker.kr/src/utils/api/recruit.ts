export const fetchRecruitList = async () => {
  const response = await fetch('https://api.trendy-tracker.kr/api/recruit/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};
