import Fuse from "fuse.js";

export const fuseSearch = (data, keys, orgNotes) => {
  const fuseObj = new Fuse(orgNotes, {
    keys,
    includeScore: true,
  });
  const result = fuseObj.search(data);

  return result;
};
