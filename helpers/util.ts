export const isMoreThanAnHourAgo = (lastTime: Date): boolean => {
  const timeAnHourAgo = new Date().getTime() - 60 * 60 * 1000;
  return lastTime.getTime() < timeAnHourAgo;
};

export const isBelowMinimum = (
  mainnetRecipientBalance: string,
  formattedGSNBalance: string
): boolean => {
  return (
    parseInt(mainnetRecipientBalance) < 2 || parseInt(formattedGSNBalance) < 2
  );
};

export const displayNotification = (
  mainnetRecipientBalance: string,
  gsnBalance: string
) => {
  console.log("** LESS THAN 2 ETH, PLEASE REFILL **");
  console.log("formatted", mainnetRecipientBalance);
  console.log("formattedGSNBalance", gsnBalance);
};
