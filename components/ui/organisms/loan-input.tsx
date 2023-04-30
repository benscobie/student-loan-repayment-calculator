import { NextPage } from "next";
import React from "react";
import Loan from "../../../models/loan";
import LoanType from "../../../models/loanType";
import Button from "../atoms/button";
import Checkbox from "../atoms/checkbox";
import Input from "../atoms/input";
import InputGroup from "../atoms/input-group";
import Select from "../atoms/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateTime } from "luxon";
import { dateTimeToInputDate } from "../../../utils/dateTimeToInputDate";

interface LoanInputProps {
  loan: Loan;
  onChange(loan: Loan): void;
  onCancel(): void;
  availableLoanTypes: LoanType[];
  canCancel: boolean;
}

type FormData = {
  loanType: LoanType;
  balanceRemaining: number;
  academicYearLoanTakenOut?: number;
  courseStartDate?: Date;
  courseEndDate?: Date;
  firstRepaymentDate?: Date;
  studyingPartTime?: boolean;
};

const schema = z
  .object({
    loanType: z.enum(
      [LoanType.Type1, LoanType.Type2, LoanType.Type4, LoanType.Postgraduate],
      {
        errorMap: () => {
          return { message: "Loan type is required" };
        },
      }
    ),
    balanceRemaining: z
      .number({
        invalid_type_error: "Invalid number",
      })
      .min(1),
    academicYearLoanTakenOut: z
      .number({
        invalid_type_error: "Academic year loan taken out is required",
      })
      .optional(),
    courseStartDate: z.date().optional(),
    courseEndDate: z.date().optional(),
    firstRepaymentDate: z.date().optional(),
    studyingPartTime: z.boolean().optional(),
  })
  .superRefine((val, ctx) => {
    const firstRepaymentDate = firstRepaymentDateRequired(
      val.loanType,
      val.academicYearLoanTakenOut
    );

    if (firstRepaymentDate && !val.firstRepaymentDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["firstRepaymentDate"],
        message: "First repayment date is required",
      });
    }
  })
  .superRefine((val, ctx) => {
    if (
      academicYearLoanTakenOutRequired(val.loanType) &&
      (val.academicYearLoanTakenOut == null ||
        val.academicYearLoanTakenOut <= 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["academicYearLoanTakenOut"],
        message: "Academic year loan taken out is required",
      });
    }
  })
  .superRefine((val, ctx) => {
    if (courseStartDateRequired(val.loanType) && val.courseStartDate == null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["courseStartDate"],
        message: "Course start date is required",
      });
    }
  })
  .superRefine((val, ctx) => {
    if (courseEndDateRequired(val.loanType) && val.courseEndDate == null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["courseEndDate"],
        message: "Course end date is required",
      });
    }
  });

const firstRepaymentDateRequired = (
  loanType: LoanType,
  academicYearLoanTakenOut?: number
) => {
  return (
    (loanType == LoanType.Type1 && academicYearLoanTakenOut == 2006) ||
    loanType == LoanType.Type2 ||
    loanType == LoanType.Type4 ||
    loanType == LoanType.Postgraduate
  );
};

const academicYearLoanTakenOutRequired = (loanType: LoanType) => {
  return loanType == LoanType.Type1 || loanType == LoanType.Type4;
};

const courseStartDateRequired = (loanType: LoanType) => {
  return loanType == LoanType.Type2;
};

const courseEndDateRequired = (loanType: LoanType) => {
  return loanType == LoanType.Type2;
};

