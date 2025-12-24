export const getPublicIdFromUrl = (url) => {
  const parts = url.split("/");
  const fileWithExt = parts.pop(); // nc7ipzeiddxocpt6q3pf.png
  const folder = parts.slice(parts.indexOf("upload") + 2).join("/");
  const publicId = `${folder}/${fileWithExt.split(".")[0]}`;

  return publicId;
};