export const convertStatesToSelectOptions = (data: any) => {
  const converted = data.map((state: any) => ({
    value: state?.id?.toString(),
    label: state?.name,
  }));
  return converted;
};

