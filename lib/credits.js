// 完全简化版，不依赖任何外部库
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

export async function getUserCredits(userId) {
  return { credits: 1, usedTrial: false };
}
