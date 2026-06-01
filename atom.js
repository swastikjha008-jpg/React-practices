import { atom, selector, atomFamily, selectorFamily } from "recoil";

export const countAtom = atom({ key: "count", default: 0 });

export const todoAtomFamily = atomFamily({
  key: "todo",
  default: (id) => ({ id, text: "", done: false }),
});

export const doubleCountSelector = selector({
  key: "doubleCount",
  get: ({ get }) => get(countAtom) * 2,
});

export const userIdAtom = atom({ key: "userId", default: 1 });

export const userSelector = selector({
  key: "user",
  get: async ({ get }) => {
    const id = get(userIdAtom);
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!res.ok) throw new Error(`Could not find user ${id}`);
    return res.json();
  },
});

export const todosSelector = selectorFamily({
  key: "todos",
  get: (userId) => async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}&_limit=5`);
    if (!res.ok) throw new Error("Failed to fetch todos");
    return res.json();
  },
});
