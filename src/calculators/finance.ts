export default class Finance {
  static fv(rate: number, nper: number, pmt: number, pv: number = 0, type: number = 0): number {
    const pow: number = (1 + rate) ** nper;
    let fv: number;

    if (rate) {
      fv = (pmt * (1 + rate * type) * (1 - pow) / rate) - pv * pow;
    } else {
      fv = -1 * (pv + pmt * nper);
    }

    return fv;
  }

  static nper(rate: number, pmt: number, pv: number, type: number = 0, fv: number = 0): number {
    const num: number = pmt * (1 + rate * type) - fv * rate;
    const den: number = (pv * rate + pmt * (1 + rate * type));
    return Math.log(num / den) / Math.log(1 + rate);
  }
}
