import { NextPage } from 'next'
import { RefObject, useEffect, useState } from 'react'
import { Loan } from '../../../models/loan'
import InputGroup from '../atoms/InputGroup'
import LoanType from '../../../models/loanType'
import { DateTime } from 'luxon'
import { Details } from '../../../models/details'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import { Trash } from 'react-bootstrap-icons'
import DatePicker from '../atoms/DatePicker'
import classNames from 'classnames'

const nextMonth = () => {
  const now = new Date()
  if (now.getMonth() == 11) {
    return new Date(now.getFullYear() + 1, 0, 1)
  } else {
    return new Date(now.getFullYear(), now.getMonth() + 1, 1)
  }
}

const baseSchema = z.object({
  salaryGrowth: z
    .number({ invalid_type_error: 'Invalid number' })
    .min(-100)
    .max(100),
  annualEarningsGrowth: z
    .number({ invalid_type_error: 'Invalid number' })
    .min(-100)
    .max(100),
  annualSalaryBeforeTax: z
    .number({ invalid_type_error: 'Invalid number' })
    .min(0),
  salaryAdjustments: z
    .array(
      z.object({
        date: z
          .union([z.date({ invalid_type_error: 'Invalid date' }), z.string()])
          .pipe(z.coerce.date().min(nextMonth(), 'Date cannot be in the past')),
        value: z
          .union([
            z.string({ invalid_type_error: 'Invalid number' }),
            z.number(),
          ])
          .pipe(z.coerce.number().min(0)),
      }),
    )
    .superRefine((items, ctx) => {
      items.forEach(({ date }, index) => {
        if (
          items.filter((x) => x.date.getTime() == date.getTime()).length > 1
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Date must be unique`,
            path: [index, 'date'],
          })
        }
      })
    }),
  birthDate: z
    .date()
    .max(
      DateTime.now().minus({ years: 15 }).startOf('day').toJSDate(),
      `Select a date prior to ${DateTime.now()
        .minus({ years: 15 })
        .startOf('day')
        .toFormat('dd/MM/yyyy')}`,
    )
    .optional(),
})

type DetailsInputProps = {
  loans: Loan[]
  salaryGrowth: number
  annualEarningsGrowth: number
  handleSubmit: (details: Details) => void
  submitRef: RefObject<HTMLButtonElement>
  canSubmit: boolean
}

type FormDataInput = z.input<typeof baseSchema>
type FormDataOutput = z.output<typeof baseSchema>

const DetailsInput: NextPage<DetailsInputProps> = ({
  salaryGrowth,
  annualEarningsGrowth,
  loans,
  submitRef,
  handleSubmit: handleSubmitHook,
  canSubmit,
}) => {
  const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false)

  const isBirthDateRequired = () => {
    return loans.some((loan) => {
      if (
        (loan.loanType == LoanType.Type1 &&
          loan.academicYearLoanTakenOut == 2005) ||
        (loan.loanType == LoanType.Type4 &&
          loan.academicYearLoanTakenOut == 2006)
      ) {
        return true
      }

      return false
    })
  }

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    watch,
  } = useForm<FormDataInput, unknown, FormDataOutput>({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      salaryGrowth: salaryGrowth * 100,
      annualEarningsGrowth: annualEarningsGrowth * 100,
      salaryAdjustments: [],
    },
    shouldUnregister: true,
  })

  useEffect(() => {
    if ((errors.salaryAdjustments?.length ?? 0) > 0) {
      setShowAdvancedOptions(true)
    }
  }, [errors])

  const onSubmit = (data: FormDataOutput) => {
    handleSubmitHook({
      annualEarningsGrowth: data.annualEarningsGrowth,
      salaryAdjustments: data.salaryAdjustments.map((x) => {
        return { value: x.value, date: x.date }
      }),
      salaryGrowth: data.salaryGrowth,
      annualSalaryBeforeTax: data.annualSalaryBeforeTax,
      birthDate: data.birthDate,
    } satisfies Details)
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'salaryAdjustments',
  })

  const toggleShowAdvancedOptions = () => {
    setShowAdvancedOptions(!showAdvancedOptions)
  }

  const annualSalaryBeforeTax = watch('annualSalaryBeforeTax')

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <h2 className="mb-2 text-lg font-medium">Your details</h2>
          <InputGroup
            id="annualSalaryBeforeTax"
            type="number"
            label="Annual salary before tax"
            symbol="£"
            error={errors.annualSalaryBeforeTax?.message}
            {...register('annualSalaryBeforeTax', {
              required: true,
              valueAsNumber: true,
            })}
          />
          {annualSalaryBeforeTax == 0 && (
            <p className="mt-1 text-sm text-gray-500">
              You can enter a future salary in the advanced options below.
            </p>
          )}

          {isBirthDateRequired() && (
            <div className="mt-2">
              <Input
                id="birthDate"
                type="date"
                label="Birth Date"
                tooltip="Your birth date is used to calculate when the loan can be written off."
                error={errors.birthDate?.message}
                {...register('birthDate', {
                  required: true,
                  valueAsDate: true,
                })}
              />
            </div>
          )}
        </div>
        <div>
          <h2 className="mb-2 text-lg font-medium">Assumptions</h2>
          <div>
            <InputGroup
              id="salaryGrowth"
              type="number"
              label="Annual salary growth"
              min="-100"
              max="100"
              step="0.1"
              symbol="%"
              error={errors.salaryGrowth?.message}
              {...register('salaryGrowth', {
                required: true,
                valueAsNumber: true,
              })}
            />

            <div className="mt-3">
              <InputGroup
                id="annualEarningsGrowth"
                type="number"
                label="UK average annual earnings growth"
                tooltip="Repayment thresholds typically increase in line with average annual earnings."
                min="-100"
                max="100"
                step="0.1"
                symbol="%"
                error={errors.annualEarningsGrowth?.message}
                {...register('annualEarningsGrowth', {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <button
          type="button"
          className="w-full cursor-pointer rounded-lg bg-slate-200 p-2 text-center text-sm hover:bg-slate-300 sm:w-1/2 md:w-4/5 lg:w-1/2"
          onClick={toggleShowAdvancedOptions}
        >
          {!showAdvancedOptions
            ? 'Show advanced options'
            : 'Hide advanced options'}
        </button>
      </div>
      <div className={classNames('mt-4', { hidden: !showAdvancedOptions })}>
        <h2 className="mb-2 text-lg font-medium">Salary adjustments</h2>
        <p className="mb-4 text-sm">
          If you know you&apos;re going to be getting a pay increase or if you
          just want to see how a pay increase might affect your payments, you
          can add these here. Annual salary growth will still apply.
        </p>
        {fields.length > 0 && (
          <div className="mb-4 flex flex-col gap-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-x-2 sm:gap-x-4">
                <div className="grow">
                  <Controller
                    control={control}
                    name={`salaryAdjustments.${index}.date`}
                    render={({ field: innerField, fieldState }) => (
                      <>
                        <DatePicker
                          id="salaryAdjustmentDate"
                          key={field.id}
                          label="Date"
                          dateFormat="MM/yyyy"
                          showMonthYearPicker
                          error={fieldState.error?.message}
                          onChange={(date) => {
                            innerField.onChange(date)
                          }}
                          selected={
                            innerField.value
                              ? new Date(innerField.value)
                              : undefined
                          }
                          minDate={nextMonth()}
                        />
                      </>
                    )}
                  />
                </div>
                <div className="grow">
                  <InputGroup
                    id="salaryAdjustmentAmount"
                    type="number"
                    label="Salary"
                    symbol="£"
                    error={errors.salaryAdjustments?.[index]?.value?.message}
                    {...register(`salaryAdjustments.${index}.value`, {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </div>
                <div>
                  <div className="mb-1 block">&nbsp;</div>
                  <div className="flex h-10 items-center">
                    <button
                      type="button"
                      className="cursor-pointer text-slate-600 hover:text-slate-900"
                      onClick={() => {
                        remove(index)
                      }}
                    >
                      <Trash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div>
          <Button
            id="addSalaryAdjustment"
            style="primary"
            onClick={() => {
              append({ date: '', value: '' }, { shouldFocus: false })
            }}
          >
            {fields.length == 0 ? 'Add adjustment' : 'Add another adjustment'}
          </Button>
        </div>
      </div>
      <button
        ref={submitRef}
        type="submit"
        disabled={!canSubmit}
        style={{ display: 'none' }}
      />
    </form>
  )
}

export default DetailsInput
