export default class Utils {
  public static getAgeFromBirth(birthDateString: string): number {
    const t = new Date();
    const b = new Date(birthDateString);
    const m = t.getMonth() - b.getMonth();
    let a = t.getFullYear() - b.getFullYear();
    return m < 0 || (m === 0 && t.getDate() < b.getDate()) ? a-- : a;
  }
}
