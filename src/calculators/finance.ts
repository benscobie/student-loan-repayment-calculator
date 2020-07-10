export default class Finance {
  static fv(rate: number, nper: number, pmt: number, pv = 0, type = 0): number {
    const pow: number = (1 + rate) ** nper;
    let fv: number;

    if (rate) {
      fv = ((pmt * (1 + rate * type)) * ((1 - pow) / rate) - pv * pow);
    } else {
      fv = -1 * (pv + pmt * nper);
    }

    return fv;
  }

  static nper(rate: number, pmt: number, pv: number, type = 0, fv = 0): number {
    const num: number = pmt * (1 + rate * type) - fv * rate;
    const den: number = (pv * rate + pmt * (1 + rate * type));
    return Math.log(num / den) / Math.log(1 + rate);
  }

  static pmt(rate: number, nperiod: number, pv: number, fv: number, type: number) {
    if (!fv)  {
      fv = 0;
    }
    if (!type) {
      type = 0;
    }

    if (rate === 0) return -(pv + fv)/nperiod;

    let pvif = Math.pow(1 + rate, nperiod);
    let pmt = rate / (pvif - 1) * -(pv * pvif + fv);

    if (type === 1) {
        pmt /= (1 + rate);
    }

    return pmt;
  }
}
