const notesDummy = [
  {
    key: "1",
    title: "DummyNote 3",
    tags: "dummy, notes, test, 1",
    content: "Test content for dummy notes. This is for dummy note 1",
    date: "20/11/2021",
  },
  {
    key: "2",
    title: "DummyNote 2",
    tags: "dummy, notes, test, 2",
    content: "Test content for dummy notes. This is for dummy note 2",
    date: "22/11/2021",
  },
  {
    key: "3",
    title: "DummyNote 1",
    tags: "dummy, notes, test, 3",
    content: "Test content for dummy notes. This is for dummy note 3",
    date: "24/11/2021",
  },
  {
    key: "4",
    title: "DummyNote 4",
    tags: "dummy, notes, test, 4",
    content: "Test content for dummy notes. This is for dummy note 4",
    date: "26/11/2021",
  },
  {
    key: "5",
    title: "DummyNote 5",
    tags: "dummy, notes, test, 5",
    content: "Test content for dummy notes. This is for dummy note 5",
    date: "28/11/2021",
  },
];

export const getNotes = () => {
  const data = localStorage.getItem("internotes");
  return data ? JSON.parse(data) : notesDummy;
};

export const setNotes = (data) => {
  localStorage.setItem("internotes", JSON.stringify(data));
};

export const getFirstLoad = () => {
  const data = localStorage.getItem("internotesFirstLoad");
  return data ? data : false;
};

export const setFirstLoad = () => {
  localStorage.setItem("internotesFirstLoad", true);
};

export const clearFirst = () => {
  localStorage.removeItem("internotesFirstLoad");
};
