export const sendEmail = async (data: { email: string }) => {
  const response = await fetch('https://api.trendy-tracker.kr/api/email/signup/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
};

export const verifyEmail = async (data: { email: string; code: string }) => {
  const response = await fetch('https://api.trendy-tracker.kr/api/email/signup/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};
