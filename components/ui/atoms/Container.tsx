import classNames from "classnames";

export type ContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Container = ({ className, children }: ContainerProps) => {
  return (
    <div
      className={classNames(
        "mx-0 p-8 sm:mx-8 max-w-7xl bg-white shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
};