const LoanInput: NextPage<LoanInputProps> = ({
  loan,
  onChange,
  onCancel,
  canCancel,
  availableLoanTypes,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    resetField,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      loanType: loan.loanType,
      academicYearLoanTakenOut: loan.academicYearLoanTakenOut,
      balanceRemaining: loan.balanceRemaining,
      courseStartDate: dateTimeToInputDate(loan.courseStartDate),
      courseEndDate: dateTimeToInputDate(loan.courseEndDate),
      firstRepaymentDate: dateTimeToInputDate(loan.firstRepaymentDate),
      studyingPartTime: loan.studyingPartTime,
    },
  });

  const onSubmit = (data: FormData) => {
    onChange({
      loanType: data.loanType,
      balanceRemaining: data.balanceRemaining,
      academicYearLoanTakenOut: data.academicYearLoanTakenOut,
      courseStartDate:
        data.courseStartDate != null
          ? DateTime.fromJSDate(data.courseStartDate)
          : undefined,
      courseEndDate:
        data.courseEndDate != null
          ? DateTime.fromJSDate(data.courseEndDate)
          : undefined,
      firstRepaymentDate:
        data.firstRepaymentDate != null
          ? DateTime.fromJSDate(data.firstRepaymentDate)
          : undefined,
      studyingPartTime: data.studyingPartTime,
    });
  };

  const resetForm = () => {
    resetField("academicYearLoanTakenOut");
    resetField("courseStartDate");
    resetField("courseEndDate");
    resetField("firstRepaymentDate");
    resetField("studyingPartTime");
  };

  const watchAllFields = watch();

  const loanTypeIsAvailable = (type: LoanType) => {
    return availableLoanTypes.includes(type) || loan.loanType == type;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Select
        id="loanType"
        label="Loan type"
        defaultValue={LoanType.Unselected}
        error={errors.loanType?.message}
        {...register("loanType", {
          required: true,
          onChange: () => {
            resetForm();
            setFocus("balanceRemaining");
          },
        })}
      >
        <option value={LoanType.Unselected}>--Please choose a plan--</option>

        {loanTypeIsAvailable(LoanType.Type1) && (
          <option value={LoanType.Type1}>Plan 1</option>
        )}

        {loanTypeIsAvailable(LoanType.Type2) && (
          <option value={LoanType.Type2}>Plan 2</option>
        )}

        {loanTypeIsAvailable(LoanType.Type4) && (
          <option value={LoanType.Type4}>Plan 4</option>
        )}

        {loanTypeIsAvailable(LoanType.Postgraduate) && (
          <option value={LoanType.Postgraduate}>Postgraduate loan</option>
        )}
      </Select>

      <div className="mt-3">
        <InputGroup
          id="balanceRemaining"
          type="number"
          label="Balance remaining"
          symbol="£"
          error={errors.balanceRemaining?.message}
          {...register("balanceRemaining", {
            required: true,
            valueAsNumber: true,
          })}
        />
      </div>

      {watchAllFields.loanType == LoanType.Type2 && (
        <>
          <div className="mt-3">
            <Input
              id="courseStartDate"
              type="date"
              label="Course start date"
              error={errors.courseStartDate?.message}
              {...register("courseStartDate", {
                required: true,
                valueAsDate: true,
              })}
            />
          </div>

          <div className="mt-3">
            <Input
              id="courseEndDate"
              type="date"
              label="Course end date"
              error={errors.courseEndDate?.message}
              {...register("courseEndDate", {
                required: true,
                valueAsDate: true,
              })}
            />
          </div>
        </>
      )}

      {academicYearLoanTakenOutRequired(watchAllFields.loanType) && (
        <div className="mt-3">
          <Select
            id="academicYearLoanTakenOut"
            label="Academic Year Loan Taken Out"
            error={errors.academicYearLoanTakenOut?.message}
            {...register("academicYearLoanTakenOut", {
              required: true,
              valueAsNumber: true,
            })}
          >
            <option value="">--Please choose an option--</option>
            {watchAllFields.loanType == LoanType.Type1 && (
              <>
                <option value="2005">2005 to 2006, or earlier</option>
                <option value="2006">2006 to 2007, or later</option>
              </>
            )}
            {watchAllFields.loanType == LoanType.Type4 && (
              <>
                <option value="2006">2006 to 2007, or earlier</option>
                <option value="2007">2007 to 2008, or later</option>
              </>
            )}
          </Select>
        </div>
      )}

      {firstRepaymentDateRequired(
        watchAllFields.loanType,
        watchAllFields.academicYearLoanTakenOut
      ) && (
        <div className="mt-3">
          <Input
            id="firstRepaymentDate"
            type="date"
            label="First repayment date"
            tooltip="Your first repayment date is used to calculate when the loan can be written off."
            error={errors.firstRepaymentDate?.message}
            {...register("firstRepaymentDate", {
              required: true,
              valueAsDate: true,
            })}
          />
        </div>
      )}

      {watchAllFields.loanType == LoanType.Type2 && (
        <div className="mt-4">
          <Checkbox
            id="studyingPartTime"
            label="Studying part-time"
            {...register("studyingPartTime", { required: true })}
          />
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <Button id="submit" style="primary" type="submit">
          Save plan
        </Button>

        {canCancel && (
          <Button id="cancel" style="secondary" onClick={() => onCancel()}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default LoanInput;
