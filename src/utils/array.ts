export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce<Record<K, T[]>>((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
    // FIXME: fix this ts error
    // @ts-expect-error ts-error(2345)
  }, {});
