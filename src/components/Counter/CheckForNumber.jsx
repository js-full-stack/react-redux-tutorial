import { useMemo } from "react";

const CheckForNumber = ({ value }) => {
  const checkNumber = useMemo(() => {
    let i = 0;
    while (i < 500000000) i++;
    return value === 10 ? "Это 10!" : "Это НЕ 10!";
  }, [value]);

  return <div>{checkNumber}</div>;
};

export default CheckForNumber;
