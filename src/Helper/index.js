export const makeShortText = (text) => {
    if (text.length > 200) {
      return text.substring(0, 200) + ".....";
   }
   return text;
 }