export let realtimeQueue = [];
export let batchedQueue = [];

export const getMessage = (eventName) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-indexed
  const day = currentDate.getDate();
  const dateAndTime = `${year}-${month}-${day}`;
  const message = {
    eventName: eventName,
    date: dateAndTime,
  };
  return message;
};

export const pushMessage = async (message) => {
  realtimeQueue.push[message];
  if (
    realtimeQueue.length > 0 &&
    !(message === realtimeQueue[realtimeQueue.length - 1])
  ) {
    await batchedQueue.push[message];
  }
  console.log("Real Time Queue " + realtimeQueue);
  console.log("Batched Queue On Pushing" + batchedQueue);
};

export const doesMessageExist = () => {
  if (batchedQueue.length > 0) {
    return true;
  }
  return false;
};

export const popMessage = async () => {
  await batchedQueue.shift();
  console.log("Batched Queue On Poping" + batchedQueue);
};
