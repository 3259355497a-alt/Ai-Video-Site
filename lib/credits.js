// 临时简化版，让网站能跑起来
export async function checkCredits(userId) {
  return { credits: 1, used_trial: false };
}

export async function deductCredit(userId) {
  return true;
}

export async function refundCredit(userId, amount, reason) {
  return true;
}

export async function grantTrialCredits(userId) {
  return 1;
}
