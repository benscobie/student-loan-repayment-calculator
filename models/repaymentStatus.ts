enum RepaymentStatus {
  NotSet,
  NotPaying = 'NotPaying',
  Paying = 'Paying',
  PaidOff = 'PaidOff',
  WrittenOff = 'WrittenOff',
}

export function RepaymentStatusToDescription(status?: RepaymentStatus): string {
  if (status == RepaymentStatus.NotPaying) {
    return 'Not paying'
  } else if (status == RepaymentStatus.Paying) {
    return 'Paying'
  } else if (status == RepaymentStatus.PaidOff) {
    return 'Paid off'
  } else if (status == RepaymentStatus.WrittenOff) {
    return 'Written off'
  }

  return 'Unknown'
}

export default RepaymentStatus
