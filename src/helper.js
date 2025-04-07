export function objectDeepCloneFlatted(obj) {
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (error) {
      return obj;
    }
  }